import 'dotenv/config';
import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import { prisma, resources } from './admin/admin.config.js';
import { upload } from './middleware/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const start = async () => {
  const app = express();

  // Serve static files from public folder (MUST BE FIRST)
  app.use(express.static(path.join(__dirname, '../public')));
  
  // Serve uploaded images
  app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

  // CORS for frontend
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  // AdminJS setup
  const admin = new AdminJS({
    resources,
    rootPath: '/admin',
    branding: {
      companyName: 'Professor Portfolio Admin',
      logo: false,
      softwareBrothers: false,
    },
  });

  // Authentication
  const authenticate = async (email, password) => {
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.encryptedPassword)) {
      return user;
    }
    return null;
  };

  // Build authenticated router
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: process.env.SESSION_SECRET,
    },
    null,
    {
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    }
  );

  // Mount AdminJS router
  app.use(admin.options.rootPath, adminRouter);

  // Body parser AFTER AdminJS
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ==================== IMAGE UPLOAD ENDPOINT ====================
  app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      res.json({ 
        success: true,
        filename: req.file.filename,
        url: imageUrl 
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });

  // API Routes for Frontend
  
  // Get Hero data
  app.get('/api/hero', async (req, res) => {
    try {
      const hero = await prisma.hero.findFirst();
      if (hero && hero.profileImage && !hero.profileImage.startsWith('http')) {
        hero.profileImage = `${req.protocol}://${req.get('host')}/uploads/${hero.profileImage}`;
      }
      res.json(hero || {});
    } catch (error) {
      console.error('Hero fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch hero data' });
    }
  });

  // Get About data
  app.get('/api/about', async (req, res) => {
    try {
      const about = await prisma.about.findFirst();
      res.json(about || {});
    } catch (error) {
      console.error('About fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch about data' });
    }
  });

  // Get Publications
  app.get('/api/publications', async (req, res) => {
    try {
      const publications = await prisma.publication.findMany({
        where: { isVisible: true },
        orderBy: [{ year: 'desc' }, { order: 'asc' }]
      });
      res.json(publications);
    } catch (error) {
      console.error('Publications fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch publications' });
    }
  });

  // Get News
  app.get('/api/news', async (req, res) => {
    try {
      const news = await prisma.news.findMany({
        where: { isVisible: true },
        orderBy: { order: 'asc' }
      });
      res.json(news);
    } catch (error) {
      console.error('News fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  });

  // Get Research data with publications
app.get('/api/research', async (req, res) => {
  try {
    const research = await prisma.research.findMany({
      where: { isVisible: true },
      include: {
        publications: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });
    res.json(research);
  } catch (error) {
    console.error('Research fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch research data' });
  }
});


// Get Teaching data with courses
app.get('/api/teaching', async (req, res) => {
  try {
    const departments = await prisma.teachingDepartment.findMany({
      where: { isVisible: true },
      include: {
        courses: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });
    res.json(departments);
  } catch (error) {
    console.error('Teaching fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch teaching data' });
  }
});

// Get Resume data
app.get('/api/resume', async (req, res) => {
  try {
    const [
      profile,
      education,
      positions,
      researchInterests,
      awards,
      editorials,
      patents,
      selectedPublications
    ] = await Promise.all([
      prisma.resumeProfile.findFirst(),
      prisma.education.findMany({ orderBy: { order: 'asc' } }),
      prisma.position.findMany({ orderBy: { order: 'asc' } }),
      prisma.researchInterest.findMany({ orderBy: { order: 'asc' } }),
      prisma.award.findMany({ orderBy: { order: 'asc' } }),
      prisma.editorial.findMany({ orderBy: { order: 'asc' } }),
      prisma.patent.findMany({ orderBy: { order: 'asc' } }),
      prisma.publication.findMany({
        where: { isVisible: true },
        orderBy: [{ year: 'desc' }, { order: 'asc' }],
        take: 10 // Top 10 publications for resume
      })
    ]);

    res.json({
      profile,
      education,
      positions,
      researchInterests,
      awards,
      editorials,
      patents,
      selectedPublications
    });
  } catch (error) {
    console.error('Resume fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch resume data' });
  }
});


// Get Lab data
app.get('/api/lab', async (req, res) => {
  try {
    const [
      profile,
      carouselImages,
      projects,
      currentPhdStudents,
      graduatedPhdStudents,
      mtechStudents,
      btechStudents
    ] = await Promise.all([
      prisma.labProfile.findFirst(),
      prisma.labCarouselImage.findMany({ orderBy: { order: 'asc' } }),
      prisma.labProject.findMany({
        where: { isVisible: true },
        orderBy: { order: 'asc' }
      }),
      prisma.phdStudent.findMany({
        where: { isAlumni: false },
        orderBy: { order: 'asc' }
      }),
      prisma.phdStudent.findMany({
        where: { isAlumni: true },
        orderBy: { order: 'asc' }
      }),
      prisma.mtechStudent.findMany({ orderBy: { order: 'asc' } }),
      prisma.btechStudent.findMany({ orderBy: { order: 'asc' } })
    ]);

    res.json({
      profile,
      carouselImages,
      projects,
      currentPhdStudents,
      graduatedPhdStudents,
      mtechStudents,
      btechStudents
    });
  } catch (error) {
    console.error('Lab fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch lab data' });
  }
});

// Get Publications page data (publications + books)
app.get('/api/publications-page', async (req, res) => {
  try {
    const [publications, books, bookChapters] = await Promise.all([
      prisma.publication.findMany({
        where: { isVisible: true },
        orderBy: [{ year: 'desc' }, { order: 'asc' }]
      }),
      prisma.book.findMany({ orderBy: { order: 'asc' } }),
      prisma.bookChapter.findMany({ orderBy: { order: 'asc' } })
    ]);

    res.json({ publications, books, bookChapters });
  } catch (error) {
    console.error('Publications page fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch publications data' });
  }
});

// Get Patents page data
app.get('/api/patents-page', async (req, res) => {
  try {
    const [internationalPatents, indianPatents, tools] = await Promise.all([
      prisma.patent.findMany({
        where: { patentType: 'International' },
        orderBy: { order: 'asc' }
      }),
      prisma.patent.findMany({
        where: { patentType: 'Indian' },
        orderBy: { order: 'asc' }
      }),
      prisma.computationalTool.findMany({ orderBy: { order: 'asc' } })
    ]);

    res.json({ internationalPatents, indianPatents, tools });
  } catch (error) {
    console.error('Patents page fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch patents data' });
  }
});


// Get Computational Tools
app.get('/api/computational-tools', async (req, res) => {
  try {
    const tools = await prisma.computationalTool.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(tools);
  } catch (error) {
    console.error('Computational tools fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch computational tools' });
  }
});

// Get Site Settings
app.get('/api/site-settings', async (req, res) => {
  try {
    const settings = await prisma.siteSettings.findFirst();
    res.json(settings || {});
  } catch (error) {
    console.error('Site settings fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch site settings' });
  }
});


// Get Outreach data
app.get('/api/outreach', async (req, res) => {
  try {
    const outreach = await prisma.outreach.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    });
    res.json(outreach);
  } catch (error) {
    console.error('Outreach fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch outreach data' });
  }
});


  // Health check
  app.get('/', (req, res) => {
    res.json({ 
      status: 'running',
      admin: `${req.protocol}://${req.get('host')}/admin`,
      endpoints: {
        hero: '/api/hero',
        about: '/api/about',
        publications: '/api/publications',
        news: '/api/news',
        upload: '/api/upload',
        uploadPage: '/upload.html'
      }
    });
  });

  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔐 Admin panel: http://localhost:${PORT}/admin`);
    console.log(`📊 API endpoints: http://localhost:${PORT}/api/*`);
    console.log(`📁 Upload page: http://localhost:${PORT}/upload.html`);
    console.log(`📁 Upload endpoint: POST http://localhost:${PORT}/api/upload\n`);
  });
};

start().catch(console.error);

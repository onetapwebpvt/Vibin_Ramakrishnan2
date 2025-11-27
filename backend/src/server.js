import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { prisma, resources } from './admin/admin.config.js';
import { upload } from './middleware/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

const start = async () => {
  const app = express();

  // Trust proxy for production
  if (isProduction) {
    app.set('trust proxy', 1);
  }

  // CORS Configuration
  const allowedOrigins = isProduction
    ? [process.env.FRONTEND_URL]
    : ['http://localhost:5173', 'http://localhost:3000'];

  app.use(cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error('Not allowed by CORS'), false);
      }
      return callback(null, true);
    },
    credentials: true
  }));

  // Body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files
  app.use(express.static(path.join(__dirname, '../public')));
  app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
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

  // Session configuration
  const sessionStore = session({
    secret: process.env.SESSION_SECRET || 'change-this-secret-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    }
  });

  // Authentication
  const authenticate = async (email, password) => {
    try {
      const user = await prisma.adminUser.findUnique({ where: { email } });
      if (user && await bcrypt.compare(password, user.encryptedPassword)) {
        return user;
      }
      return null;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  };

  // Build authenticated router
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: process.env.SESSION_SECRET || 'change-this-secret-in-production',
    },
    null,
    sessionStore
  );

  // Mount AdminJS router
  app.use(admin.options.rootPath, adminRouter);

  // Image Upload Endpoint
  app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const baseUrl = isProduction 
        ? process.env.BACKEND_URL 
        : `${req.protocol}://${req.get('host')}`;
      
      const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
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

  // Get Research data
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

  // Get Teaching data
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
          take: 10
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

  // Get Publications page data
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
      const [internationalPatents, indianPatents] = await Promise.all([
        prisma.patent.findMany({
          where: { patentType: 'International' },
          orderBy: { order: 'asc' }
        }),
        prisma.patent.findMany({
          where: { patentType: 'Indian' },
          orderBy: { order: 'asc' }
        })
      ]);

      res.json({ internationalPatents, indianPatents });
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

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({ 
      status: 'running',
      environment: process.env.NODE_ENV || 'development',
      admin: `${req.protocol}://${req.get('host')}/admin`,
      uploadPage: `${req.protocol}://${req.get('host')}/upload.html`
    });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
      error: isProduction ? 'Internal server error' : err.message 
    });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Upload page: http://localhost:${PORT}/upload.html`);
  });

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received: closing server');
    await prisma.$disconnect();
    process.exit(0);
  });
};

start().catch(console.error);

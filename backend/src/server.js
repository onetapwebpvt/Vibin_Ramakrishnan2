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
import { excelUpload } from './middleware/excelUpload.js';
import xlsx from 'xlsx';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

const start = async () => {
  const app = express();

  // Trust proxy (CRITICAL for Render/Railway/Heroku)
  app.set('trust proxy', 1);

  // Serve static files FIRST
  app.use(express.static(path.join(__dirname, '../public')));
  app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

  // CORS Configuration - Environment variable controlled
  const setupCORS = () => {
    if (process.env.ALLOW_ALL_ORIGINS === 'true') {
      return cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
      });
    }

    const allowedOrigins = [];
    
    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(...process.env.FRONTEND_URL.split(',').map(url => url.trim()));
    }
    
    if (process.env.BACKEND_URL) {
      allowedOrigins.push(process.env.BACKEND_URL);
    }
    
    if (!isProduction) {
      allowedOrigins.push('http://localhost:5173', 'http://localhost:3000');
    }

    return cors({
      origin: function(origin, callback) {
        if (!origin) {
          return callback(null, true);
        }
        
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        
        console.log('Blocked origin:', origin);
        console.log('Allowed origins:', allowedOrigins);
        callback(null, false);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
    });
  };

  app.use(setupCORS());

  // Health check endpoint
  app.get('/health', (req, res) => {
    return res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // AdminJS setup BEFORE body parser
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
  const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'change-this-secret-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    },
    name: 'adminjs-session'
  };

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
    sessionConfig
  );

  // Mount AdminJS router
  app.use(admin.options.rootPath, adminRouter);

  // Body parser AFTER AdminJS
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Image Upload Endpoint
  app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
      const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
      
      return res.json({ 
        success: true,
        filename: req.file.filename,
        url: imageUrl 
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  });

  // API Routes for Frontend
  
  app.get('/api/hero', async (req, res) => {
    try {
      const hero = await prisma.hero.findFirst();
      return res.json(hero || {});
    } catch (error) {
      console.error('Hero fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch hero data' });
    }
  });

  app.get('/api/about', async (req, res) => {
    try {
      const about = await prisma.about.findFirst();
      return res.json(about || {});
    } catch (error) {
      console.error('About fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch about data' });
    }
  });

  app.get('/api/publications', async (req, res) => {
    try {
      const publications = await prisma.publication.findMany({
        where: { isVisible: true },
        orderBy: [{ year: 'desc' }, { order: 'asc' }]
      });
      return res.json(publications);
    } catch (error) {
      console.error('Publications fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch publications' });
    }
  });

  app.get('/api/news', async (req, res) => {
    try {
      const news = await prisma.news.findMany({
        where: { isVisible: true },
        orderBy: { order: 'asc' }
      });
      return res.json(news);
    } catch (error) {
      console.error('News fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch news' });
    }
  });

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
      return res.json(research);
    } catch (error) {
      console.error('Research fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch research data' });
    }
  });

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
      return res.json(departments);
    } catch (error) {
      console.error('Teaching fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch teaching data' });
    }
  });

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

      return res.json({
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
      return res.status(500).json({ error: 'Failed to fetch resume data' });
    }
  });

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

      return res.json({
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
      return res.status(500).json({ error: 'Failed to fetch lab data' });
    }
  });

  app.get('/api/publications-page', async (req, res) => {
    try {
      const [publications, books, bookChapters] = await Promise.all([
        prisma.publicationPage.findMany({
          where: { isVisible: true },
          orderBy: [{ year: 'desc' }, { order: 'asc' }]
        }),
        prisma.book.findMany({ orderBy: { order: 'asc' } }),
        prisma.bookChapter.findMany({ orderBy: { order: 'asc' } })
      ]);

      return res.json({ publications, books, bookChapters });
    } catch (error) {
      console.error('Publications page fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch publications data' });
    }
  });

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

      return res.json({ internationalPatents, indianPatents });
    } catch (error) {
      console.error('Patents page fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch patents data' });
    }
  });

  app.get('/api/computational-tools', async (req, res) => {
    try {
      const tools = await prisma.computationalTool.findMany({
        orderBy: { order: 'asc' }
      });
      return res.json(tools);
    } catch (error) {
      console.error('Computational tools fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch computational tools' });
    }
  });

  app.get('/api/site-settings', async (req, res) => {
    try {
      const settings = await prisma.siteSettings.findFirst();
      return res.json(settings || {});
    } catch (error) {
      console.error('Site settings fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch site settings' });
    }
  });

  app.get('/api/outreach', async (req, res) => {
    try {
      const outreach = await prisma.outreach.findMany({
        where: { isVisible: true },
        orderBy: { order: 'asc' }
      });
      return res.json(outreach);
    } catch (error) {
      console.error('Outreach fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch outreach data' });
    }
  });

  // Root endpoint
  app.get('/', (req, res) => {
    return res.json({ 
      status: 'running',
      environment: process.env.NODE_ENV || 'development',
      admin: '/admin',
      uploadPage: '/upload.html'
    });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    
    console.error('Error:', err.message);
    return res.status(500).json({ 
      error: isProduction ? 'Internal server error' : err.message 
    });
  });

  // 404 handler
  app.use((req, res) => {
    if (res.headersSent) {
      return;
    }
    return res.status(404).json({ error: 'Not found' });
  });

  // Start server
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    if (!isProduction) {
      console.log(`Admin panel: http://localhost:${PORT}/admin`);
      console.log(`Upload page: http://localhost:${PORT}/upload.html`);
    }
  });

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received: closing server');
    await prisma.$disconnect();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT received: closing server');
    await prisma.$disconnect();
    process.exit(0);
  });
};

start().catch(console.error);

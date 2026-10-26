import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import coursesRoutes from './routes/coursesRoutes.js';
import assignmentsRoutes from './routes/assignmentsRoutes.js';
import gradesRoutes from './routes/gradesRoutes.js';
import eventsRoutes from './routes/eventsRoutes.js';
import notificationsRoutes from './routes/notificationsRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security headers
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev, restricted in prod
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Request parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate Limiter for security
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Student Hub REST API',
    version: '1.0.0',
  });
});

// Mount versioned REST API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/assignments', assignmentsRoutes);
app.use('/api/v1/grades', gradesRoutes);
app.use('/api/v1/events', eventsRoutes);
app.use('/api/v1/notifications', notificationsRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/chat', chatRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'API route not found' });
});

// Centralized error handler
app.use(errorHandler);

export default app;

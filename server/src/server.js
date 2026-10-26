import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import prisma from './config/db.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Verify DB connectivity
    await prisma.$connect();
    console.log('✅ Connected to database successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Student Hub API server listening on http://localhost:${PORT}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

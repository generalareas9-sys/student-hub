import { verifyToken } from '../utils/auth.js';
import prisma from '../config/db.js';

/**
 * Middleware to authenticate requests via JWT Bearer token or HTTP-only cookie
 */
export async function authenticate(req, res, next) {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.student_hub_token) {
      token = req.cookies.student_hub_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Please log in.',
      });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session. Please log in again.',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { profile: true },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account not found or deactivated.',
      });
    }

    // Attach user (without passwordHash) to req
    const { passwordHash, ...safeUser } = user;
    req.user = safeUser;
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Middleware to restrict endpoints to specific roles
 */
export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: You do not have permission to perform this action.',
      });
    }
    next();
  };
}

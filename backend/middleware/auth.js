const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function requireAuth(req, res, next) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authentication is required.' });
  if (!process.env.JWT_SECRET) return res.status(500).json({ message: 'Server authentication is not configured.' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select('_id name email');
    if (!user) return res.status(401).json({ message: 'Your session is no longer valid.' });
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Your session is invalid or has expired.' });
  }
}

module.exports = { requireAuth };

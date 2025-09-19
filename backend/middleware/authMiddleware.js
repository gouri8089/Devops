const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // contains user_id and role
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

// exports.authorizeRoles = (allowedRoles) => {
//   return async (req, res, next) => {
//     const user = req.user;
//     if (!user || !allowedRoles.includes(user.role)) {
//       return res.status(403).json({ error: 'Access denied' });
//     }
//     next();
//   };
// };

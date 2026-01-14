// middleware/role.js
module.exports = function (allowedRoles = []) {
  return (req, res, next) => {
    const userRole = req.user?.role_id?.toString();
    const allowed = allowedRoles.map(role => role.toString());
    if (!allowed.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

// Middleware function to authenticate admin
const adminAuthMiddleware = (req, res, next) => {
  // Check if user is authenticated and is an admin
  if (req.user.isAdmin === true) {
    // User is authenticated and is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authenticated or is not an admin, send an error response
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = adminAuthMiddleware;

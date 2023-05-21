const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log("Auth header : ",authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({Error: "Bearer token missing!"});
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({Error: "Please login to access this resource "});
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
      return res.status(401).json({Error: " Access Denied"});
  }
});

module.exports = isAuthenticated;


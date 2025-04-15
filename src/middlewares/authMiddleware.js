module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  if (token === process.env.API_KEY) {
    next();
  } else {
    res.status(403).json({ error: "Invalid token" });
  }
};

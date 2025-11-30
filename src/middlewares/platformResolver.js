const PLATFORMS = require("../config/platform");

function platformResolver(req, res, next) {
  const platform = (req.body.platform || req.query.platform || req.headers["x-platform"] || "").toLowerCase();
  const apiKey   = req.headers["authorization"];
  

  if (!platform) {
    return res.status(400).json({
      success: false,
      error: "platform es obligatorio",
    });
  }

  const cfg = PLATFORMS[platform];

  if (!cfg) {
    return res.status(400).json({
      success: false,
      error: `platform inválido: ${platform}`,
    });
  }

  // Validación básica de API KEY
  if (!apiKey || apiKey !== cfg.apiKey) {
    return res.status(401).json({
      success: false,
      error: "API KEY inválida",
    });
  }

  req.platform = platform;
  req.platformConfig = cfg;

  next();
}

module.exports = platformResolver;

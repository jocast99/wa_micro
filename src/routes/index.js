const express = require("express");
const router = express.Router();

const coreRoutes = require("./core");
const metaRoutes = require("./meta");

// Rutas de Twilio + webhook
router.use(coreRoutes);

// Rutas de Meta WhatsApp (con platform)
router.use(metaRoutes);

module.exports = router;

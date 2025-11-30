const express = require("express");
const MetaWaController = require("../controllers/metaWaController");
const authMiddleware = require("../middlewares/authMiddleware");
const platformResolver = require("../middlewares/platformResolver");

const router = express.Router();

const metaWaController = new MetaWaController();

///// Meta Whatsapp API /////

// Texto libre (dentro de 24h)
// body: { platform, to, body }
router.post(
  "/wa/send",
  platformResolver,
  metaWaController.sendMessage.bind(metaWaController) // este será el libre
);

// Template (HSM)
// body: { platform, to, template_name, language_code, components }
router.post(
  "/wa/send-template",
  platformResolver,
  metaWaController.sendTemplate.bind(metaWaController)
);

module.exports = router;

const express = require("express");
const MessageController = require("../controllers/messageController");
const WebhookController = require("../controllers/webhookController");
const MetaWaController = require("../controllers/metaWaController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const messageController = new MessageController();
const webhookController = new WebhookController();
const metaWaController = new MetaWaController();

router.post(
  "/send-message",
  authMiddleware,
  messageController.sendMessage.bind(messageController)
);
router.post("/webhook", webhookController.handleWebhook);

///// Meta Whatsapp API /////
router.post(
  "/wa/send", 
  authMiddleware, 
  metaWaController.sendText.bind(metaWaController)
);

module.exports = router;

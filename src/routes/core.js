// routes/core.js
const express = require("express");
const MessageController = require("../controllers/messageController");
const WebhookController = require("../controllers/webhookController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const messageController = new MessageController();
const webhookController = new WebhookController();

// Enviar mensaje (Twilio, como lo tienes ahora)
router.post(
  "/send-message",
  authMiddleware,
  messageController.sendMessage.bind(messageController)
);

// Webhook (entrante)
router.post(
  "/webhook",
  webhookController.handleWebhook.bind(webhookController)
);

module.exports = router;

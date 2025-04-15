const express = require("express");
const MessageController = require("../controllers/messageController");
const WebhookController = require("../controllers/webhookController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const messageController = new MessageController();
const webhookController = new WebhookController();

router.post(
  "/send-message",
  authMiddleware,
  messageController.sendMessage.bind(messageController)
);
router.post("/webhook", webhookController.handleWebhook);

module.exports = router;

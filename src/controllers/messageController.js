const twilio = require("twilio");

class MessageController {
  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.twilioClient = twilio(accountSid, authToken);
  }

  async sendMessage(req, res) {
    const { to, body } = req.body;

    try {
      const message = await this.twilioClient.messages.create({
        to: "whatsapp:" + to,
        from: process.env.TWILIO_PHONE_NUMBER,
        body,
      });
      res.status(200).json({ success: true, messageSid: message.sid });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ success: false, error: "Failed to send message" });
    }
  }
}

module.exports = MessageController;

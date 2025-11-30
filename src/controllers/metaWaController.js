const axios = require("axios");

class MetaWaController {
  constructor() {
    this.phoneNumberId = process.env.META_WA_PHONE_NUMBER_ID; // 8836...
    this.accessToken   = process.env.META_WA_ACCESS_TOKEN;    // tu token de Meta
  }

  async sendText(req, res) {
    const { to, body } = req.body;

    if (!to || !body) {
      return res.status(400).json({ success: false, error: "to y body son obligatorios" });
    }

    const url = `https://graph.facebook.com/v21.0/${this.phoneNumberId}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body },
    };

    try {
      const { data } = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error Meta WA:", error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        error: error.message,
        details: error.response?.data || error,
      });
    }
  }
}

module.exports = MetaWaController;

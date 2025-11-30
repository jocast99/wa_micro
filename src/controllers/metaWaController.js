const axios = require("axios");

class MetaWaController {
  
  async sendMessage(req, res) {
    const { to, body } = req.body;
    const { wa } = req.platformConfig;

    if (!to || !body) {
      return res.status(400).json({
        success: false,
        error: "to y body son obligatorios",
      });
    }

    const url = `https://graph.facebook.com/v21.0/${wa.phoneNumberId}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        body,
        preview_url: false,
      },
    };

    try {
      const { data } = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${wa.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error Meta WA (freeText):", error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        error: error.message,
        details: error.response?.data || error,
      });
    }
  }

  /**
   * Enviar mensaje de plantilla (HSM)
   * body:
   * {
   *   platform,
   *   to,
   *   template_name,
   *   language_code,
   *   components: [...]
   * }
   */
  async sendTemplate(req, res) {
    const {
      to,
      template_name,
      language_code = "es_MX",
      components = [],
    } = req.body;

    const { wa } = req.platformConfig;

    if (!to || !template_name) {
      return res.status(400).json({
        success: false,
        error: "to y template_name son obligatorios",
      });
    }

    const url = `https://graph.facebook.com/v21.0/${wa.phoneNumberId}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: template_name,
        language: {
          code: language_code,
        },
        components,
      },
    };

    try {
      const { data } = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${wa.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error Meta WA (template):", error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        error: error.message,
        details: error.response?.data || error,
      });
    }
  }
}

module.exports = MetaWaController;

const axios = require("axios");

class MetaWaController {
  constructor() {
    this.phoneNumberId = process.env.META_WA_PHONE_NUMBER_ID;
    this.accessToken   = process.env.META_WA_ACCESS_TOKEN;
    this.apiUrl        = `https://graph.facebook.com/v21.0/${this.phoneNumberId}/messages`;
  }

 
  async sendMessage(req, res) {
    const { to, body } = req.body;

    if (!to || !body) {
      return res.status(400).json({ success: false, error: "to y body son obligatorios" });
    }

    const payload = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        preview_url: false,
        body,
      },
    };

    try {
      const { data } = await axios.post(this.apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
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
   * Enviar mensaje de plantilla (HSM) – para fuera de 24h o notificaciones.
   * body esperado:
   * {
   *   to: "5025xxxxxxx",
   *   template_name: "recordatorio_pago",
   *   language_code: "es_MX",
   *   components: [
   *     {
   *       type: "body",
   *       parameters: [
   *         { type: "text", text: "Josué" },
   *         { type: "text", text: "Q1,250.00" },
   *       ]
   *     }
   *   ]
   * }
   */
  async sendTemplate(req, res) {
    const {
      to,
      template_name,
      language_code,
      components = [],
    } = req.body;

    if (!to || !template_name) {
      return res.status(400).json({
        success: false,
        error: "to, template_name y language_code son obligatorios",
      });
    }

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
      const { data } = await axios.post(this.apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
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

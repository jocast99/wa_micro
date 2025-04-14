const { MessagingResponse } = require("twilio").twiml;

class WebhookController {
  async handleWebhook(req, res) {
    const twiml = new MessagingResponse();

    // Handle incoming messages
    const incomingMessage = req.body.Body;
    const toNumber = req.body.To;

    const response = await fetch(process.env.AI_MICROSERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AI_MICROSERVICE_AUTH_KEY,
      },
      body: JSON.stringify({
        provider: process.env.AI_MICROSERVICE_PROVIDER,
        query: incomingMessage,
      }),
    });

    if (!response.ok) {
      console.error("Error fetching AI response:", response.statusText);
      twiml.message("Sorry, I couldn't process your request.");
    } else {
      const aiResponse = await response.json();
      const aiMessage = aiResponse.response;
      twiml.message(aiMessage);
    }

    // Send the TwiML response
    res.type("text/xml").send(twiml.toString());
  }
}

module.exports = WebhookController;

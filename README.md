# WhatsApp Microservice - Twilio Integration

This project is an Express.js application for sending WhatsApp messages using Twilio and handling incoming webhooks.

---

## How to Configure `.env` for Twilio

### **1. Get Twilio Account SID & Auth Token**

#### **Step 1: Sign Up for Twilio**

- Go to [Twilio's website](https://www.twilio.com/) and click **"Start for free"**.
- Fill in your details and verify your email.

#### **Step 2: Access Twilio Console**

- After logging in, go to the [Twilio Console](https://www.twilio.com/console).

#### **Step 3: Find Account SID & Auth Token**

- In the dashboard, look for the **"Account Info"** section.
- Here, you’ll see:
  - **ACCOUNT SID** (e.g., `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
  - **AUTH TOKEN** (Click **"Show"** to reveal it)
  - Replace **TWILIO_ACCOUNT_SID** and **TWILIO_AUTH_TOKEN** in the `.env` file.

### **2. Find Your WhatsApp Sandbox Number (For Testing)**

#### **Step 1: Enable WhatsApp Sandbox**

- Go to **Messaging** → **Try it Out** → **Send a WhatsApp Message**.
- Click **"Get Started"** under **WhatsApp Sandbox**.

#### **Step 2: Note Sandbox Number**

- You’ll see a **sandbox number** (e.g., `+14155238886`).
- Replace **TWILIO_PHONE_NUMBER** in the `.env` file with the format `whatsapp:+14155238886`.

#### **Step 3: Join the Sandbox**

- Open **WhatsApp** on your phone.
- Send the **"Join" keyword** to the sandbox number.
- You’ll receive a confirmation message like:
  > _"Twilio Sandbox: ✅ You are all set! The sandbox can now send/receive messages from whatsapp:+14155238886. Reply stop to leave the sandbox any time."_

### **3. Set Up Webhook URL for WhatsApp Sandbox**

#### **Step 1: Deploy a Webhook Server**

Ensure your server is publicly accessible (not `localhost`).

#### **Step 2: Configure Webhook in Twilio**

1. Go to **WhatsApp Sandbox Settings** in the Twilio Console.
2. Under **"When a message comes in"**, enter:
   ```
   http://159.223.204.158:8080/api/webhook
   ```
3. Click **Save**.

Follow the instruction in https://www.twilio.com/docs/whatsapp/self-sign-up to create production environment for Twilio and set the environment variable with proper WhatsApp senders and https://www.twilio.com/docs/whatsapp/api#configuring-inbound-message-webhooks to reset webhook. Remember to set same webhook url for all phone numbers.

---

## How to Use the API Endpoints

### **1. Send a WhatsApp Message**

#### **Endpoint**

`POST /api/send-message`

#### **Headers**:

`Authorization`: Your API key (`API_KEY` from the `.env` file).

#### **Request Body**

```json
{
  "to": "<recipient-phone-number>",
  "body": "<message-content>",
  "mediaUrl": "<optional-media-url>"
}
```

- **to**: The recipient's phone number in the format `whatsapp:+<country-code><phone-number>`.
- **body**: The message content to send.
- **mediaUrl**: (Optional) URL of the media to send.

#### **Example Request**

```bash
curl -X POST http://159.223.204.158:8080/api/send-message \
-H "Content-Type: application/json" \
-H "Authorization: 3439650e4b002208b9da6e9f85a87edd00cbaaf809cf736c49f17edd2097bd69" \
-d '{
  "to": "whatsapp:+14155238886",
  "body": "Hello, this is a test message!",
  "mediaUrl": "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
}'
```

#### **Response**

```json
{
  "success": true,
  "messageSid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

---

### **2. Handle Incoming Webhook**

#### **Endpoint**

`POST /api/webhook`

This endpoint is used by Twilio to send incoming WhatsApp messages to your server.

#### **Request Body**

Twilio will send a payload containing the following fields:

- **Body**: The content of the incoming message.
- **To**: The Twilio phone number that received the message.
- **MediaUrl0**: (Optional) URL of the media sent by the user.

#### **Example Payload**

```json
{
  "Body": "Hello!",
  "To": "whatsapp:+14155238886",
  "MediaUrl0": "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
}
```

#### **Response**

The server will respond with a TwiML message containing the AI-generated response.

---

## Example `.env` File

```env
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER="whatsapp:+14111111111"
AI_MICROSERVICE_URL="http://localhost:5000/chat/sofia"
AI_MICROSERVICE_AUTH_KEY=your_ai_microservice_auth_key
AI_MICROSERVICE_PROVIDER=openai
API_KEY=your_api_key
```

Replace placeholders with your actual Twilio and AI microservice credentials.

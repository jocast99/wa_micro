# How to configure `.env` for Twilio

## **1. Get Twilio Account SID & Auth Token**

### **Step 1: Sign Up for Twilio**

- Go to [Twilio's website](https://www.twilio.com/) and click **"Start for free"**.
- Fill in your details and verify your email.

### **Step 2: Access Twilio Console**

- After logging in, go to the [Twilio Console](https://www.twilio.com/console).

### **Step 3: Find Account SID & Auth Token**

- In the dashboard, look for the **"Account Info"** section.
- Here, you’ll see:
  - **ACCOUNT SID** (e.g., `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
  - **AUTH TOKEN** (Click **"Show"** to reveal it)
  - Replace **TWILIO_ACCOUNT_SID** and **TWILIO_AUTH_TOKEN** in `.env` file.

## **2. Find Your WhatsApp Sandbox Number (For Testing)**

### **Step 1: Enable WhatsApp Sandbox**

- Go to **Messaging** → **Try it Out** → **Send a WhatsApp Message**.
- Click **"Get Started"** under **WhatsApp Sandbox**.

### **Step 2: Note Sandbox Number**

- You’ll see a **sandbox number** (e.g., `+14155238886`).
- Replace **TWILIO_PHONE_NUMBER** in `.env` file with the format of `whatsapp:+14155238886`. Use the same sandbox number for **TWILIO_TECH_SUPPORT_NUMBER** and **TWILIO_SALES_SUPPORT_NUMBER** for testing.
- You’ll also see a **Join keyword** (e.g., `join example-code`).

### **Step 3: Join the Sandbox**

- Open **WhatsApp** on your phone.
- Send the **"Join" keyword** to the sandbox number.
- You’ll receive a confirmation message like:
  > _"Twilio Sandbox: ✅ You are all set! The sandbox can now send/receive messages from whatsapp:+14155238886. Reply stop to leave the sandbox any time."_

## **3. Set Up Webhook URL for WhatsApp Sandbox**

### **Step 1: Deploy a Webhook Server**

You need a **publicly accessible URL** (not `localhost`).  
Options:

- **Ngrok (for testing)**
  ```bash
  ngrok http 3000  # Gives you a public URL like https://abc123.ngrok.io
  ```
- **Cloud Hosting (Production)**  
  (e.g., AWS, Render, Railway, Vercel, etc.)

### **Step 2: Configure Webhook in Twilio**

1. Go back to **WhatsApp Sandbox Settings** in the Twilio Console.
2. Under **"When a message comes in"**, enter:
   ```
   https://your-ngrok-url.ngrok.io/api/webhook
   ```
3. Click **Save**.

Follow the instruction in https://www.twilio.com/docs/whatsapp/self-sign-up to create production environment for Twilio and set the environment variable with proper WhatsApp senders and https://www.twilio.com/docs/whatsapp/api#configuring-inbound-message-webhooks to reset webhook.

---

# How to Use the API Endpoints

## **1. Send a WhatsApp Message**

### **Endpoint**

`POST /api/send-message`

### **Request Body**

```json
{
  "to": "<recipient-phone-number>",
  "body": "<message-content>"
}
```

- **to**: The recipient's phone number in the format `whatsapp:+<country-code><phone-number>`.
- **body**: The message content to send.

### **Example Request**

```bash
curl -X POST http://localhost:3000/api/send-message \
-H "Content-Type: application/json" \
-d '{
  "to": "whatsapp:+14155238886",
  "body": "Hello, this is a test message!"
}'
```

### **Response**

```json
{
  "success": true,
  "messageSid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

---

## **2. Handle Incoming Webhook**

### **Endpoint**

`POST /api/webhook`

This endpoint is used by Twilio to send incoming WhatsApp messages to your server.

### **Request Body**

Twilio will send a payload containing the following fields:

- **Body**: The content of the incoming message.
- **To**: The Twilio phone number that received the message.

### **Example Payload**

```json
{
  "Body": "Hello!",
  "To": "whatsapp:+14155238886"
}
```

### **Response**

The server will respond with a TwiML message containing the AI-generated response and you can see response via WhatsApp.

---

# Example `.env` File

```env
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER="whatsapp:+14111111111"
TWILIO_TECH_SUPPORT_NUMBER="whatsapp:+14111111111"
TWILIO_SALES_SUPPORT_NUMBER="whatsapp:+14111111111"
AI_MICROSERVICE_URL="http://localhost:5000/chat/sofia"
AI_MICROSERVICE_AUTH_KEY="your_ai_microservice_auth_key"
AI_MICROSERVICE_PROVIDER="openai"
```

Make sure to replace the placeholders with your actual Twilio and AI microservice credentials.

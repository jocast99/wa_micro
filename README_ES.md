# Cómo configurar `.env` para Twilio

## **1. Obtener el SID y el token de autenticación de la cuenta de Twilio**

### **Paso 1: Registrarse en Twilio**

- Visita el sitio web de Twilio (https://www.twilio.com/) y haz clic en **"Comienza gratis"**.
- Completa tus datos y verifica tu correo electrónico.

### **Paso 2: Acceder a la consola de Twilio**

- Después de iniciar sesión, ve a la consola de Twilio (https://www.twilio.com/console).

### **Paso 3: Encontrar el SID y el token de autenticación de la cuenta**

- En el panel de control, busca la sección **"Información de la cuenta"**. Aquí verás:
- **SID DE LA CUENTA** (p. ej., `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
- **TOKEN DE AUTORIZACIÓN** (Haz clic en **"Mostrar"** para verlo)
- Reemplaza **TWILIO_ACCOUNT_SID** y **TWILIO_AUTH_TOKEN** en el archivo `.env`.

## **2. Encuentra tu número de Sandbox de WhatsApp (para probar)**

### **Paso 1: Activa el Sandbox de WhatsApp**

- Ve a **Mensajes** → **Pruébalo** → **Enviar un mensaje de WhatsApp**.
- Haz clic en **"Empezar"** en **Sandbox de WhatsApp**.

### **Paso 2: Anota el número de Sandbox**

- Verás un **número de Sandbox** (p. ej., `+14155238886`).
- Reemplaza **TWILIO_PHONE_NUMBER** en el archivo `.env` con el formato `whatsapp:+14155238886`. Usa el mismo número de sandbox para **TWILIO_TECH_SUPPORT_NUMBER** y **TWILIO_SALES_SUPPORT_NUMBER** para las pruebas.
- También verás una **palabra clave para unirse** (p. ej., `join example-code`).

### **Paso 3: Únete al sandbox**

- Abre **WhatsApp** en tu teléfono.
- Envía la **palabra clave "Unirse"** al número del sandbox.
- Recibirás un mensaje de confirmación como:
  > _"Twilio Sandbox: ✅ ¡Listo! El sandbox ya puede enviar y recibir mensajes de whatsapp:+14155238886. Responde "stop" para salir del sandbox en cualquier momento."_

## **3. Configurar la URL del webhook para WhatsApp Sandbox**

### **Paso 1: Implementar un servidor de webhooks**

Necesita una **URL de acceso público** (no `localhost`).

### **Paso 2: Configurar el webhook en Twilio**

1. Regrese a **Configuración de WhatsApp Sandbox** en la consola de Twilio.
2. En **"Cuando llega un mensaje"**, introduzca:

```
http://159.223.204.158:8080/api/webhook
```

3. Haga clic en **Guardar**.

Siga las instrucciones en https://www.twilio.com/docs/whatsapp/self-sign-up para crear un entorno de producción para Twilio y configure la variable de entorno con los remitentes de WhatsApp adecuados. https://www.twilio.com/docs/whatsapp/api#configuring-inbound-message-webhooks para restablecer el webhooks. Recuerda configurar la misma URL de webhook para todos los números de teléfono.

---

# Cómo usar los puntos de conexión de la API

## **1. Enviar un mensaje de WhatsApp**

### **Punto de conexión**

`POST /api/send-message`

### **Cuerpo de la solicitud**

```json
{
  "to": "<número-de-teléfono-del-destinatario>",
  "body": "<contenido-del-mensaje>"
}
```

- **to**: El número de teléfono del destinatario en el formato `whatsapp:+<código-de-país><número-de-teléfono>`.
- **body**: El contenido del mensaje que se enviará.

### **Solicitud de ejemplo**

```bash
curl -X POST http://159.223.204.158:8080/api/send-message \
-H "Content-Type: application/json" \
-d '{
"to": "whatsapp:+14155238886",
"body": "¡Hola, este es un mensaje de prueba!"
}'
```

### **Respuesta**

```json
{
  "success": true,
  "messageSid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

---

## **2. Gestionar webhooks entrantes**

### **Punto final**

`POST /api/webhook`

Twilio utiliza este punto final para enviar mensajes entrantes de WhatsApp a su servidor.

### **Cuerpo de la solicitud**

Twilio enviará una carga útil con los siguientes campos:

- **Body**: El contenido del mensaje entrante.
- **To**: El número de teléfono de Twilio que recibió el mensaje.

### **Ejemplo de carga útil**

```json
{
  "Body": "¡Hola!",
  "To": "whatsapp:+14155238886"
}
```

### **Respuesta**

El servidor responderá con un mensaje TwiML con la respuesta generada por IA, que podrás ver a través de WhatsApp.

---

# Ejemplo de archivo `.env`

```env
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=tu_token_de_autenticación
TWILIO_PHONE_NUMBER="whatsapp:+1411111111"
TWILIO_TECH_SUPPORT_NUMBER="whatsapp:+14111111111"
TWILIO_SALES_SUPPORT_NUMBER="whatsapp:+14111111111"
AI_MICROSERVICE_URL="http://localhost:5000/chat/sofia"
AI_MICROSERVICE_AUTH_KEY="tu_clave_de_autenticación_de_microservicios_de_ai"
AI_MICROSERVICE_PROVIDER="openai"
```

Asegúrate de reemplazar los marcadores de posición con tu Twilio real y credenciales de microservicios de IA.

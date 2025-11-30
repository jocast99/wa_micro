module.exports = {
    sofia: {
      // API KEY que debe enviar Sofía en el header X-API-KEY
      apiKey: process.env.API_KEY_SOFIA || process.env.API_KEY,
  
      wa: {
        phoneNumberId:
          process.env.META_WA_PHONE_NUMBER_ID_SOFIA ||
          process.env.META_WA_PHONE_NUMBER_ID,
        accessToken:
          process.env.META_WA_ACCESS_TOKEN_SOFIA ||
          process.env.META_WA_ACCESS_TOKEN,
      },
  
      twilio: {
        from:
          process.env.TWILIO_FROM_SOFIA ||
          process.env.TWILIO_PHONE_NUMBER,
      },
    },
  
    stockitt: {
      apiKey: process.env.API_KEY_STOCKITT,
  
      wa: {
        phoneNumberId:
          process.env.META_WA_PHONE_NUMBER_ID_STOCKITT ||
          process.env.META_WA_PHONE_NUMBER_ID,
        accessToken:
          process.env.META_WA_ACCESS_TOKEN_STOCKITT ||
          process.env.META_WA_ACCESS_TOKEN,
      },
  
      twilio: {
        from:
          process.env.TWILIO_FROM_STOCKITT ||
          process.env.TWILIO_PHONE_NUMBER,
      },
    },
  
    bitlab: {
      apiKey: process.env.API_KEY_BITLAB,
  
      wa: {
        phoneNumberId:
          process.env.META_WA_PHONE_NUMBER_ID_BITLAB ||
          process.env.META_WA_PHONE_NUMBER_ID,
        accessToken:
          process.env.META_WA_ACCESS_TOKEN_BITLAB ||
          process.env.META_WA_ACCESS_TOKEN,
      },
  
      twilio: {
        from:
          process.env.TWILIO_FROM_BITLAB ||
          process.env.TWILIO_PHONE_NUMBER,
      },
    },
  };
  
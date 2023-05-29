const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const numberFromSendMessage = process.env.NUMBER_FROM_SEND_MESSAGE;
const client = require("twilio")(accountSid, authToken);

app.use(bodyParser.json({ strict: false }));

/**
 * 
  curl --location 'localhost:3000/send-message' \
  --header 'Content-Type: application/json' \
  --data '{
      "body": "vamooooooooooooh",
      "to": "+573153226435"
  }'
 * 
 */

app.post("/send-message", async (req, res, next) => {
  try {
    const { body, to } = req.body;

    await client.messages.create({
      body,
      from: numberFromSendMessage,
      to,
    });

    return res.status(200).json({
      message: "Se envió el mensaje correctamente",
    });
  } catch (e) {
    next(e);
  }
});

module.exports.handler = serverless(app);

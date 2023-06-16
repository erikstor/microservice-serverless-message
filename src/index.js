const {authMiddleware} = require('./middleware/auth.middleware.js')
const {sendMessage} = require('./services/send-message.service.js')
const {health} = require('./services/health.service.js')
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();


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

app.post("/send-message", authMiddleware, sendMessage);


app.get("/health", health);

module.exports.handler = serverless(app);

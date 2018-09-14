require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const messagesCtrl = require('./messagesCtrl');
const session = require('express-session');

const app = express();

// destructure from process.env
let { SERVER_PORT } = process.env;

// middlware
app.use(bodyParser.json());
app.use(session({
  secret: 'l;kajsdglhalsdkjflaksdjf',
  resave: false,
  saveUninitialized: true
}))

// endpoints
app.get('/api/messages', messagesCtrl.getAllMessages)
app.post('/api/messages', messagesCtrl.createMessage)
app.get('/api/history', messagesCtrl.history)

// listen on port
app.listen(SERVER_PORT, () => {
  console.log(`Listening on port: ${SERVER_PORT}`);
})
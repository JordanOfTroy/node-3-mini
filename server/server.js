require ('dotenv').config()

const express = require('express'),
      bodyparser = require('body-parser'),
      messagesCtrl = require('./messagesCtrl'),
      session = require('express-session')

const app = express()

let {SERVER_PORT} = process.env

app.use(bodyparser.json())
app.use(session({
  secret: 'this string can be anything you want and doesnt have to make sensepkudshgjgflgjahgukhdfghk;afgkj;zdf',
  resave: false,
  saveUninitialized: true
}))
app.use((req, res, next) => {
  let badWords = ['knucklehead', 'jerk', 'internet explorer'];
  if (req.body.message) {
    let badWordsExist = true;
    for (let i = 0; i < badWords.length; i++) {
      let regex = new RegExp(badWords[i], 'g');
      req.body.message = req.body.message.replace(regex, '****');
    }
    next();
  } else {
    next();
  }
});

app.get('/api/messages', messagesCtrl.getAllMessages)
app.post('/api/messages', messagesCtrl.createMessage)
app.get('/api/history', messagesCtrl.history)


app.listen(SERVER_PORT, () => {
  console.log(`The magic is happening on ${SERVER_PORT}`)
})
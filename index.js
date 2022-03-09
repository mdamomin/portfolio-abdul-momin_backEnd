const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const nodemailer = require('nodemailer');

app.post('/nodemail', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'md.mominb@gmail.com',
      pass: process.env.NODEMAIL_PASS,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: 'md.mominb@gmail.com',
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.textMessage,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.json('success');
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello !!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

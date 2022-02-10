const path = require('path');
const axios = require('axios');

const bodyParser = require('body-parser');
const text = require('textbelt');
const http = require('http');
const fs = require('fs');

// ========================================================================== //
// Send emails *netlify background function*
// ========================================================================== //
const { jsPDF } = require('jspdf');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const transporter = nodemailer.createTransport(
  mg({
    auth: {
      // api_key: process.env.MAILGUN_API_KEY,
      apiKey: process.env.MAILGUN_API_KEY || '394b1cc46202ded744e9437fd5f658cd-45f7aa85-719a1d13',
      domain: process.env.MAILGUN_DOMAIN || 'sandbox44a24e3174d54769aeab5887bd0badd6.mailgun.org',
    },
  }),
);

exports.handler = async function ({
  path, httpMethod, headers, queryStringParameters, body, isBase64Encoded,
}, context) {
  const { message, recipient } = body;
  console.log(`Sending PDF report to ${recipient}`);

  const report = Buffer.from(
    new jsPDF().text(message, 10, 10).output('arraybuffer'),
  );
  const invoice = await transporter.sendMail({
    from: process.env.MAILGUN_SENDER || 'aandjmaintenancecbr@gmail.com',
    to: recipient,
    subject: 'Your booking for AJ Garden Care',
    text: 'See attached booking PDF',
    attachments: [
      {
        filename: `report-${new Date().toDateString()}.pdf`,
        content: report,
        contentType: 'application/pdf',
      },
    ],
    message,
  },
  (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log(info);
  });

  const notify = await transporter.sendMail({
    from: process.env.MAILGUN_SENDER || 'aandjmaintenancecbr@gmail.com',
    to: process.env.MAILGUN_SENDER || 'aandjmaintenancecbr@gmail.com',
    subject: 'Your booking for AJ Garden Care',
    text: 'See attached booking PDF',
    attachments: [
      {
        filename: `report-${new Date().toDateString()}.pdf`,
        content: report,
        contentType: 'application/pdf',
      },
    ],
    message,
  },
  (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log(info);
  });
  console.log(`PDF report sent: ${invoice.messageId}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: JSON.stringify(invoice, notify) }),
    isBase64Encoded: false,
    multiValueHeaders: {
      'Content-Type': 'application/json',
    },
  };
};

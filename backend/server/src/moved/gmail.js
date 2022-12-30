
const nodemailer = require('nodemailer');
const log = console.log;
 
// Step 2
let mailOptions = {
    from: 'abc@gmail.com', // TODO: email sender
    to: 'cba@gmail.com', // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!'
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs');
    }
    return log('Email sent!!!');
});



// ========================================================================== //
// makeContact
// ========================================================================== //
app.post('/api/sendEmail', async (req, res) => {
  console.log(req);
  const { message, recipient } = req.body;

  // method to parse string from body

  console.log(`Sending PDF report to ${recipient}`);

  const report = Buffer.from(new jsPDF().text(JSON.stringify(message, null, 2), 10, 10).output('arraybuffer'));
  const invoice = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: recipient,
      subject: 'Your booking with Aiden Faulconer',
      text: 'See attached booking PDF of your booking, expect a response within 1-3 business days.',
      attachments: [report && {
        filename: `report-${new Date().toDateString()}.pdf`,
        content: report,
        contentType: 'application/pdf',
      }],
      message,
    },
    (err, info) => {
      if (err) console.log(err);
      console.log(info);
    },
  );

  const notify = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: process.env.MAIL_SENDER,
      subject: 'Your booking with Aiden Faulconer',
      text: 'See attached PDF of your booking, expect a response within 1-3 business days.',
      attachments: [report && {
        filename: `report-${new Date().toDateString()}.pdf`,
        content: report,
        contentType: 'application/pdf',
      }],
      message,
    },
    (err, info) => {
      if (err) console.log(err);
      console.log(info);
    },
  );

  console.log(`PDF report sent: ${recipient} and ${process.env.MAIL_SENDER}`);

  res.send({
    statusCode: 200,
    body: JSON.stringify({ message: JSON.stringify(invoice, notify) }),
    isBase64Encoded: false,
    multiValueHeaders: {
      'Content-Type': 'application/json',
    },
  });
});



const { jsPDF } = require('jspdf');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST || 'smtp.mail.yahoo.com',
  port: 465,
  secure: true,
  debug: true,
  logger: true,
  auth: {
    user: process.env.MAIL_SENDER || '',
    pass: process.env.MAIL_P || '',
  },
});



// ========================================================================== //
// makeContact
// ========================================================================== //
app.post('/api/sendEmail', async (req, res) => {
  console.log(req);
  const { message, recipient } = req.body;

  // method to parse string from body

  console.log(`Sending PDF report to ${recipient}`);

  const report = Buffer.from(new jsPDF().text(JSON.stringify(message, null, 2), 10, 10).output('arraybuffer'));
  const invoice = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: recipient,
      subject: 'Your booking with Aiden Faulconer',
      text: 'See attached booking PDF of your booking, expect a response within 1-3 business days.',
      attachments: [report && {
        filename: `report-${new Date().toDateString()}.pdf`,
        content: report,
        contentType: 'application/pdf',
      }],
      message,
    },
    (err, info) => {
      if (err) console.log(err);
      console.log(info);
    },
  );

  const notify = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: process.env.MAIL_SENDER,
      subject: 'Your booking with Aiden Faulconer',
      text: 'See attached PDF of your booking, expect a response within 1-3 business days.',
      attachments: [report && {
        filename: `report-${new Date().toDateString()}.pdf`,
        content: report,
        contentType: 'application/pdf',
      }],
      message,
    },
    (err, info) => {
      if (err) console.log(err);
      console.log(info);
    },
  );

  console.log(`PDF report sent: ${recipient} and ${process.env.MAIL_SENDER}`);

  res.send({
    statusCode: 200,
    body: JSON.stringify({ message: JSON.stringify(invoice, notify) }),
    isBase64Encoded: false,
    multiValueHeaders: {
      'Content-Type': 'application/json',
    },
  });
});

// ========================================================================== //
// makeBooking
// ========================================================================== //
const streamConfig = {
  // ./file-name.ext
  // {highWaterMark: 16}
};
// No more than 5mb total TODO: will upgrade host to AWs for more advanced use cases and larger files
const readImageFiles = (files) => {
  const images = [];
  files.forEach((file) => {
    const { createReadStream } = file;
    const stream = createReadStream(streamConfig);
    stream.on('data', (data) => images.push(data));// transfer bye by byte in chunks
    stream.on('end', () => console.log('end :', Buffer.concat(file).toString()));
    stream.on('error', (err) => console.log('error :', err));
  });
  return images.map((file) => ({
    filename: `referencePhotos-${new Date().toDateString()}.jpg`,
    content: file,
    contentType: 'application/jpg',
  }));
};


app.post('/api/makeContact', async (req, res) => {
  console.log(req);
  let { message, referencePhotos, recipient } = req.body;
  const report = Buffer.from(new jsPDF().text(JSON.stringify(message, null, 2), 10, 10).output('arraybuffer'));
  referencePhotos = referencePhotos.length > 0 ? readImageFiles(referencePhotos) : [];
  const attachments = [
    ...referencePhotos,
    report && {
      filename: `report-${new Date().toDateString()}.pdf`,
      content: report,
      contentType: 'application/pdf',
    }];

  const invoice = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: recipient,
      subject: 'Your booking with Aiden Faulconer',
      text: 'See attached booking PDF of your booking, expect a response within 1-3 business days.',
      attachments,
      message,
    },
    (err, info) => {
      if (err) console.log(err);
      console.log(info);
    },
  );

  const notify = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: process.env.MAIL_SENDER,
      subject: 'Your booking with Aiden Faulconer',
      text: 'See attached PDF of your booking, expect a response within 1-3 business days.',
      attachments,
      message,
    },
    (err, info) => {
      if (err) console.log(err);
      console.log(info);
    },
  );

  console.log(`PDF report sent: ${recipient} and ${process.env.MAIL_SENDER}`);

  res.send({
    statusCode: 200,
    body: JSON.stringify({ message: JSON.stringify(invoice, notify) }),
    isBase64Encoded: false,
    multiValueHeaders: {
      'Content-Type': 'application/json',
    },
  });
});
const express = require('express')
const router = express.Router()
const multer = require('multer')

// ========================================================================== //
// setup filesyste with multer
// ========================================================================== //
// Multer file storage
const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../attachments')
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

// Middleware to get a single attachment
const attachmentUpload = multer({
  storage: Storage,
}).single('attachment')

const streamConfig = {
  // ./file-name.ext
  // {highWaterMark: 16}
}
// No more than 5mb total TODO: will upgrade host to AWs for more advanced use cases and larger files

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/contact', async (req, res) => {
  let { message, firstName, lastName, email, phone } = req.body

  referencePhotos =
    referencePhotos.length > 0 ? readImageFiles(referencePhotos) : []
  const attachments = [
    ...referencePhotos,
    report && {
      filename: `report-${new Date().toDateString()}.pdf`,
      content: report,
      contentType: 'application/pdf',
    },
  ]

  const invoice = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: recipient,
      subject: 'Your booking with Aiden Faulconer',
      text:
        'See attached booking PDF of your booking, expect a response within 1-3 business days.',
      attachments,
      message,
    },
    (err, info) => {
      if (err) console.log(err)
      console.log(info)
    },
  )

  const notify = await transporter.sendMail(
    {
      from: process.env.MAIL_SENDER,
      to: process.env.MAIL_SENDER,
      subject: 'Your booking with Aiden Faulconer',
      text:
        'See attached PDF of your booking, expect a response within 1-3 business days.',
      attachments,
      message,
    },
    (err, info) => {
      if (err) console.log(err)
      console.log(info)
    },
  )

  console.log(`PDF report sent: ${recipient} and ${process.env.MAIL_SENDER}`)

  res.send({
    statusCode: 200,
    body: JSON.stringify({ message: JSON.stringify(invoice, notify) }),
    isBase64Encoded: false,
    multiValueHeaders: {
      'Content-Type': 'application/json',
    },
  })
})

//export router so the server can find this controller
module.exports = router

const express = require('express')
const router = express.Router()
const { jsPDF } = require('jspdf')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST || 'smtp.mail.yahoo.com',
  port: 465, //ssl
  //   port: 587,//tls
  secure: true,
  debug: true,
  logger: true,
  auth: {
    user: process.env.MAIL_SENDER || '',
    pass: process.env.MAIL_P || '',
  },
})

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/contact', async (req, res) => {
  const { firstName, lastName, email, phone, comment, tc } = req.body

  try {
    const notify = await transporter.sendMail(
      {
        from: process.env.MAIL_SENDER,
        to: email,
        subject: 'Your Podcast appointment with business educated 🦁',
        text:
          'See attached PDF of your inquiry, expect a response within 7-14 business days.',
        // attachments: [
        //   report && {
        //     filename: `report-${new Date().toDateString()}.pdf`,
        //     content: report,
        //     contentType: 'application/pdf',
        //   },
        // ],
        message: comment,
      },
      (err, info) => {
        if (err) console.log(err)
        else
          res.send({
            statusCode: 200,
            body: JSON.stringify(notify),
            isBase64Encoded: false,
            multiValueHeaders: {
              'Content-Type': 'application/json',
            },
          })
      },
    )
  } catch (err) {
    console.error(err)
  }
})

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/contactPodcast', async (req, res) => {
  const { firstName, lastName, email, phone, comment, tc } = req.body

  try {
    const notify = await transporter.sendMail(
      {
        from: process.env.MAIL_SENDER,
        to: email,
        subject: 'Your Podcast appointment with business educated 🦁',
        text:
          'See attached PDF of your inquiry, expect a response within 7-14 business days.',
        // attachments: [
        //   report && {
        //     filename: `report-${new Date().toDateString()}.pdf`,
        //     content: report,
        //     contentType: 'application/pdf',
        //   },
        // ],
        message: comment,
      },
      (err, info) => {
        if (err) console.log(err)
        else
          res.send({
            statusCode: 200,
            body: JSON.stringify(notify),
            isBase64Encoded: false,
            multiValueHeaders: {
              'Content-Type': 'application/json',
            },
          })
      },
    )
  } catch (err) {
    console.error(err)
  }
})

//export router so the server can find this controller
module.exports = router

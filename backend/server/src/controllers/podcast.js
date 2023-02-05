const express = require('express')
const router = express.Router()
const { addToSpreadsheet } = require('../util/google-spreadsheets')
const { sendGmail, loadEmailTemplate } = require('../util/gmail')
const { getDate } = require('../util/date')
const { check, validationResult } = require('express-validator/check')

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post(
  '/',
  [
    check('firstName').isString().isLength({ min: 1 }),
    check('lastName').isString().isLength({ min: 1 }),
    check('email').isString().isEmail().isLength({ min: 1 }),
    check('phone').isString().isLength({ min: 1 }),
    check('message').isString().isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req.body)
      if (!errors.isEmpty()) {
        throw new Error('Invalid request body')
      }

      const { firstName, lastName, email, phone, message, tc } = req.body

      // Send email to recipient
      await sendGmail(
        // loadEmailTemplate('contactTemplate', {
        //   name: `${firstName} ${lastName}`,
        // }),
        `thank you ${firstName} ${lastName} for reaching out, we will get back to you in 7 business days, we will discuss availability`,
        '🎉 Welcome to the Business Educated podcast 🎉',
        email,
        process.env.GMAIL_ADDRESS,
        null,
      )

      // Send email to Business Educated
      await sendGmail(
        // loadEmailTemplate('contactTemplate', {
        //   name: `${firstName} ${lastName}`,
        // }),
        message,
        `Podcast Inquiry from ${firstName} ${lastName} ${getDate()}`,
        process.env.GMAIL_ADDRESS,
        process.env.GMAIL_ADDRESS,
        null,
      )

      // Add contact to spreadsheet
      await addToSpreadsheet(
        { firstName, lastName, email, phone, message },
        process.env.PODCAST_SPREADSHEET_ID,
        'podcast',
      )

      // Send success response to client
      res.send({
        statusCode: 200,
        body: JSON.stringify('successfully submitted podcast inquiry'),
        isBase64Encoded: false,
        multiValueHeaders: {
          'Content-Type': 'application/json',
        },
      })
    } catch (err) {
      // Log error
      console.error(err)

      // Send error response to client
      res.send({
        statusCode: 500,
        body: JSON.stringify({ error: 'An error occurred' }),
        isBase64Encoded: false,
        multiValueHeaders: {
          'Content-Type': 'application/json',
        },
      })
    }
  },
)

//export router so the server can find this controller
module.exports = router

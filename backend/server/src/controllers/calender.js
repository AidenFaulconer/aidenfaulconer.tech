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
router.get('/getUnavailableDates', async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req.body)
    if (!errors.isEmpty()) {
      throw new Error('Invalid request body')
    }

    const { firstName, lastName, email, phone, comment, tc } = req.body

    // get availibility for the next 5 months
    const currentDate = new Date()
    const fiveMonthsFromNow = new Date()
    fiveMonthsFromNow.setMonth(currentDate.getMonth() + 5)

    const response = await getUnavailableDates(
      currentDate.toISOString(),
      fiveMonthsFromNow.toISOString(),
    )

    // Send success response to client
    res.send({
      data: { ...response.data },
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
})

//export router so the server can find this controller
module.exports = router

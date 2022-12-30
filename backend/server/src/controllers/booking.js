const express = require('express')
const router = express.Router()
const LOOM_API_URL = 'https://api.loom.com/api'

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/something', async (req, res) => {
  const { date } = req.params

  try {
    // Set the date and time for the booking
    const startDate = new Date(date)
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000) // 30 minutes

    // Set the booking data
    const bookingData = {
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      duration: 30,
      title: 'My Booking',
      description: 'This is a test booking',
      attendees: [
        {
          email: 'attendee1@example.com',
          first_name: 'Attendee',
          last_name: 'One',
        },
        {
          email: 'attendee2@example.com',
          first_name: 'Attendee',
          last_name: 'Two',
        },
      ],
    }

    // Make the API request to create the booking
    const response = await axios.post(
      `${process.env.LOOM_API_URL}/bookings`,
      bookingData,
    )

    res.send({
      statusCode: 200,
      body: JSON.stringify(response),
      isBase64Encoded: false,
      multiValueHeaders: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router

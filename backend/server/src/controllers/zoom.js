const axios = require('axios')
const { Validator } = require('jsonschema')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Set the API endpoint and headers
const endpoint = 'https://api.zoom.us/v2/users/me/meetings'
const apiKey = process.env.ZOOM_API_KEY
const apiSecret = process.env.ZOOM_CLIENT_SECRET

router.post('/createZoomMeeting', async (req, res) => {
  try {
    // Get the date and time for the meeting
    const { datetime, topic, timezone = 'AEDT' } = req.body

    // Set the start time for the meeting in the ISO 8601 format
    const startTime = new Date(datetime).toISOString()
    const duration = 60
    const password = bcrypt.hashSync(
      process.env.SALT,
      'businessEducatedZoomPassword007169',
    )

    // Set the request body for the API call
    const data = {
      topic,
      start_time: startTime,
      duration,
      timezone,
      password,
    }

    const payload = {
      iss: apiKey,
      exp: Date.now() + 5000,
    }

    const token = jwt.sign(payload, apiSecret)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    // Make the API call
    const {
      data: {
        join_url,
        uuid,
        id,
        host_id,
        host_email,
        type,
        status,
        start_time,
        created_at,
        start_url,
        encrypted_password,
      },
    } = await axios.post(endpoint, data, { headers })

    // Return the invite link to the client
    res.json()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router

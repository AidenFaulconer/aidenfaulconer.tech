const axios = require('axios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Set the API endpoint and headers
const endpoint = 'https://api.zoom.us/v2/users/me/meetings'
const apiKey = process.env.ZOOM_API_KEY
const apiSecret = process.env.ZOOM_CLIENT_SECRET

// Get the date and time for the meeting
const createZoomMeeting = async (date, topic, timezone = 'AEDT') => {
  try {
    // Set the start time for the meeting in the ISO 8601 format
    const startTime = new Date(date).toISOString()
    const duration = 60

    const saltRounds = 1
    const plaintextPassword = 'businessEducatedZoomPassword007169'

    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(plaintextPassword, salt)

    // Extract the first 10 characters of the hashed password (10 max allowed for zoom passwords)
    const password = hashedPassword.substring(0, 10)

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

    return {
      status: 200,
      data: { host_email, join_url, start_time, created_at, password },
    }
  } catch (error) {
    return {
      status: 500,
      error: error.message,
    }
  }
}

module.exports = { createZoomMeeting }

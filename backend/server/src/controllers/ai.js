const express = require('express')
const router = express.Router()

const OPENAI_API_URL = 'https://api.openai.com/v1/images'

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/ai', async (req, res) => {
  const { prompt } = req.body
  try {
    // Set the request data
    const requestData = {
      prompt: prompt,
      temperature: 0.5,
    }

    // Make the API request to chat with GPT-3
    const response = await axios.post(
      `${process.env.OPENAI_API_URL}/images`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    )

    // Get the response from GPT-3
    const chatResponse = response.data.data.response

    return chatResponse
  } catch (error) {
    console.error(error)
  }
})
//export router so the server can find this controller
module.exports = router

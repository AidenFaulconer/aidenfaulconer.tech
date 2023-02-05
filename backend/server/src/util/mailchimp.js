const express = require('express')
const axios = require('axios')

// POST route for subscribing a user to a Mailchimp newsletter
const subscribeToNewsletter = async (email) => {
  try {
    // Set the options for the API call
    const options = {
      method: 'POST',
      url: `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
      auth: {
        user: 'username',
        pass: process.env.MAILCHIMP_API_KEY,
      },
      data: {
        email_address: email,
        status: 'subscribed',
      },
    }

    // Make the API call
    const response = await axios(options)

    // Send a success response
    return {
      message: 'Successfully subscribed to the newsletter.',
      response: response.data,
    }
  } catch (error) {
    console.error(error)

    // Send an error response
    return {
      status: 400,
      message: 'An error occurred while subscribing to the newsletter.',
      error: error,
    }
  }
}

module.exports = { subscribeToNewsletter }

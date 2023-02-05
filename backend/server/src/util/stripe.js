require('dotenv').config({
  path: `${__dirname}/../../../.env.${process.env.NODE_ENV}`,
})

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const validatePayment = async (paymentIntentClientSecret, paymentIntentId) => {
  // Retrieve the PaymentIntent with the specified ID
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  // Check the PaymentIntent's status
  if (paymentIntent.status === 'succeeded') {
    // Payment was successful
    return true
  } else {
    // Payment was not successful
    return false
  }
}

module.exports = { validatePayment }

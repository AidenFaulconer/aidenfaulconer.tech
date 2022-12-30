const express = require('express')
const router = express.Router()

const keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY
const keySecret = process.env.STRIPE_SECRET_KEY

const Stripe = require('stripe')(keySecret)
const bodyParser = require('body-parser')

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/create-payment-intent', async (req, res) => {
  const { currency, paymentMethodType, paymentMethodOptions } = req.body
  // Create a PaymentIntent with the order amount and currency.
  const params = {
    amount: 5999,
    currency,
    payment_method_types: [paymentMethodType],
  }

  // If this is for an ACSS payment, we add payment_method_options to create
  // the Mandate.
  if (paymentMethodType === 'acss_debit') {
    params.payment_method_options = {
      acss_debit: {
        mandate_options: {
          payment_schedule: 'sporadic',
          transaction_type: 'personal',
        },
      },
    }
  } else if (paymentMethodType === 'customer_balance') {
    params.payment_method_data = {
      type: 'customer_balance',
    }
    params.confirm = true
    params.customer =
      req.body.customerId ||
      (await stripe.customers.create().then((data) => data.id))
  }

  /**
   * If API given this data, we can overwride it
   */
  if (paymentMethodOptions) {
    params.payment_method_options = paymentMethodOptions
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create(params)

    // Send publishable key and PaymentIntent client_secret to client.
    res.send({
      clientSecret: paymentIntent.client_secret,
      nextAction: paymentIntent.next_action,
    })
  } catch (e) {
    res.status(400).send({
      error: {
        message: e.message,
      },
    })
  }
})

/**
 * This function comment is parsed by doctrine
 * Expose a endpoint as a webhook handler for asynchronous events.
 * Configure your webhook in the stripe developer dashboard:
 * https://dashboard.stripe.com/test/webhooks
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post(
  '/webhook',
  // Use body-parser to retrieve the raw body as a buffer.
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET,
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`)
      res.sendStatus(400)
      return
    }

    // Extract the data from the event.
    const data = event.data
    const eventType = event.type

    if (eventType === 'payment_intent.succeeded') {
      // Cast the event into a PaymentIntent to make use of the types.
      const pi = data.object
      // Funds have been captured
      // Fulfill any orders, e-mail receipts, etc
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds).
      console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`)
      console.log('💰 Payment captured!')
    } else if (eventType === 'payment_intent.payment_failed') {
      // Cast the event into a PaymentIntent to make use of the types.
      const pi = data.object
      console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`)
      console.log('❌ Payment failed.')
    }
    res.sendStatus(200)
  },
)
 

//METHODS + examples

// Create a new customer
// const customerData = {
//   description: 'New customer',
//   email: 'customer@example.com',
// }
// const createCustomerResponse = async () => await axios.post(
//   `${process.env.STRIPE_API_URL}/customers`,
//   customerData,
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )
// const customer = createCustomerResponse.data


// // Create a new payment method
// const paymentMethodData = {
//   type: 'card',
//   card: {
//     number: '4242 4242 4242 4242',
//     exp_month: 12,
//     exp_year: 2025,
//     cvc: 123,
//   },
// }
// const createPaymentMethodResponse = async () => await axios.post(
//   `${process.env.STRIPE_API_URL}/payment_methods`,
//   paymentMethodData,
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )

// const paymentMethod = createPaymentMethodResponse.data

// // Attach the payment method to the customer
// const attachPaymentMethodToCustomerResponse = async () => await axios.post(
//   `${process.env.STRIPE_API_URL}/payment_methods/${paymentMethod.id}/attach`,
//   { customer: customer.id },
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )

// // Set the default payment method for the customer
// const setDefaultPaymentMethodResponse = async () => await axios.post(
//   `${process.env.STRIPE_API_URL}/customers/${customer.id}/default_payment_method`,
//   { payment_method: paymentMethod.id },
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )

// // Create a new subscription
// const subscriptionData = {
//   customer: customer.id,
//   items: [
//     {
//       plan: 'plan_123',
//     },
//   ],
// }
// const createSubscriptionResponse = async () => await axios.post(
//   `${process.env.STRIPE_API_URL}/subscriptions`,
//   subscriptionData,
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )
// const subscription = createSubscriptionResponse.data

// // Retrieve the subscription
// const getSubscriptionResponse = async () => await axios.get(
//   `${process.env.STRIPE_API_URL}/subscriptions/${subscription.id}`,
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )
// const retrievedSubscription = getSubscriptionResponse.data

// // Update the subscription
// const updateSubscriptionResponse = async () => await axios.post(
//   `${process.env.STRIPE_API_URL}/subscriptions/${subscription.id}`,
//   {
//     cancel_at_period_end: true,
//   },
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )
// const updatedSubscription = updateSubscriptionResponse.data

// // Cancel the subscription
// const cancelSubscriptionResponse = async () => await axios.delete(
//   `${process.env.STRIPE_API_URL}/subscriptions/${subscription.id}`,
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )


// // Attach the payment method to the customer
// const attachPaymentMethodToCustomerResponse = async () => await axios.post(
//   `${process.env.STRIPE_API_URL}/payment_methods/${paymentMethod.id}/attach`,
//   { customer: customer.id },
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )

// Set the default payment method for the customer
// const setDefaultPaymentMethodResponse = async () => await axios.post(
//   `${process.env.STRIPE_API_URL}/customers/${customer.id}/default_payment_method`,
//   { payment_method: paymentMethod.id },
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )

// Create a new invoice
// const invoiceData = {
//   customer: customer.id,
//   amount: 1000,
//   currency: 'USD',
//   collection_method: 'send_invoice',
// }
// const createInvoiceResponse = async () => await axios.post(
//   `${process.env.STRIPE_API_URL}/invoices`,
//   invoiceData,
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )
// const invoice = createInvoiceResponse.data

// // Send the invoice
// const sendInvoiceResponse = async () => await axios.post(
//   `${process.env.STRIPE_API_URL}/invoices/${invoice.id}/send`,
//   {},
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )


// // Make a payment on the invoice
// const paymentData = {
//   payment_method: paymentMethod.id,
// }
// const makePaymentResponse = async () => await axios.post(
//   `${process.env.STRIPE_API_URL}/invoices/${invoice.id}/pay`,
//   paymentData,
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//     },
//   },
// )

//export router so the server can find this controller
module.exports = router

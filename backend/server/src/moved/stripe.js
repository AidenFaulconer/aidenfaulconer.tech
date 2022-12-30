import axios from 'axios';
 
async function stripeMethod() {
  try {
    // Create a new customer
    const customerData = {
      description: 'New customer',
      email: 'customer@example.com',
    };
    const createCustomerResponse = await axios.post(`${process.env.STRIPE_API_URL}/customers`, customerData, {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    });
    const customer = createCustomerResponse.data;

    // Create a new payment method
    const paymentMethodData = {
      type: 'card',
      card: {
        number: '4242 4242 4242 4242',
        exp_month: 12,
        exp_year: 2025,
        cvc: 123,
      },
    };
    const createPaymentMethodResponse = await axios.post(`${process.env.STRIPE_API_URL}/payment_methods`, paymentMethodData, {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    });
    const paymentMethod = createPaymentMethodResponse.data;

    // Attach the payment method to the customer
    const attachPaymentMethodToCustomerResponse = await axios.post(
      `${process.env.STRIPE_API_URL}/payment_methods/${paymentMethod.id}/attach`,
      { customer: customer.id },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      },
    );

    // Set the default payment method for the customer
    const setDefaultPaymentMethodResponse = await axios.post(
      `${process.env.STRIPE_API_URL}/customers/${customer.id}/default_payment_method`,
      { payment_method: paymentMethod.id },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      },
    );

    // Create a new subscription
    const subscriptionData = {
      customer: customer.id,
      items: [
        {
          plan: 'plan_123',
        },
      ],
    };
    const createSubscriptionResponse = await axios.post(`${process.env.STRIPE_API_URL}/subscriptions`, subscriptionData, {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    });
    const subscription = createSubscriptionResponse.data;

    // Retrieve the subscription
    const getSubscriptionResponse = await axios.get(`${process.env.STRIPE_API_URL}/subscriptions/${subscription.id}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    });
    const retrievedSubscription = getSubscriptionResponse.data;

    // Update the subscription
    const updateSubscriptionResponse = await axios.post(
      `${process.env.STRIPE_API_URL}/subscriptions/${subscription.id}`,
      {
        cancel_at_period_end: true,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      },
    );
    const updatedSubscription = updateSubscriptionResponse.data;

    // Cancel the subscription
    const cancelSubscriptionResponse = await axios.delete(`${process.env.STRIPE_API_URL}/subscriptions/${subscription.id}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

// Attach the payment method to the customer
const attachPaymentMethodToCustomerResponse = await axios.post(
  `${process.env.STRIPE_API_URL}/payment_methods/${paymentMethod.id}/attach`,
  { customer: customer.id },
  {
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    },
  },
);

// Set the default payment method for the customer
const setDefaultPaymentMethodResponse = await axios.post(
  `${process.env.STRIPE_API_URL}/customers/${customer.id}/default_payment_method`,
  { payment_method: paymentMethod.id },
  {
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    },
  },
);

// Create a new invoice
const invoiceData = {
  customer: customer.id,
  amount: 1000,
  currency: 'USD',
  collection_method: 'send_invoice',
};
const createInvoiceResponse = await axios.post(`${process.env.STRIPE_API_URL}/invoices`, invoiceData, {
  headers: {
    Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
  },
});
const invoice = createInvoiceResponse.data;

// Send the invoice
const sendInvoiceResponse = await axios.post(`${process.env.STRIPE_API_URL}/invoices/${invoice.id}/send`, {}, {
  headers: {
    Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
  },
});

// Make a payment on the invoice
const paymentData = {
  payment_method: paymentMethod.id,
};
const makePaymentResponse = await axios.post(`${process.env.STRIPE_API_URL}/invoices/${invoice.id}/pay`, paymentData, {
  headers: {
    Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
  },
});



stripeMethod();

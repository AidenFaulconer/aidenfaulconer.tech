const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const app = require('express')();
const stripe = require('stripe')(keySecret);

app.set('view engine', 'pug');
app.use(require('body-parser').urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index.pug', { keyPublishable }));

app.post('/charge', (req, res) => {
  const amount = 500;

  stripe.customers.create({
    email: req.body.stripeEmail,
    card: req.body.stripeToken,
  })
    .then((customer) => stripe.charges.create({
      amount,
      description: 'Sample Charge',
      currency: 'usd',
      customer: customer.id,
    }))
    .catch((err) => console.log('Error:', err))
    .then((charge) => res.render('charge.pug'));
});

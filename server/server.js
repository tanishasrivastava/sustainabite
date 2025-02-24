const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Replace with your PhonePe credentials
const MERCHANT_ID = 'PGTESTPAYUAT86';
const SALT_KEY = 'YOUR_SALT_KEY';
const SALT_INDEX = 1;
const PHONEPE_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay'; // Sandbox URL

// Function to generate SHA256 checksum
function generateChecksum(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64');
  const hash = crypto.createHmac('sha256', SALT_KEY).update(data).digest('hex');
  return `${hash}###${SALT_INDEX}`;
}

// Endpoint to initiate payment
app.post('/initiate-payment', (req, res) => {
  const { amount, merchantTransactionId } = req.body;

  const payload = {
    merchantId: MERCHANT_ID,
    merchantTransactionId: merchantTransactionId,
    amount: amount * 100, // Amount in paise
    callbackUrl: 'http://localhost:3000/payment-callback', // Your callback URL
    redirectUrl: 'http://localhost:3001/payment-redirect', // Your redirect URL
    paymentInstrument: {
      type: 'PAY_PAGE',
    },
  };

  const checksum = generateChecksum(payload);

  const requestData = {
    request: Buffer.from(JSON.stringify(payload)).toString('base64'),
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
    },
    body: JSON.stringify(requestData),
  };

  fetch(PHONEPE_URL, options)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Payment initiation failed' });
    });
});

// Callback endpoint to handle payment response
app.post('/payment-callback', (req, res) => {
  const { response } = req.body;
  const decodedResponse = Buffer.from(response, 'base64').toString('utf-8');
  const paymentResponse = JSON.parse(decodedResponse);

  // Verify the checksum
  const checksum = paymentResponse.checksum;
  const isValid = verifyChecksum(paymentResponse, checksum);

  if (isValid) {
    // Handle successful payment
    console.log('Payment successful:', paymentResponse);
    res.status(200).json({ status: 'success' });
  } else {
    // Handle failed payment
    console.log('Payment failed:', paymentResponse);
    res.status(400).json({ status: 'failure' });
  }
});

// Function to verify checksum
function verifyChecksum(paymentResponse, checksum) {
  const data = Buffer.from(JSON.stringify(paymentResponse)).toString('base64');
  const hash = crypto.createHmac('sha256', SALT_KEY).update(data).digest('hex');
  return `${hash}###${SALT_INDEX}` === checksum;
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
require('dotenv').config();

module.exports = {
  store_id: process.env.SSL_STORE_ID,
  store_passwd: process.env.SSL_STORE_PASS,
  is_live: process.env.SSL_IS_LIVE === 'true',
  success_url: `${process.env.API_URL}/api/payment/success`,
  fail_url: `${process.env.API_URL}/api/payment/fail`,
  cancel_url: `${process.env.API_URL}/api/payment/cancel`,
};
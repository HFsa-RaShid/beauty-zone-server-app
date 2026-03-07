const express = require("express");
const router = express.Router();
const { initiatePayment, paymentSuccess, paymentFail } = require("../controllers/paymentController");

router.post("/init", initiatePayment);
router.post("/success/:tranId", paymentSuccess);
router.post("/fail/:tranId", paymentFail);

module.exports = router;
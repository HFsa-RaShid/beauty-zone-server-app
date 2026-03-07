const express = require("express");
const router = express.Router();
const { initiatePayment, paymentSuccess, paymentFail, getOrders } = require("../controllers/paymentController");

router.post("/init", initiatePayment);
router.post("/success/:tranId", paymentSuccess);
router.post("/fail/:tranId", paymentFail);
router.get("/", getOrders);

module.exports = router;
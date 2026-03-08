const SSLCommerzPayment = require("sslcommerz-lts");
const { ObjectId } = require("mongodb");
const Payment = require("../models/payment");
const sslConfig = require("../config/sslcommerz");

const initiatePayment = async (req, res) => {
  const { name, email, phone, address, city, postcode, items, totalAmount } =
    req.body;

  const tran_id = new ObjectId().toString();

  const data = {
    total_amount: parseFloat(totalAmount),
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${process.env.API_URL}/api/payment/success/${tran_id}`,
    fail_url: `${process.env.API_URL}/api/payment/fail/${tran_id}`,
    cancel_url: `${process.env.API_URL}/api/payment/cancel`,
    ipn_url: `${process.env.API_URL}/api/payment/ipn`,
    shipping_method: "Courier",
    product_name: "Skincare Products",
    product_category: "Cosmetics",
    product_profile: "general",
    cus_name: name,
    cus_email: email,
    cus_add1: address,
    cus_city: city,
    cus_postcode: postcode,
    cus_country: "Bangladesh",
    cus_phone: phone,
    ship_name: name,
    ship_add1: address,
    ship_city: city,
    ship_state: city,
    ship_postcode: postcode,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(
    sslConfig.store_id,
    sslConfig.store_passwd,
    sslConfig.is_live,
  );

  try {
    const apiResponse = await sslcz.init(data);
    if (apiResponse?.GatewayPageURL) {
      const newPayment = new Payment({
        transactionId: tran_id,
        items,
        amount: parseFloat(totalAmount),
        customer: { name, email, phone, address, city, postcode },
        paidStatus: false,
      });

      await newPayment.save();
      res.send({ url: apiResponse.GatewayPageURL });
    } else {
      res.status(400).send({ message: "SSLCommerz initiation failed" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const paymentSuccess = async (req, res) => {
  const { tranId } = req.params;

  const result = await Payment.findOneAndUpdate(
    { transactionId: tranId },
    { $set: { paidStatus: true } },
    { new: true },
  );

  if (result) {
    res.redirect(
      `https://beautyzone-react-client.vercel.app/payment/success/${tranId}`,
    );
  } else {
    res.redirect(`https://beautyzone-react-client.vercel.app/payment/fail`);
  }
};

const paymentFail = async (req, res) => {
  const { tranId } = req.params;

  await Payment.findOneAndDelete({ transactionId: tranId });
  res.redirect(`https://beautyzone-react-client.vercel.app/payment/fail`);
};

const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalOrders = await Payment.countDocuments();

    const orders = await Payment.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalOrders / limit),
          totalItems: totalOrders,
        },
      },
    });
  } catch (err) {
    console.error("Order Fetch Error:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = { initiatePayment, paymentSuccess, paymentFail, getOrders };

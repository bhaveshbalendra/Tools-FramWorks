const express = require("express");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/payment.controller.js");

const router = express.Router();

router.post("/createOrder", createOrder);
router.post("/verifyPayment", verifyPayment);

module.exports = router; // Make sure it's exported correctly

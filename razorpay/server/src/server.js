const cors = require("cors");
const express = require("express");
const paymentRoute = require("./routes/payment.route.js");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use("/api", paymentRoute);

app.get("/", (req, res) => {
  res.send("Razorpay server");
});

app.listen(PORT, () => {
  console.log(`Razorpay app Running at ${PORT}`);
});

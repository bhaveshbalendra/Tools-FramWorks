"use client";

import Card from "@/components/Card";
import axios from "axios";
import React, { useEffect } from "react";

const items = [
  {
    title: "React Course",
    description: "This is a React course",
    price: 100,
  },
  {
    title: "JavaScript Course",
    description: "Learn JavaScript from scratch",
    price: 80,
  },
];

// Home Component
const Home = () => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onPayment = async (price, title) => {
    try {
      const options = {
        courseId: 1,
        amount: price * 100, // Razorpay expects amount in paise
      };

      const res = await axios.post(
        "http://localhost:4000/api/createOrder",
        options
      );
      const data = res.data;

      console.log("Order Created:", data);

      const paymentObject = new window.Razorpay({
        key: "rzp_test_sQe4NTce0XOAKj",
        order_id: data.id,
        amount: options.amount,
        currency: "INR",
        name: title,
        description: "Purchase Course",
        handler: function (response) {
          console.log("Payment Response:", response);

          axios
            .post("http://localhost:4000/api/verifyPayment", {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            })
            .then((res) => {
              if (res.data.success) {
                alert("Payment Successful");
              } else {
                alert("Payment Failed");
              }
              console.log("Payment Verification:", res.data);
            })
            .catch((err) => console.log("Verification Error:", err));
        },
        theme: {
          color: "#3399cc",
        },
      });

      paymentObject.open(); // Corrected Razorpay initialization
    } catch (error) {
      console.log("Payment Error:", error);
    }
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {items.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          description={item.description}
          price={item.price}
          onPayment={onPayment}
        />
      ))}
    </div>
  );
};

export default Home;

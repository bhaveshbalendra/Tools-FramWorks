import React from "react";

const Card = ({ title, description, price, onPayment }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="text-green-500 font-bold">₹{price}</p>
      <button
        onClick={() => onPayment(price, title)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Buy Now
      </button>
    </div>
  );
};

export default Card;

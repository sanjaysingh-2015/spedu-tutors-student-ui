import React, { useEffect, useState } from "react";

const PaymentOverview = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.size === 0) {
        setError("No payment data received.");
        return;
      }

      // Extract parameters
      const data = {
        paymentStatus: params.get("status"),
        transactionNumber: params.get("txn"),
      };

      setPaymentData(data);
    } catch (err) {
      console.error("Error reading payment data:", err);
      setError("Failed to parse payment response.");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading payment details...</div>
      </div>
    );
  }

  const isSuccess = paymentData.paymentStatus === "SUCCESS";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2
          className={`text-2xl font-bold text-center ${
            isSuccess ? "text-green-600" : "text-red-600"
          } mb-4`}
        >
          {isSuccess ? "✅ Payment Successful" : "❌ Payment Failed"}
        </h2>

        <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
          <p>
            <span className="font-semibold">Transaction No:</span>{" "}
            {paymentData.transactionNumber}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`font-semibold ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {paymentData.paymentStatus}
            </span>
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOverview;

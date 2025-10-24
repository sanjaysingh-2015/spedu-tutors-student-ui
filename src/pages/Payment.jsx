import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import bgImage from "../assets/images/student-backgroud.png";
import {
  getWallet,
  getWalletTrans,
  getPayments,
  getInitiatePayment,
} from "../services/paymentService";
import { WalletIcon } from "@heroicons/react/24/outline";
import { useMessages } from "../context/MessageContext";

export default function Payment() {
  const { addMessage } = useMessages();
  const [wallet, setWallet] = useState({});
  const [walletTransactions, setWalletTransaction] = useState([]);
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ amount: 250.0 });
  const [initForm, setInitForm] = useState({});
  const [showModal, setShowModal] = useState(false);

  // ✅ Load all data initially
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, walletTransRes, payRes] = await Promise.all([
          getWallet(),
          getWalletTrans(),
          getPayments(),
        ]);

        // 👇 Log raw API responses to verify structure
        console.log("Wallet API:", walletRes.data);
        console.log("Wallet Transactions API:", walletTransRes.data);
        console.log("Payments API:", payRes.data);

        setWallet(walletRes.data || {});
        setWalletTransaction(walletTransRes.data || []);
        setPayments(payRes.data || []);
      } catch (err) {
        console.error("Error fetching wallet or payment info:", err);
        addMessage("Error fetching wallet or payment info", "error");
      }
    };

    fetchData();
  }, []);

  // ✅ Handle messages from gateway iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.origin.includes("https://spedu-gatepay-payment-436077983835.asia-south2.run.app")) return;

      const data = event.data;
      console.log("🟢 Message received from gateway:", data);

      if (["SUCCESS", "FAILED"].includes(data?.paymentStatus)) {
        addMessage(
          `Payment ${data.paymentStatus}`,
          data.paymentStatus === "SUCCESS" ? "success" : "error"
        );

        setTimeout(() => {
          setShowModal(false);
          const redirectUrl = `https://student-ui-436077983835.asia-south2.run.app/payment-overview?status=${data.paymentStatus}&txn=${data.transactionNumber}`;
          window.location.href = redirectUrl;
        }, 10000);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // ✅ Payment handler
  const handlePayment = async () => {
    try {
      if (!form.amount || parseFloat(form.amount) < 250) {
        addMessage("Minimum amount should be ₹250.00", "error");
        return;
      }
      const payInitRes = await getInitiatePayment(form);
      setInitForm(payInitRes.data);
      if (payInitRes.data?.gatewayUrl) setShowModal(true);
    } catch (err) {
      addMessage("Failed to initiate payment", "error");
    }
  };

  return (
    <Layout>
      <div
        className="relative min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>

        {/* Wallet Section */}
        <div className="mb-8 p-6 bg-white/90 rounded-2xl shadow-xl border border-white/30 text-gray-800 backdrop-blur-md">
          <div className="flex items-center gap-2 border-2 border-green-300 rounded-lg p-3 bg-green-50/70 text-gray-900 mb-4">
            <WalletIcon className="w-6 h-6 text-blue-600" />
            <span className="font-semibold ">
              Wallet Balance: ₹{(wallet.balance ?? 0).toFixed(2)}
            </span>
          </div>

          <div className="border-2 border-green-300 rounded-xl p-4 bg-green-50/70 text-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <input
              type="number"
              placeholder="Enter Amount (Min ₹250)"
              value={form.amount}
              min="250"
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: Math.max(250, e.target.value),
                })
              }
              className="border border-green-300 rounded-lg p-3 w-full md:w-1/2 focus:ring-2 focus:ring-green-400 outline-none"
            />

            <button
              onClick={handlePayment}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all"
            >
              Add Amount
            </button>
          </div>
        </div>

        {/* ✅ Two Tables Section */}
        <div className="mb-8 p-6 bg-white/90 rounded-2xl shadow-xl border border-white/30 text-gray-800 backdrop-blur-md">

              {/* Wallet Transactions */}
              <div className="bg-white/90 rounded-xl shadow-lg p-4 border border-white/40 mb-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">
                  Wallet Transactions
                </h3>
                <div className="overflow-y-auto max-h-[400px]">
                  <table className="w-full text-sm text-gray-700 border-collapse">
                    <thead>
                      <tr className="bg-green-100 text-left">
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Transaction#</th>
                        <th className="p-2 border">Type</th>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Reference</th>
                        <th className="p-2 border">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {walletTransactions?.length ? (
                        walletTransactions.map((t, i) => (
                          <tr key={i} className="hover:bg-green-50">
                            <td className="p-2 border">{t.transactionDate}</td>
                            <td className="p-2 border">{t.walletTransactionNo}</td>
                            <td className="p-2 border">{t.transactionType}</td>
                            <td className="p-2 border">₹{t.amount?.toFixed(2)}</td>
                            <td className="p-2 border">{t.reference}</td>
                            <td className={`p-2 border font-semibold ${
                                t.status === "COMPLETED"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}>
                                {t.status}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="p-3 text-center text-gray-500">
                            No transactions found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payments */}
              <div className="bg-white/90 rounded-xl shadow-lg p-4 border border-white/40">
                <h3 className="text-lg font-semibold text-purple-700 mb-3">
                  Payments
                </h3>
                <div className="overflow-y-auto max-h-[400px]">
                  <table className="w-full text-sm text-gray-700 border-collapse">
                    <thead>
                      <tr className="bg-purple-100 text-left">
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Txn#</th>
                        <th className="p-2 border">Method</th>
                        <th className="p-2 border">Gateway ID</th>
                        <th className="p-2 border">Payee</th>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments?.length ? (
                        payments.map((p, i) => (
                          <tr key={i} className="hover:bg-purple-50">
                            <td className="p-2 border">{p.paymentDate}</td>
                            <td className="p-2 border">{p.transactionNumber}</td>
                            <td className="p-2 border">{p.paymentMethod}</td>
                            <td className="p-2 border">{p.gatewayPaymentId}</td>
                            <td className="p-2 border">{p.payeeName}</td>
                            <td className="p-2 border">₹{p.amount?.toFixed(2)}</td>
                            <td
                              className={`p-2 border font-semibold ${
                                p.status === "SUCCESS"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {p.status}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="p-3 text-center text-gray-500">
                            No payments found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
            </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[90%] md:w-[70%] lg:w-[60%] h-[80%] flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-700">
                  Payment Gateway
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>
              <iframe
                src={initForm.gatewayUrl}
                title="Payment Gateway"
                className="flex-grow w-full border-0"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import bgImage from "../assets/images/student-backgroud.png";
import {
  getWallet,
  getWalletTrans,
  getPayments,
  getInitiatePayment,
} from "../services/paymentService";
import {
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useMessages } from "../context/MessageContext";

export default function Payment() {
  const { addMessage } = useMessages();
  const [wallet, setWallet] = useState({});
  const [walletTransactions, setWalletTransaction] = useState([]);
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    payeeName: "",
    transactionNumber: "",
    amount: 0.0,
  });
  const [initForm, setInitForm] = useState({});
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUserName(localStorage.getItem("loggedInUser"));

    const init = async () => {
      try {
        const walletRes = await getWallet();
        setWallet(walletRes.data);
        const walletTransRes = await getWalletTrans();
        setWalletTransaction(walletTransRes.data || []);
        const payRes = await getPayments();
        setPayments(payRes.data || {});
      } catch (err) {
        addMessage("Error fetching wallet or payment info", "error");
      }
    };
    init();
  }, []);

  const handlePayment = async () => {
    try {
      const payInitRes = await getInitiatePayment(form);
      setInitForm(payInitRes.data);
      if (payInitRes.data?.gatewayUrl) {
        setShowModal(true); // open modal
      }
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

        <div className="mb-8 p-6 bg-white/90 rounded-2xl shadow-xl border border-white/30 text-gray-800 backdrop-blur-md hover:shadow-blue-400/30 transition transform hover:scale-[1.01]">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600">
            <GlobeAltIcon className="w-6 h-6 text-blue-600" />
            Wallet Balance: {wallet.balance}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <div className="border-2 border-green-300 rounded-lg p-3 bg-green-50/70 text-gray-900">
                <button
                  onClick={handlePayment}
                  className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all"
                >
                  Add Amount
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Window */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[90%] md:w-[70%] lg:w-[60%] h-[80%] flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-700">Payment Gateway</h3>
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

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import bgImage from "../assets/images/student-backgroud.png";
import {
  getSteps,
  getCountries,
  getProfile,
  getProfileCountry,
  getProfileAddress,
  createProfile,
  createProfileCountry,
  createProfileAddress,
} from "../services/profileService";

import {
  CheckCircleIcon,
  GlobeAltIcon,
  UserCircleIcon,
  HomeModernIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

import { useMessages } from "../context/MessageContext";

export default function ProfilePage() {
  const { addMessage } = useMessages();
  const [stepsStatus, setStepsStatus] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    learningGoal: "",
  });
  const [countryForm, setCountryForm] = useState({
    countryCode: "",
    countryName: "",
    currencyCode: "",
    currencyName: "",
  });
  const [addressForm, setAddressForm] = useState({
    addressType: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
    countryCode: "",
    zipCode: "",
    correspondingAddress: false,
  });
  const [countries, setCountries] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("loggedInUser"));

    const init = async () => {
      try {
        const stepsRes = await getSteps();
        setStepsStatus(stepsRes.data);
        const countryRes = await getCountries();
        setCountries(countryRes.data);
        const profileCountryData = await getProfileCountry();
        setCountryForm(profileCountryData.data || {});
        const profileData = await getProfile();
        setForm(profileData.data || {});
        const addressData = await getProfileAddress();
        setAddressForm(addressData.data || {});
      } catch (err) {
        addMessage("Error fetching steps or profile", "error");
      }
    };
    init();
  }, []);

  const handleCountryNext = async () => {
    try {
      await createProfileCountry(countryForm);
      addMessage("Country & Currency saved successfully!", "success");
    } catch (err) {
      addMessage("Failed to save country info", "error");
    }
  };

  const handlePersonalNext = async () => {
    try {
      await createProfile(form);
      addMessage("Personal info saved successfully!", "success");
    } catch (err) {
      addMessage("Failed to save personal info", "error");
    }
  };

  const handleAddressNext = async () => {
    try {
      await createProfileAddress(addressForm);
      addMessage("Address info saved successfully!", "success");
    } catch (err) {
      addMessage("Failed to save address info", "error");
    }
  };

  return (
    <Layout>
      <div
        className="relative min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto py-10 px-6 text-white">
          <h2 className="text-3xl font-extrabold mb-8 text-center">
            🎯 {userName}'s Profile Setup
          </h2>

          {/* Country & Currency */}
          <div className="mb-8 p-6 bg-white/90 rounded-2xl shadow-xl border border-white/30 text-gray-800 backdrop-blur-md hover:shadow-blue-400/30 transition transform hover:scale-[1.01]">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600">
              <GlobeAltIcon className="w-6 h-6 text-blue-600" />
              Country & Currency 🌍
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Select Country
                </label>
                <select
                  className="border-2 border-blue-300 rounded-lg p-3 w-full bg-white/80 focus:ring-4 focus:ring-blue-400 focus:outline-none"
                  value={countryForm.countryCode}
                  onChange={(e) =>
                    setCountryForm({
                      ...countryForm,
                      countryCode: e.target.value,
                    })
                  }
                >
                  <option value="">All Countries</option>
                  {countries.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Currency
                </label>
                <div className="border-2 border-green-300 rounded-lg p-3 bg-green-50/70 text-gray-900">
                  {countryForm.currencyName ? (
                    <span>
                      💰 {countryForm.currencyName} ({countryForm.currencyCode})
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">
                      Select a country
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCountryNext}
                className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all"
              >
                🚀 Save & Continue
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <div className="mb-8 p-6 bg-white/90 rounded-2xl shadow-xl border border-white/30 text-gray-800 backdrop-blur-md hover:shadow-pink-400/30 transition transform hover:scale-[1.01]">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-red-500">
              <UserCircleIcon className="w-6 h-6 text-pink-600" />
              Personal Info 👤
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="text"
                placeholder="Middle Name"
                value={form.middleName}
                onChange={(e) =>
                  setForm({ ...form, middleName: e.target.value })
                }
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400"
              />
              <textarea
                placeholder="Your Learning Goal / Bio"
                value={form.learningGoal}
                onChange={(e) =>
                  setForm({ ...form, learningGoal: e.target.value })
                }
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handlePersonalNext}
                className="px-8 py-2 bg-gradient-to-r from-pink-600 to-red-600 text-white font-semibold rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all"
              >
                💾 Save Personal Info
              </button>
            </div>
          </div>

          {/* Address Info */}
          <div className="mb-8 p-6 bg-white/90 rounded-2xl shadow-xl border border-white/30 text-gray-800 backdrop-blur-md hover:shadow-green-400/30 transition transform hover:scale-[1.01]">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600">
              <HomeModernIcon className="w-6 h-6 text-green-600" />
              Address Info 🏡
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="border rounded-lg p-3 w-full"
                value={addressForm.addressType}
                onChange={(e) =>
                  setAddressForm({
                    ...addressForm,
                    addressType: e.target.value,
                  })
                }
              >
                <option value="">All Address Types</option>
                <option value="HOME">Home</option>
                <option value="OFFICE">Office</option>
                <option value="OTHERS">Others</option>
              </select>

              <input
                type="text"
                placeholder="Address Line 1"
                value={addressForm.addressLine1}
                onChange={(e) =>
                  setAddressForm({
                    ...addressForm,
                    addressLine1: e.target.value,
                  })
                }
                className="border rounded-lg p-3 w-full"
              />

              <input
                type="text"
                placeholder="Address Line 2"
                value={addressForm.addressLine2}
                onChange={(e) =>
                  setAddressForm({
                    ...addressForm,
                    addressLine2: e.target.value,
                  })
                }
                className="border rounded-lg p-3 w-full"
              />

              <input
                type="text"
                placeholder="Address Line 3"
                value={addressForm.addressLine3}
                onChange={(e) =>
                  setAddressForm({
                    ...addressForm,
                    addressLine3: e.target.value,
                  })
                }
                className="border rounded-lg p-3 w-full"
              />

              <input
                type="text"
                placeholder="City"
                value={addressForm.city}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, city: e.target.value })
                }
                className="border rounded-lg p-3 w-full"
              />

              <input
                type="text"
                placeholder="State"
                value={addressForm.state}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, state: e.target.value })
                }
                className="border rounded-lg p-3 w-full"
              />

              <select
                className="border rounded-lg p-3 w-full"
                value={addressForm.countryCode}
                onChange={(e) =>
                  setAddressForm({
                    ...addressForm,
                    countryCode: e.target.value,
                  })
                }
              >
                <option value="">All Countries</option>
                {countries.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Zip Code"
                value={addressForm.zipCode}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, zipCode: e.target.value })
                }
                className="border rounded-lg p-3 w-full"
              />

              <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                <input
                  type="checkbox"
                  checked={addressForm.correspondingAddress}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      correspondingAddress: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span>Corresponding Address?</span>
              </label>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAddressNext}
                className="px-8 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:from-emerald-600 hover:to-green-600 transform hover:scale-105 transition-all"
              >
                ✅ Save Address Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

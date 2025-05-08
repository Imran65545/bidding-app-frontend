import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import masjidImage from "../assets/PhotofromImran.jpg"; // adjust path if needed


export default function BidForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  const [allNames, setAllNames] = useState([]);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [phoneSuggestions, setPhoneSuggestions] = useState([]);

  // Fetch all bid names on mount (for name autocomplete)
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await axios.get("${import.meta.env.VITE_API_URL}/api/bids");
        const names = res.data.map((bid) => bid.name);
        setAllNames([...new Set(names)]); // remove duplicates
      } catch (err) {
        console.error("Failed to fetch names", err);
      }
    };
    fetchNames();
  }, []);

  const fetchPhoneSuggestions = async (query) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bids/suggestions?type=phone&query=${query}`
      );
      setPhoneSuggestions(res.data);
    } catch (err) {
      console.error("Phone suggestions fetch failed", err);
    }
  };

  const handleNameChange = (e) => {
    const input = e.target.value;
    setName(input);
    if (input.length === 0) {
      setNameSuggestions([]);
    } else {
      const filtered = allNames.filter((n) =>
        n.toLowerCase().startsWith(input.toLowerCase())
      );
      setNameSuggestions(filtered);
    }
  };

  const handlePhoneChange = async (e) => {
    const input = e.target.value;
    setPhone(input);

    if (input.length > 0) {
      await fetchPhoneSuggestions(input);
    } else {
      setPhoneSuggestions([]);
    }
  };

  const handleSuggestionClick = (field, value) => {
    if (field === "name") {
      setName(value);
      setNameSuggestions([]);
    } else if (field === "phone") {
      setPhone(value);
      setPhoneSuggestions([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/bids`, {
        name,
        phone,
        amount: Number(amount),
      });

      toast.success("Bid submitted successfully! 🎉", {
        position: "top-center",
        autoClose: 3000,
      });

      setName("");
      setPhone("");
      setAmount("");
      setNameSuggestions([]);
      setPhoneSuggestions([]);
    } catch (error) {
      toast.error("Something went wrong! ❌");
      console.error(error);
    }
  };

  return (
    <div className=" flex flex-col justify-center mt-16 items-center">
       {/* ✅ Image on top */}
       <img
        src={masjidImage}
        alt="Masjid"
        className="w-24 h-24 rounded-full object-cover shadow-md mb-6"
      />
      <form
        className="sm:w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        {/* Name input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 w-full"
            value={name}
            onChange={handleNameChange}
            required
            autoComplete="off"
          />
          {nameSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full mt-1 max-h-40 overflow-y-auto">
              {nameSuggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSuggestionClick("name", s)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Phone input */}
        <div className="relative">
          <input
            type="tel"
            placeholder="Phone Number"
            className="border p-2 w-full"
            value={phone}
            onChange={handlePhoneChange}
            required
            autoComplete="off"
          />
          {phoneSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full mt-1 max-h-40 overflow-y-auto">
              {phoneSuggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSuggestionClick("phone", s)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="number"
          placeholder="Your Amount"
          className="border p-2 w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Amount
        </button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Link
          to="/leaderboard"
          className="bg-yellow-400 text-black text-lg py-2 px-6 rounded hover:bg-blue-600 hover:text-white transition"
        >
          View Leaderboard
        </Link>
        <Link
          to="/"
          className="bg-gray-500 text-white text-lg py-2 px-6 rounded hover:bg-gray-600 transition"
        >
          Back to Home
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
}

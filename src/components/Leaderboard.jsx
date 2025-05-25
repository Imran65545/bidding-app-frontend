import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import masjidImage from "../assets/PhotofromImran.jpg"; // corrected image path

export default function Leaderboard() {
  const [bids, setBids] = useState([]);
  const TARGET_AMOUNT = 4000000;

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bids/leaderboard`
        );
        console.log(res.data);
        setBids(res.data);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
    };

    fetchBids();
  }, []);

  const totalCollected = bids.reduce((sum, bid) => sum + bid.amount, 0);
  const remainingAmount = Math.max(0, TARGET_AMOUNT - totalCollected);

  return (
    <div className="relative font-montreal p-6 min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="flex flex-col items-center">
        {/* 📸 Masjid Image */}
        <div className="mb-4">
          <img
            src={masjidImage}
            alt="Masjid"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
        </div>

        {/* 👉 Fundraising Summary Box */}
        <div className="w-full md:w-[30rem] bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <h3 className="text-2xl font-extrabold text-center mb-4">
            Fundraising Summary
          </h3>
          <div className="space-y-4 text-center text-lg font-medium">
            <div>
              🎯 Target:{" "}
              <strong className="text-black text-xl">
                ₹{TARGET_AMOUNT.toLocaleString()}
              </strong>
            </div>
            <div>
              💰 Collected:{" "}
              <span className="text-green-600 font-bold text-xl">
                ₹{totalCollected.toLocaleString()}
              </span>
            </div>
            <div>
              🧾 Remaining:{" "}
              <span className="text-red-500 font-bold text-xl">
                ₹{remainingAmount.toLocaleString()}
              </span>
            </div>
            {totalCollected >= TARGET_AMOUNT && (
              <div className="bg-green-200 text-green-800 px-4 py-2 mt-2 rounded-full inline-block text-sm font-bold shadow">
                ✅ Goal Achieved!
              </div>
            )}
          </div>
        </div>

        {/* 🏆 Main Leaderboard Box */}
        <div className="w-full md:w-[800px] bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-4xl font-bold mb-6 text-center">Leaderboard</h2>

          <div className="max-h-[400px] overflow-y-auto pr-2">
            <ul className="space-y-2">
              <div className="hidden sm:flex justify-between items-center font-bold uppercase text-sm text-gray-600 px-3 py-2 border-b">
                <div className="sm:w-1/6 text-left">Rank</div>
                <div className="sm:w-3/6 text-center">Donor Name</div>
                <div className="sm:w-1/6 text-left">Phone</div>
                <div className="sm:w-2/6 text-right">Amount</div>
              </div>

              {bids.map((bid, index) => (
                <li
                  key={bid._id}
                  className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border p-3 rounded-xl font-medium text-sm sm:text-lg uppercase
      ${
        index === 0
          ? "bg-green-400 text-black"
          : index === 1
          ? "bg-gray-300 text-black"
          : "bg-white"
      }`}
                >
                  {/* Mobile Labels */}
                  <div className="flex sm:hidden justify-between w-full text-left">
                    <span className="font-bold">Rank:</span> #{index + 1}
                  </div>
                  <div className="flex sm:hidden justify-between w-full text-left">
                    <span className="font-bold">Donor:</span> {bid.name}
                  </div>
                  <div className="flex sm:hidden justify-between w-full text-left">
                    <span className="font-bold">Phone:</span> {bid._id}
                  </div>
                  <div className="flex sm:hidden justify-between w-full text-left">
                    <span className="font-bold">Amount:</span> ₹
                    {bid.amount.toLocaleString()}
                  </div>

                  {/* Desktop View */}
                  <div className="hidden sm:block sm:w-1/6 text-left">
                    #{index + 1}
                  </div>
                  <div className="hidden sm:block sm:w-3/6 text-center break-words">
                    {bid.name}
                  </div>
                  <div className="hidden sm:block text-gray-600 lowercase">
                    {bid._id}
                  </div>
                  <div className="hidden sm:block sm:w-2/6 text-right break-words text-[13px] sm:text-lg">
                    ₹{bid.amount.toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 🔁 Navigation Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/"
              className="bg-gray-600 text-white text-lg py-2 px-4 rounded hover:bg-gray-700"
            >
              Back to Home
            </Link>
            <Link
              to="/bid"
              className="bg-blue-600 text-white text-lg py-2 px-4 rounded hover:bg-blue-700"
            >
              Go to Place Amount
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

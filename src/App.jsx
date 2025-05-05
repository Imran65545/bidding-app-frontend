import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BidForm from "./components/BidForm";
import Leaderboard from "./components/Leaderboard";
import masjidImage from "./assets/PhotofromImran.jpg"; // ✅ Import the image

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-gray-100 font-founders">
        {/* 👉 Centered Page Content */}
        <div className="flex items-center justify-center md:p-16">
          <div className="md:w-full  max-w-4xl bg-white shadow-xl rounded-xl p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="flex flex-col items-center">
                      {/* ✅ Image on top */}
                      <img
                        src={masjidImage}
                        alt="Masjid"
                        className="w-24 h-24 rounded-full object-cover shadow-md mb-4"
                      />
                      <h1 className="text-4xl font-bold mb-6 text-center">
                        Donation for our Noori Masjid
                      </h1>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Link
                        to="/bid"
                        className="bg-blue-600 text-white text-lg py-3 font-medium rounded hover:bg-blue-700 text-center"
                      >
                        Place an Amount
                      </Link>
                      <Link
                        to="/leaderboard"
                        className="bg-yellow-400 text-black text-lg py-3 font-medium rounded hover:bg-yellow-500 text-center"
                      >
                        View Leaderboard (only for organizers)
                      </Link>
                    </div>
                  </>
                }
              />
              <Route path="/bid" element={<BidForm />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

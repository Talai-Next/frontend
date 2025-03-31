import React, { useState } from "react";
import { MdAirlineSeatReclineNormal } from "react-icons/md";

const SeatRating = ({ rating, setRating }) => {
  const getRatingDescription = (rating) => {
    switch (rating) {
      case 1:
        return "1: Very Low Density - Very few passengers.";
      case 2:
        return "2: Low Density - Few passengers.";
      case 3:
        return "3: Medium Density - Moderate number of passengers.";
      case 4:
        return "4: High Density - Quite crowded.";
      case 5:
        return "5: Very High Density - Extremely crowded with passengers.";
      default:
        return "Rate the bus density by selecting a star.";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2 my-3 justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <MdAirlineSeatReclineNormal
            key={star}
            className={`w-8 h-8 cursor-pointer transition-all duration-300 transform ${
              star <= rating
                ? "text-[#0C9543] scale-125"
                : "text-[#B4D4C3] hover:text-[#0C9543]"
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      <p className="text-sm text-gray-600 mt-2 text-center">
        {getRatingDescription(rating)}
      </p>
    </div>
  );
};

export default SeatRating;

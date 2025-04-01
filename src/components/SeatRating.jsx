import React, { useState } from "react";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { useTranslation } from "react-i18next";

const SeatRating = ({ rating, setRating }) => {
  const { t, i18n } = useTranslation();
  const getRatingDescription = (rating) => {
    switch (rating) {
      case 1:
        return t('rate_exp_des1');
      case 2:
        return t('rate_exp_des2');
      case 3:
        return t('rate_exp_des3');
      case 4:
        return t('rate_exp_des4');
      case 5:
        return t('rate_exp_des5');
      default:
        return t('rate_exp_des');
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

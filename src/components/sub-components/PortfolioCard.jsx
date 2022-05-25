import React from "react";

const PortfolioCard = ({ title, value, claim, button, handleButton }) => {
  return (
    <div className="text-xs block py-2 px-4 mb-2 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-gray-700 hover:text-gray-900 rounded-lg shadow hover:shadow-md transition duration-300">
      <div className="flex items-center justify-between text-base font-bold ">
        <h6 className="py-2">
          {title}
          {": "}
          <span className="font-normal">{value}</span>
        </h6>
        {button ? (
          <button
            onClick={() => handleButton(title)}
            className={`text-sm block py-2 px-4 bg-gradient-to-r ${
              claim
                ? "from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from"
                : " from-gray-600 to-slate-700 hover:to-gray-600 hover:from-slate-700"
            } text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300`}
          >
            {button}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;

import React from "react";

// <span className="text-xs block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
//   <div className="flex items-center justify-between text-base font-bold text-gray-700">
//     <h2>Amount Vesting:</h2>
//     <h2>to be coded...</h2>
//   </div>
// </span>;

const PortfolioCard = ({
  title,
  value,
  description,
  des_title,
  button,
  buttonNumber,
  handleButton,
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="p-6 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
            <div className="p-1 border-4 rounded-full cursor-pointer hover:border-primary hover:scale-105 transition transform duration-200">
              <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
            </div>
          </div>
          <p className="font-normal mt-2 text-gray-700">{value}</p>
          <div className="mt-4 mb-2 flex ">
            {description ? (
              <>
                <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                  {description}
                </span>
                <span className="text-sm my-auto pl-2 block font-semibold text-gray-100 hover:text-gray-200">
                  {des_title}
                </span>
              </>
            ) : (
              <span className="h-8"></span>
            )}
            {button ? (
              <button
                onClick={() => handleButton(buttonNumber)}
                className="text-sm block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300"
              >
                {button}
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;

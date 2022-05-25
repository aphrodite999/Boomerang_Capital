import React from "react";

const StatusCard = ({ title, value, description, des_title }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="p-6 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
        {/* <img
          className="w-64 object-cover rounded-t-md"
          src="https://images.unsplash.com/photo-1509223197845-458d87318791"
          alt=""
        /> */}
        <div className="mt-4 h-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
            <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
              <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
            </div>
          </div>
          <p className="text-sm mt-2 text-gray-700">{value}</p>
          {/* <div className="mt-3 space-x-4 flex p-1">
            <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
              <span className="block h-6 w-6 bg-green-400 rounded-full"> </span>
            </div>
          </div> */}
          <div className="mt-4 mb-2 flex ">
            {description ? (
              <>
                <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                  {description}
                </span>
                <span className="text-lg my-auto pl-2 block font-semibold  text-link hover:text-gray-500">
                  {des_title}
                </span>
              </>
            ) : (
              <span className=" h-8"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;

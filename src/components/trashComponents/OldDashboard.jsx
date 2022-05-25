import React, { useState, useEffect } from "react";
import Sidebar from "../sub-components/Sidebar";
// import StatusCard from "./sub-components/StatusCard";
// import ChartLine from "./sub-components/ChartLine";
// import ChartBar from "./sub-components/ChartBar";
// import PageVisitsCard from "components/PageVisitsCard";
// import TrafficCard from "components/TrafficCard";
import { ethers } from "ethers";
import { PriceFetcherAbi } from "../../contract/priceFetcherAbi";
import { PriceFetcherAddress } from "./../contract/priceFetcherAddress";
import { TestCapTaxManagerAbi } from "../../contract/testCapTaxManagerAbi";
import { TestCapTaxManagerAddress } from "./../contract/testCapTaxManagerAddress";
import { TestCapitalAbi } from "../../contract/testCapitalAbi";
import { TestCapitalAddress } from "./../contract/testCapitalAddress";
import { TestCapTreasuryAbi } from "../../contract/testCapTreasuryAbi";
import { TestCapTreasuryAddress } from "./../contract/testCapTreasuryAddress";

export default function Dashboard({ user, signer, onConnectWallet, contract }) {
  let priceFetcher, testCapTaxManager, testCapital, testCapTreasury;
  if (signer) {
    priceFetcher = new ethers.Contract(
      PriceFetcherAddress,
      PriceFetcherAbi,
      signer
    );
    testCapTaxManager = new ethers.Contract(
      TestCapTaxManagerAddress,
      TestCapTaxManagerAbi,
      signer
    );
    testCapital = new ethers.Contract(
      TestCapitalAddress,
      TestCapitalAbi,
      signer
    );
    testCapTreasury = new ethers.Contract(
      TestCapTreasuryAddress,
      TestCapTreasuryAbi,
      signer
    );
  }
  // useState ------------------------------------------------------------------------------------------------
  const [priceFetcherDetails, setPriceFetcherDetails] = useState({
    priceInUSD: "",
  });
  const [testCapTaxManagerDetails, setTestCapTaxManagerDetails] = useState({
    currentFairPrice: "",
    currentBackingPrice: "",
    circulatingSupply: "",
  });
  const [testCapitalDetails, setTestCapitalDetails] = useState({
    totalSupply: "",
    amountInTreasury: "",
    amountInBondingDepo: "",
  });
  const [testCapTreasuryDetails, setTestCapTreasuryDetails] = useState({
    currentTreasuryValue: "",
  });
  // Fetch PriceFetcher Contract Details --------------------------------------------------------------------
  const fetchPriceFetcherDetails = async () => {
    try {
      const priceInUSD = await priceFetcher.getTokenPriceInUSDC18Dec();
      setPriceFetcherDetails({
        priceInUSD: parseInt(priceInUSD._hex, 16) / 1e18,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  console.log("priceFetcherDetails", priceFetcherDetails.priceInUSD);
  // Fetch TestCapTaxManager Contract Details ---------------------------------------------------------------
  const fetchTestCapTaxManagerDetails = async () => {
    try {
      const currentFairPrice = await testCapTaxManager.getCurrentFairPrice();
      const currentBackingPrice =
        await testCapTaxManager.getCurrentBackingPrice();
      const circulatingSupply = await testCapTaxManager.getCirculatingSupply();

      setTestCapTaxManagerDetails({
        currentFairPrice: parseInt(currentFairPrice._hex, 16) / 1e18,
        currentBackingPrice: parseInt(currentBackingPrice._hex, 16) / 1e18,
        circulatingSupply: parseInt(circulatingSupply._hex, 16),
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  console.log(
    "fair Price:",
    testCapTaxManagerDetails.currentFairPrice,
    "backing Price:",
    testCapTaxManagerDetails.currentBackingPrice,
    "cir supply:",
    testCapTaxManagerDetails.circulatingSupply
  );
  // Fetch Test Capital Details -----------------------------------------------------------------------------
  const fetchTestCapitalDetails = async () => {
    try {
      const totalSupply = await testCapital.totalSupply();
      // const treasuryBalance = await testCapital.balanceOf(Treasury_Address);
      // const treasuryWalletBalance = await testCapital.balanceOf(Treasury_Wallet_Address);

      // const treasuryWalletBalance = await testCapital.balanceOf(BondingDepo_Address);
      // const treasuryWalletBalance = await testCapital.balanceOf(Bonding_Wallet_Address);

      setTestCapitalDetails({
        totalSupply: parseInt(totalSupply._hex, 16) / 1e18,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch TestCapTreasury Contract Details -----------------------------------------------------------------
  const getTestCapTreasuryDetails = async () => {
    try {
      // const currentTreasuryValue = await testCapTreasury.totalTreasuryValue();
      const currentTreasuryValue = await testCapTreasury.totalTreasuryValue();
      setTestCapTreasuryDetails({
        currentTreasuryValue: parseInt(currentTreasuryValue._hex, 16),
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  console.log(
    "Current Treaury Value",
    testCapTreasuryDetails.currentTreasuryValue
  );
  // useEffect ---------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!signer) return;
    fetchPriceFetcherDetails();
    fetchTestCapTaxManagerDetails();
    fetchTestCapitalDetails();
    getTestCapTreasuryDetails();
  }, [signer]);

  const column1 = [
    {
      title: "# of Holders",
      value: "No Data",
      description: "",
      des_title: "",
    },
    {
      title: contract.name,
      value: contract.symbol,
      description: "$ 13,835,100.68",
      des_title: "FDV",
    },
    {
      title: "Current Fair Price",
      value: contract.totalSupply / 1e18,
      description: "",
      des_title: "",
    },
    {
      title: "Current Backing of Coin",
      value: contract.circulatingSupply,
      description: "",
      des_title: "",
    },
  ];
  return (
    <>
      <Sidebar user={user} onConnectWallet={onConnectWallet} />
      {/* first column */}
      <div className="px-3 mb-3 md:mb-8 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="bg-slate-700 p-2 rounded-xl">
              {/* column1 */}
              {/* Number of holders */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold "># of Holders</h1>
                  <p className="text-sm mt-2">to be coded...</p>
                </div>
              </div>
              {/* Current Price */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">Current Price</h1>
                  <p className="text-sm mt-2">
                    {priceFetcherDetails.priceInUSD}
                  </p>
                </div>
              </div>
              {/* Market Cap at fair price */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">Current Fair Price</h1>
                  <p className="text-sm mt-2">
                    {testCapTaxManagerDetails.currentFairPrice}
                  </p>
                </div>
              </div>
              {/* Treasury value */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">
                    Current Backing of the Coin
                  </h1>
                  <p className="text-sm mt-2">
                    {" "}
                    {testCapTaxManagerDetails.currentBackingPrice}
                  </p>
                </div>
              </div>
              {/* {column1.map((status, i) => (
                <StatusCard
                  key={i}
                  title={status.title}
                  value={status.value}
                  description={status.description}
                  des_title={status.des_title}
                />
              ))} */}
            </div>
            {/* column 2 */}
            <div className=" bg-red-600  p-2 rounded-xl">
              {/* main */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <div className="mt-4 h-auto">
                    <div className="flex items-center justify-between ">
                      <h2 className="text-2xl font-bold text-gray-700">
                        Circulating Supply
                      </h2>
                      <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                        <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                      </div>
                    </div>
                    <h6 className="text-xl font-bold text-gray-700 mb-4">
                      {testCapTaxManagerDetails.circulatingSupply}
                    </h6>
                    {/* <p className="text-sm mt-2 text-gray-700">424234</p> */}
                    <div className="mb-2 flex-1">
                      <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                        <span className="text-sm font-bold">
                          Amount in holder wallets:{" "}
                        </span>{" "}
                        to be coded...
                      </span>
                    </div>
                    <div className="mb-2 flex-1 ">
                      <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                        <span className="text-sm font-bold">
                          Amount Vesting:{" "}
                        </span>{" "}
                        to be coded...
                      </span>
                    </div>
                    <div className="mb-2 flex-1 ">
                      <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                        <span className="text-sm  font-bold">
                          Amount in LP:{" "}
                        </span>{" "}
                        to be coded...
                      </span>
                    </div>
                    <div className="mb-2 flex-1 ">
                      <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                        <span className="text-sm font-bold">
                          Compounding DividendRewards :{" "}
                        </span>{" "}
                        to be coded...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Market Cap */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">Market Cap</h1>
                  <p className="text-sm mt-2">
                    $
                    {Math.round(
                      priceFetcherDetails.priceInUSD *
                        testCapTaxManagerDetails.circulatingSupply
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              </div>
              {/* Market Cap at fair price */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">
                    Market Cap at fair price
                  </h1>
                  <p className="text-sm mt-2">
                    {" "}
                    $
                    {Math.round(
                      priceFetcherDetails.priceInUSD *
                        testCapTaxManagerDetails.currentFairPrice
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              </div>
              {/* Treasury value */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">Treasury Value</h1>
                  <p className="text-sm mt-2">
                    {testCapTreasuryDetails.currentTreasuryValue}
                  </p>
                </div>
              </div>
              {/* _ _ _ _ _ _ _ */}
            </div>
            {/* column 3 */}
            <div className="bg-green-400  p-2 rounded-xl">
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <div className="mt-4 h-auto">
                    <div className="flex items-center justify-between ">
                      <h2 className="text-2xl font-bold text-gray-700">
                        Total Supply
                      </h2>
                      <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                        <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                      </div>
                    </div>
                    <h6 className="text-xl font-bold text-gray-700 mb-4">
                      {testCapitalDetails.totalSupply}
                    </h6>
                    {/* <p className="text-sm mt-2 text-gray-700">424234</p> */}
                    <div className="mb-2 flex-1">
                      <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                        <span className="text-sm font-bold">
                          Circulating supply:{" "}
                        </span>{" "}
                        {testCapTaxManagerDetails.circulatingSupply}
                      </span>
                    </div>
                    <div className="mb-2 flex-1 ">
                      <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                        <span className="text-sm font-bold">
                          Amount in treasury:{" "}
                        </span>{" "}
                        have to be clear...
                      </span>
                    </div>
                    <div className="mb-2 flex-1 ">
                      <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                        <span className="text-sm  font-bold">
                          Amount in BondingDepo:{" "}
                        </span>{" "}
                        have to be clear...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Fully diluted market cap */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">
                    Fully diluted market cap
                  </h1>
                  <p className="text-sm mt-2">
                    {" "}
                    $
                    {Math.round(
                      priceFetcherDetails.priceInUSD *
                        testCapitalDetails.totalSupply
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  </p>
                </div>
              </div>
              {/* Market Cap at fair price */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">
                    Fully diluted market cap at fair price
                  </h1>
                  <p className="text-sm mt-2">
                    {" "}
                    $
                    {Math.round(
                      testCapTaxManagerDetails.currentFairPrice *
                        testCapitalDetails.totalSupply
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  </p>
                </div>
              </div>
              {/* Treasury value */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">
                    Value of Liquidity Pool
                  </h1>
                  <p className="text-sm mt-2">to be coded...</p>
                </div>
              </div>
              {/* _ _ _ _ _ _ _ */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <div className="px-3 md:px-8">
//   <div className="container mx-auto max-w-full">
//     <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  mb-4">
//       {column1.map((status, i) => (
//         <StatusCard
//           key={i}
//           title={status.title}
//           value={status.value}
//           description={status.description}
//           des_title={status.des_title}
//         />
//       ))}
//     </div>
//   </div>
// </div>;

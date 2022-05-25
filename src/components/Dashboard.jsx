import React, { useState } from "react";
import Sidebar from "./sub-components/Sidebar";
import { ethers } from "ethers";
import { PriceFetcherAbi } from "./../contract/priceFetcherAbi";
import { TestCapTaxManagerAbi } from "./../contract/testCapTaxManagerAbi";
import { TestCapTreasuryAbi } from "./../contract/testCapTreasuryAbi";
import { TestCapitalAbi } from "./../contract/testCapitalAbi";
import { BondingDepositoryAbi } from "./../contract/bondingDepositoryAbi";
import { MetricsTrackerAbi } from "./../contract/metricsTrackerAbi";
import { SafeLeverageAbi } from "./../contract/safeLeverageAbi";
import {
  TestCapitalAddress,
  TestCapTreasuryAddress,
  TestCapTaxManagerAddress,
  TreasuryAddress,
  TreasuryWalletAddress,
  PriceFetcherAddress,
  BondingDepositoryAddress,
  MetricsTrackerAddress,
  SafeLeverageAddress,
  LeverageWalletAddress,
  UniswapPairAddress,
} from "./../contract/addresses";

export default function Dashboard({ user, signer, network, onConnectWallet }) {
  let priceFetcher,
    testCapTaxManager,
    testCapital,
    testCapTreasury,
    bondingDepository,
    metricsTracker,
    safeLeverage;
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
    bondingDepository = new ethers.Contract(
      BondingDepositoryAddress,
      BondingDepositoryAbi,
      signer
    );
    metricsTracker = new ethers.Contract(
      MetricsTrackerAddress,
      MetricsTrackerAbi,
      signer
    );
    safeLeverage = new ethers.Contract(
      SafeLeverageAddress,
      SafeLeverageAbi,
      signer
    );
  }
  // useState ------------------------------------------------------------------------------------------------
  const [priceFetcherDetails, setPriceFetcherDetails] = useState({
    priceInUSD: "",
    WETHPriceInUSDC18Dec: "",
  });
  const [testCapTaxManagerDetails, setTestCapTaxManagerDetails] = useState({
    currentFairPrice: "",
    currentBackingPrice: "",
    circulatingSupply: "",
    amountInHoldersWallets: "",
    amountOfTokensInLP: "",
    amountOfTokensCDT: "",
    amountOfTokensInTreasury: "",
    amountOfTokensForBonding: "",
    amountOfTokensInBondingDepo: "",
  });
  const [testCapitalDetails, setTestCapitalDetails] = useState({
    totalSupply: "",
    amountInTreasury: "",
    amountInBondingDepo: "",
    // new___
    circulatingSupply: "",
    balanceOfLeverageWallet: "",
    balanceOfUniswapPair: "",
  });
  const [testCapTreasuryDetails, setTestCapTreasuryDetails] = useState({
    currentTreasuryValue: "",
  });
  const [bondingDepositoryDetails, setBondingDepositoryDetails] = useState({
    totalBondsVestingNow: "",
  });
  const [metricsTrackerDetails, setMetricsTrackerDetails] = useState({
    totalHolders: "",
    holdersWalletToken: "",
    holdersBondsVesting: "",
    holdersLeverage: "",
  });
  const [safeLeverageDetails, setSafeLeverageDetails] = useState({
    tokensInLeverage: "",
  });
  // Formator <<<-------------------------------------------------------------------
  const decimalFormator = (number) => {
    if (number === 0) {
      return 0;
    } else if (number >= 1000) {
      return number.toFixed(0);
    } else if (number >= 1 && number < 1000) {
      return number.toFixed(2);
    } else if (number >= 0.1 && number < 1) {
      return number.toFixed(3);
    } else if (number >= 0.01 && number < 0.1) {
      return number.toFixed(4);
    } else if (number >= 0.001 && number < 0.01) {
      return number.toFixed(5);
    } else if (number >= 0.0001 && number < 0.001) {
      return number.toFixed(6);
    } else if (number >= 0.00001 && number < 0.0001) {
      return number.toFixed(7);
    } else if (number >= 0.000001 && number < 0.00001) {
      return number.toFixed(8);
    } else return number;
  };

  const priceFormater = (number, unit) => {
    let _number = decimalFormator(number);
    return _number === "Loading..."
      ? "Loading..."
      : unit === ""
      ? _number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      : _number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        unit;
  };
  // Formator ---------------------------------------------------------------------->>>
  // Fetch PriceFetcher Contract Details --------------------------------------------------------------------
  const fetchPriceFetcherDetails = async () => {
    try {
      const priceInUSD = await priceFetcher.getTokenPriceInUSDC18Dec();
      const WETHPriceInUSDC18Dec = await priceFetcher.getWETHPriceInUSDC18Dec();
      setPriceFetcherDetails({
        priceInUSD: parseInt(priceInUSD._hex, 16) / 1e18,
        WETHPriceInUSDC18Dec: parseInt(WETHPriceInUSDC18Dec._hex, 16) / 1e18,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch TestCapTaxManager Contract Details ---------------------------------------------------------------
  const fetchTestCapTaxManagerDetails = async () => {
    try {
      const currentFairPrice = await testCapTaxManager.getCurrentFairPrice();
      const currentBackingPrice =
        await testCapTaxManager.getCurrentBackingPrice();
      const circulatingSupply = await testCapTaxManager.getCirculatingSupply(); // Extra
      const amountInHoldersWallets = await testCapTaxManager
        .getAmountInHoldersWallets()
        .then((res) => {
          return parseInt(res._hex, 16) / 1e18;
        });

      const amountOfTokensInLP = await testCapTaxManager
        .getAmountOfTokensInLP()
        .then((res) => {
          return parseInt(res._hex, 16) / 1e18;
        });
      const amountOfTokensCDT = await testCapTaxManager
        .getAmountOfTokensCompoundingInDividendTracker()
        .then((res) => {
          return (parseInt(res._hex, 16) / 1e18)
            .toFixed(0)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        });
      const amountOfTokensInTreasury = await testCapTaxManager
        .getAmountOfTokensInTreasury()
        .then((res) => {
          return (parseInt(res._hex, 16) / 1e18)
            .toFixed(0)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        });
      const amountOfTokensForBonding = await testCapTaxManager
        .getAmountOfTokensForBonding()
        .then((res) => {
          return (parseInt(res._hex, 16) / 1e18)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        });
      const amountOfTokensInBondingDepo = await testCapTaxManager
        .getAmountOfTokensInBondingDepo()
        .then((res) => {
          return (parseInt(res._hex, 16) / 1e18)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        });

      setTestCapTaxManagerDetails({
        currentFairPrice: parseInt(currentFairPrice._hex, 16) / 1e18,
        currentBackingPrice: parseInt(currentBackingPrice._hex, 16) / 1e18,
        circulatingSupply: parseInt(circulatingSupply._hex, 16) / 1e18,
        amountInHoldersWallets: amountInHoldersWallets,
        amountOfTokensInLP: amountOfTokensInLP,
        amountOfTokensCDT: amountOfTokensCDT,
        amountOfTokensInTreasury: amountOfTokensInTreasury,
        amountOfTokensForBonding: amountOfTokensForBonding,
        amountOfTokensInBondingDepo: amountOfTokensInBondingDepo,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch Test Capital Details -----------------------------------------------------------------------------
  const fetchTestCapitalDetails = async () => {
    try {
      const totalSupply = await testCapital.totalSupply();
      const treasuryBalance = await testCapital
        .balanceOf(TreasuryAddress)
        .then((balance) => {
          return parseInt(balance._hex, 16);
        });
      const treasuryWalletBalance = await testCapital
        .balanceOf(TreasuryWalletAddress)
        .then((balance) => {
          return parseInt(balance._hex, 16);
        });
      // --- new
      const circulatingSupply = await testCapital
        .circulatingSupply()
        .then((balance) => {
          return parseInt(balance._hex, 16) / 1e18;
        });
      const balanceOfLeverageWallet = await testCapital
        .balanceOf(LeverageWalletAddress)
        .then((balance) => {
          return parseInt(balance._hex, 16) / 1e18;
        });
      const balanceOfUniswapPair = await testCapital
        .balanceOf(UniswapPairAddress)
        .then((balance) => {
          return parseInt(balance._hex, 16) / 1e18;
        });

      setTestCapitalDetails({
        totalSupply: parseInt(totalSupply._hex, 16) / 1e18,
        amountInTreasury: treasuryBalance * treasuryWalletBalance,
        circulatingSupply: circulatingSupply,
        balanceOfLeverageWallet: balanceOfLeverageWallet,
        balanceOfUniswapPair: balanceOfUniswapPair,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch TestCapTreasury Contract Details -----------------------------------------------------------------
  const getTestCapTreasuryDetails = async () => {
    try {
      const currentTreasuryValue = await testCapTreasury.currentTreasuryValue();
      setTestCapTreasuryDetails({
        currentTreasuryValue: parseInt(currentTreasuryValue._hex, 16) / 1e18,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch BondingDepository Contract Details ---------------------------------------------------------------
  const getBondingDepositoryDetails = async () => {
    try {
      const totalBondsVestingNow = await bondingDepository
        .getTotalBondsVestingNow()
        .then((res) => {
          return parseInt(res._hex, 16) / 1e18;
        });
      setBondingDepositoryDetails({
        totalBondsVestingNow: totalBondsVestingNow,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch MetricsTracker Contract Details ------------------------------------------------------------------
  const getMetricsTrackerDetails = async () => {
    try {
      const totalHolders = await metricsTracker
        .getTokenHoldersTotal()
        .then((holders) => {
          return parseInt(holders._hex, 16);
        });
      const holdersWalletToken = await metricsTracker
        .getTokenHoldersWallet()
        .then((holders) => {
          return parseInt(holders._hex, 16);
        });
      const holdersBondsVesting = await metricsTracker
        .getTokenHoldersBondsVesting()
        .then((holders) => {
          return parseInt(holders._hex, 16);
        });
      const holdersLeverage = await metricsTracker
        .getTokenHoldersLeveragePosition()
        .then((holders) => {
          return parseInt(holders._hex, 16);
        });
      setMetricsTrackerDetails({
        totalHolders: totalHolders,
        holdersWalletToken: holdersWalletToken,
        holdersBondsVesting: holdersBondsVesting,
        holdersLeverage: holdersLeverage,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  const getSafeLeverageDetails = async () => {
    try {
      const tokensInLeverage = await safeLeverage
        .getTotalTokensInLeverageContract()
        .then((res) => {
          return parseInt(res._hex, 16) / 1e18;
        });
      setSafeLeverageDetails({
        tokensInLeverage: tokensInLeverage,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // useEffect ----------------------------------------------------------------------------------------------
  const [signerState, updateSignerState] = React.useState(false); // useEffect cause rander twice so I use this technique to handle it
  React.useEffect(() => {
    if (!signer) return;
    if (!signerState) {
      updateSignerState(true);
      fetchPriceFetcherDetails();
      fetchTestCapTaxManagerDetails();
      fetchTestCapitalDetails();
      getTestCapTreasuryDetails();
      getBondingDepositoryDetails();
      getMetricsTrackerDetails();
      getSafeLeverageDetails();
    }
  }, [signer]);
  return (
    <>
      <Sidebar
        user={user}
        onConnectWallet={onConnectWallet}
        network={network}
      />
      <div className="px-3 my-5 md:mb-8 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-8">
            {/* column 1 */}
            <div>
              {/* main */}
              <div className="flex justify-center items-center">
                <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <div className="h-auto">
                    {/* main header div */}
                    <div className="-mt-12 flex-1 ">
                      <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                        <div className="flex items-center justify-between ">
                          <h2 className="text-2xl font-bold text-gray-700">
                            Total Holders
                          </h2>
                          <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                            <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                          </div>
                        </div>
                        <h6 className="text-xl font-bold text-gray-700 mb-2">
                          {metricsTrackerDetails.totalHolders !== "Loading..."
                            ? Math.round(metricsTrackerDetails.totalHolders)
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            : "Loading..."}
                        </h6>
                      </span>
                    </div>
                    {/* end main header div */}
                    {/* ammount in holder wallet */}
                    <span className="text-xs mt-4 block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        <h2>Tokens in wallets:</h2>
                        <h2 className="text-base font-normal">
                          {metricsTrackerDetails.holdersWalletToken}
                        </h2>
                      </div>
                    </span>
                    <span className="text-xs block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        <h2>Bonds vesting:</h2>
                        <h2 className="text-base font-normal">
                          {metricsTrackerDetails.holdersBondsVesting}
                        </h2>
                      </div>
                    </span>
                    <span className="text-xs block py-2 px-4 xl:mb-3 lg:mb-0 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        <h2>Leverage:</h2>
                        <span className="text-base font-normal">
                          {metricsTrackerDetails.holdersLeverage}
                        </span>
                      </div>
                    </span>
                    <span className="text-xs block py-2 rounded-lg xl:block lg:hidden">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        <h2>&nbsp;</h2>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              {/* Current Price */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">Current Price</h1>
                  <p className="text-sm mt-2">
                    {priceFormater(priceFetcherDetails.priceInUSD, "USDC")}
                  </p>
                </div>
              </div>
              {/* Market Cap at fair price */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">Current Fair Price</h1>
                  <p className="text-sm mt-2">
                    {priceFormater(
                      testCapTaxManagerDetails.currentFairPrice *
                        priceFetcherDetails.WETHPriceInUSDC18Dec,
                      "USDC"
                    )}
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
                    {priceFormater(
                      testCapTaxManagerDetails.currentBackingPrice *
                        priceFetcherDetails.WETHPriceInUSDC18Dec,
                      "USDC"
                    )}
                  </p>
                </div>
              </div>
            </div>
            {/* column 2 */}
            <div>
              {/* main */}
              <div className="flex justify-center items-center">
                <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <div className="h-auto">
                    {/* main header div */}
                    <div className="-mt-12 flex-1 ">
                      <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                        <div className="flex items-center justify-between ">
                          <h2 className="text-2xl font-bold text-gray-700">
                            Circulating Supply
                          </h2>
                          <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                            <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                          </div>
                        </div>
                        <h6 className="text-xl font-bold text-gray-700 mb-2">
                          {testCapitalDetails.circulatingSupply !== "Loading..."
                            ? Math.round(testCapitalDetails.circulatingSupply)
                                .toString()
                                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                                .concat(" BOOM")
                            : "Loading..."}
                        </h6>
                      </span>
                    </div>
                    {/* end main header div */}
                    {/* ammount in holder wallet */}
                    <span className="text-xs mt-4 block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        <h2>Amount in HW:</h2>
                        <h2 className="text-base font-normal">
                          {priceFormater(
                            testCapTaxManagerDetails.amountInHoldersWallets,
                            "BOOM"
                          )}
                        </h2>
                      </div>
                    </span>
                    <span className="text-xs block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        <h2>Amount Vesting:</h2>
                        <h2 className="text-base font-normal">
                          {priceFormater(
                            bondingDepositoryDetails.totalBondsVestingNow,
                            "BOOM"
                          )}
                        </h2>
                      </div>
                    </span>
                    <span className="text-xs block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        <h2>Amount in LP:</h2>
                        <span className="text-base font-normal">
                          {priceFormater(
                            testCapTaxManagerDetails.amountOfTokensInLP,
                            "BOOM"
                          )}
                        </span>
                      </div>
                    </span>
                    <span className="text-xs block py-2 px-4 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        {/* <h2>Compounding DividendRewards:</h2> */}
                        <h2>Amount in Leverage:</h2>
                        <h2 className="text-base font-normal">
                          {priceFormater(
                            safeLeverageDetails.tokensInLeverage,
                            "BOOM"
                          )}
                        </h2>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              {/* Market Cap */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">Market Cap</h1>
                  <p className="text-sm mt-2">
                    {priceFormater(
                      priceFetcherDetails.priceInUSD *
                        testCapitalDetails.circulatingSupply,
                      "USDC"
                    )}
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
                    {priceFormater(
                      priceFetcherDetails.WETHPriceInUSDC18Dec *
                        testCapTaxManagerDetails.currentFairPrice *
                        testCapTreasuryDetails.currentTreasuryValue,
                      "USDC"
                    )}
                  </p>
                </div>
              </div>
              {/* Treasury value */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">Treasury Value</h1>
                  <p className="text-sm mt-2">
                    {/* {testCapTreasuryDetails.currentTreasuryValue
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} */}
                    {priceFormater(
                      priceFetcherDetails.WETHPriceInUSDC18Dec *
                        testCapTreasuryDetails.currentTreasuryValue,
                      "USDC"
                    )}
                  </p>
                </div>
              </div>
              {/* _ _ _ _ _ _ _ */}
            </div>
            {/* column 3 */}
            <div>
              {/* main */}
              <div className="flex justify-center items-center">
                <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <div className="h-auto">
                    {/* main header div */}
                    <div className="-mt-12 flex-1 ">
                      <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                        <div className="flex items-center justify-between ">
                          <h2 className="text-2xl font-bold text-gray-700">
                            Total Supply
                          </h2>
                          <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                            <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                          </div>
                        </div>
                        <h6 className="text-xl font-bold text-gray-700 mb-2">
                          {priceFormater(
                            testCapitalDetails.totalSupply,
                            "BOOM"
                          )}
                        </h6>
                      </span>
                    </div>
                    {/* end main header div */}
                    {/* ammount in holder wallet */}
                    <span className="text-xs mt-4 block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        <h2>Circulating Supply:</h2>
                        <h2 className="text-base font-normal">
                          {priceFormater(
                            testCapitalDetails.circulatingSupply,
                            "BOOM"
                          )}
                        </h2>
                      </div>
                    </span>
                    {/* end ammount in holder wallet */}
                    {/* ammount in treasury */}
                    <span className="text-xs block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        <h2>Amount in Treasury:</h2>
                        <h2 className="text-base font-normal">
                          {priceFormater(
                            testCapTaxManagerDetails.amountOfTokensInTreasury,
                            "BOOM"
                          )}
                        </h2>
                      </div>
                    </span>
                    {/* end ammount in treasury */}
                    {/* ammount in BondingDepo */}
                    <span className="text-xs block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        <h2>Amount in BD:</h2>
                        <span className="text-base font-normal">
                          {priceFormater(
                            testCapTaxManagerDetails.amountOfTokensInBondingDepo,
                            "BOOM"
                          )}
                        </span>
                      </div>
                    </span>
                    {/* end ammount in BondingDepo */}
                    {/* amount in Leverage Wallet */}
                    <span className="text-xs block py-2 px-4 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between text-base font-bold text-gray-700">
                        <h2>Amount in Leverage Wallet:</h2>
                        <span className="text-base font-normal">
                          {priceFormater(
                            testCapitalDetails.balanceOfLeverageWallet,
                            "BOOM"
                          )}
                        </span>
                      </div>
                    </span>
                    {/* end amount in Leverage Wallet */}
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
                    {priceFormater(
                      priceFetcherDetails.priceInUSD *
                        testCapitalDetails.totalSupply,
                      "USDC"
                    )}
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
                    {priceFormater(
                      testCapTaxManagerDetails.currentFairPrice *
                        testCapitalDetails.totalSupply *
                        priceFetcherDetails.WETHPriceInUSDC18Dec,
                      "USDC"
                    )}
                  </p>
                </div>
              </div>
              {/* Treasury value */}
              <div className="flex justify-center items-center">
                <div className="p-6 m-2 w-full bg-white text-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <h1 className="text-2xl font-bold ">
                    Value of Liquidity Pool
                  </h1>
                  <p className="text-sm mt-2">
                    {priceFormater(
                      testCapitalDetails.balanceOfUniswapPair *
                        priceFetcherDetails.priceInUSD *
                        2,
                      "USDC"
                    )}
                  </p>
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

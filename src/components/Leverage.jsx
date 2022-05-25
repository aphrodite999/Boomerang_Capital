import React from "react";
import { ethers } from "ethers";
import Sidebar from "./sub-components/Sidebar";
import {
  Page,
  Navbar,
  NavbarBackLink,
  BlockTitle,
  BlockHeader,
  List,
  ListItem,
  Range,
} from "konsta/react";
import { Switch } from "@headlessui/react";
import PortfolioCard from "./sub-components/PortfolioCard";
import { TestCapitalAbi } from "./../contract/testCapitalAbi";
import { DividendTrackerAbi } from "./../contract/dividendTrackerAbi";
import { BondingDepositoryAbi } from "./../contract/bondingDepositoryAbi";
import { SafeLeverageAbi } from "./../contract/safeLeverageAbi";
import { PriceFetcherAbi } from "./../contract/priceFetcherAbi";
import { TestCapTaxManagerAbi } from "./../contract/testCapTaxManagerAbi";
import {
  TestCapitalAddress,
  DividendTrackerAddress,
  BondingDepositoryAddress,
  SafeLeverageAddress,
  PriceFetcherAddress,
  TestCapTaxManagerAddress,
} from "./../contract/addresses";

function Leverage({ user, network, signer, onConnectWallet }) {
  // ------------------------------------------------------------------------- useEffect
  const [testCapitalDetails, setTestCapitalDetails] = React.useState({
    userBalance: "",
    tokenBalance: "",
  });
  const [dividendTrackerDetails, setDividendTrackerDetails] = React.useState({
    totalReward: "",
    totalClaimed: "",
    lastClaim: "",
    totalclaimable: false,
  });
  const [bondingDepositoryDetails, setBondingDepositoryDetails] =
    React.useState({
      bondHolderTokenVesting: "",
      bondHolderAvgPriceOfVB: "",
      bondHolderVestingTimeRemaining: "",
      bondHolderBondingTime: "",
    });
  const [safeLeverageDetails, setSafeLeverageDetails] = React.useState({
    position: "",
    WETHOwed: "",
    liquidationPrice: "",
    userLeverageBPS: "",
    minimumTokensToLeverage: "",
    maximumLeverageBPS: "",
    WETHAvalibleToBorrow: "",
    WETHAvalibleToBorrowByUserAtLeverage: "",
    isMarketBuyingOfTokensAvalible: "",
  });
  const [priceFetcherDetails, setPriceFetcherDetails] = React.useState({
    priceInUSD: "",
    WETHPriceInUSDC18Dec: "",
  });
  const [testCapTaxManagerDetails, setTestCapTaxManagerDetails] =
    React.useState({
      currentBackingPrice: "Loading...",
    });
  let testCapital,
    dividendTracker,
    bondingDepository,
    safeLeverage,
    priceFetcher,
    testCapTaxManager;
  if (signer) {
    testCapital = new ethers.Contract(
      TestCapitalAddress,
      TestCapitalAbi,
      signer
    );
    dividendTracker = new ethers.Contract(
      DividendTrackerAddress,
      DividendTrackerAbi,
      signer
    );
    bondingDepository = new ethers.Contract(
      BondingDepositoryAddress,
      BondingDepositoryAbi,
      signer
    );
    safeLeverage = new ethers.Contract(
      SafeLeverageAddress,
      SafeLeverageAbi,
      signer
    );
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
  }
  const handleButton = async (task) => {
    if (
      task === "Total Claimable Rewards" &&
      dividendTrackerDetails.totalClaimable > 0
    ) {
      try {
        await testCapital.claim().then((res) => console.log(res));
      } catch (error) {
        console.log("Error", error.message);
      }
    }
  };
  // Fetch Test Capital Details -----------------------------------------------------------------------------
  const fetchTestCapitalDetails = async () => {
    try {
      const tokenBalance = await testCapital.balanceOf(user).then((balance) => {
        return (parseInt(balance._hex, 16) / 1e18)
          .toFixed(2)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          .concat(" TNT");
      });
      const userBalance = await testCapital.balanceOf(user).then((balance) => {
        // console.log("balance:", balance);
        return parseInt(balance._hex, 16) / 1e18;
      });
      setTestCapitalDetails({
        userBalance: userBalance,
        tokenBalance: tokenBalance,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch Div Details -------------------------------------------------------------------------------------
  const fetchDividendTrackerDetails = async () => {
    try {
      const dividends = await dividendTracker.getAccountInfo(user);
      setDividendTrackerDetails({
        totalReward: parseInt(dividends[3]._hex, 16),
        totalClaimed: (
          parseInt(dividends[3]._hex, 16) - parseInt(dividends[2]._hex, 16)
        )
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
        lastClaim: parseInt(dividends[4]._hex, 16)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
        totalClaimable: parseInt(dividends[2]._hex, 16)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch Bonding Depository Details ----------------------------------------------------------------------
  const fetchBondingDepositoryDetails = async () => {
    try {

      console.log("fetchBondingDepositoryDetails");
      const bondHolderTokenVesting = await bondingDepository
        .getBondHolderTokenVesting(user)
        .then((balance) => {
          console.log("getBondHolderTokenVesting : ", parseInt(balance._hex, 16) / 1e18);
          return parseInt(balance._hex, 16) / 1e18;
        });
      const bondHolderAvgPriceOfVB = await bondingDepository
        .getBondHolderAveragePriceOfVestingBonds(user)
        .then((balance) => {
          console.log("getBondHolderAveragePriceOfVestingBonds : ", parseInt(balance._hex, 16) / 1e18)
          return parseInt(balance._hex, 16) / 1e18;
        });
      const bondHolderVestingTimeRemaining = await bondingDepository
        .getBondHolderVestingTimeRemaining(user)
        .then((res) => {
          console.log("getBondHolderVestingTimeRemaining : ", Number(parseInt(res._hex, 16)))
          let seconds = Number(parseInt(res._hex, 16));
          // const dateObject = new Date(seconds * 1000);
          // return dateObject.toLocaleString("en-US", {
          //   timeZoneName: "short",
          //   timeZone: "UTC",
          // });
          return seconds;
        });
      const bondHolderBondingTime = await bondingDepository
        .getBondHolderBondingTime(user)
        .then((res) => {
          let seconds = Number(parseInt(res._hex, 16));
          console.log("getBondHolderBondingTime : ", Number(parseInt(res._hex, 16)))
          return seconds;
        });
      setBondingDepositoryDetails({
        bondHolderTokenVesting: bondHolderTokenVesting,
        bondHolderAvgPriceOfVB: bondHolderAvgPriceOfVB,
        bondHolderVestingTimeRemaining: bondHolderVestingTimeRemaining,
        bondHolderBondingTime: bondHolderBondingTime,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch Bonding Depository Details ----------------------------------------------------------------------
  const fetchSafeLeverageDetails = async () => {
    try {
      const position = await safeLeverage.getPosition(user).then((balance) => {
        console.log("getPosition : ", parseInt(balance._hex, 16))
        return parseInt(balance._hex, 16);
      });
      const WETHOwed = await safeLeverage.getWETHOwed(user).then((balance) => {
        console.log("getWETHOwed : ", parseInt(balance._hex, 16))
        return parseInt(balance._hex, 16);
      });
      const liquidationPrice = await safeLeverage
        .getLiquidationPrice(user)
        .then((balance) => {
          console.log("getLiquidationPrice : ", parseInt(balance._hex, 16))
          return parseInt(balance._hex, 16) / 1e18;
        });
      const userLeverageBPS = await safeLeverage
        .getCurrentUserLeverageBPS(user)
        .then((balance) => {
          console.log("getCurrentUserLeverageBPS : ", parseInt(balance._hex, 16) / 100)
          return parseInt(balance._hex, 16) / 100;
        });
      const minimumTokensToLeverage = await safeLeverage
        .getMinimumTokensToLeverage()
        .then((balance) => {
          console.log("getMinimumTokensToLeverage : ", parseInt(balance._hex, 16) / 1e18)
          return parseInt(balance._hex, 16) / 1e18;
        });
      const maximumLeverageBPS = await safeLeverage
        .getMaximumLeverageBPS()
        .then((balance) => {
          console.log("getMaximumLeverageBPS : ", parseInt(balance._hex, 16))
          return parseInt(balance._hex, 16);
        });
      const WETHAvalibleToBorrow = await safeLeverage
        .getWETHAvalibleToBorrow()
        .then((value) => {
          console.log("getWETHAvalibleToBorrow : ", parseInt(value._hex, 16) / 1e18)
          return parseInt(value._hex, 16) / 1e18;
        });
      const WETHAvalibleToBorrowByUserAtLeverage = await safeLeverage
        .getWETHAvalibleToBorrowByUserAtLeverage(user, userLeverageBPS, collateralFromWallet)
        .then((value) => {
          console.log("getWETHAvalibleToBorrowByUserAtLeverage : ", parseInt(value._hex, 16))
          return parseInt(value._hex, 16);
        });
      const isMarketBuyingOfTokensAvalible = await safeLeverage
        .getIsMarketBuyingOfTokensAvalible()
        .then((res) => {
          console.log("isMarketBuyingOfTokensAvalible:", res);
          return res;
        });
      setSafeLeverageDetails({
        position: position,
        WETHOwed: WETHOwed,
        liquidationPrice: liquidationPrice,
        userLeverageBPS: userLeverageBPS,
        minimumTokensToLeverage: minimumTokensToLeverage,
        maximumLeverageBPS: maximumLeverageBPS,
        WETHAvalibleToBorrow: WETHAvalibleToBorrow,
        WETHAvalibleToBorrowByUserAtLeverage: WETHAvalibleToBorrowByUserAtLeverage,
        isMarketBuyingOfTokensAvalible: isMarketBuyingOfTokensAvalible,
      });
    } catch (error) {
      console.log("ddddddddddddddddddddddddddd")

      console.log("Error", error.message);
    }
  };
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
      // const currentFairPrice = await testCapTaxManager.getCurrentFairPrice();
      const currentBackingPrice = await testCapTaxManager
        .getCurrentBackingPrice()
        .then((res) => {
          return (parseInt(res._hex, 16) / 1e18).toFixed(2);
        });
      setTestCapTaxManagerDetails({
        currentBackingPrice: currentBackingPrice,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  // useEffect ---------------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (!signer) return;
    fetchTestCapitalDetails();
    fetchDividendTrackerDetails();
    fetchBondingDepositoryDetails();
    fetchSafeLeverageDetails();
    fetchPriceFetcherDetails();
    fetchTestCapTaxManagerDetails();
  }, [signer]);
  // check if values are still loading...
  const loadChecker = (argument, unit) => {
    return argument === ""
      ? "Loading..."
      : unit === ""
      ? argument
      : argument + " " + unit;
  };

  const leverageSummary = [
    {
      title: "Position",
      value: loadChecker(safeLeverageDetails.position, "BOOM"),
      button: "",
      claimable: false,
    },
    {
      title: "Amount Owned",
      value: loadChecker(safeLeverageDetails.position, "WETH"),
      button: "",
      claimable: false,
    },
    {
      title: "BOOM Backing Price",
      value: loadChecker(
        testCapTaxManagerDetails.currentBackingPrice *
          priceFetcherDetails.WETHPriceInUSDC18Dec,
        "USDC"
      ),
      button: "Claim",
      claimable: false,
    },
    {
      title: "Liquidation Price",
      value: loadChecker(
        safeLeverageDetails.liquidationPrice *
          priceFetcherDetails.WETHPriceInUSDC18Dec,
        "USDC"
      ),
      button: "Claim",
      claimable: false,
    },
    {
      title: "Leverage %",
      value: loadChecker(safeLeverageDetails.userLeverageBPS, "%"),
      button: "Close Position",
      claimable: false,
    },
  ];
  const useLeverage = [];
  // slider - 1
  const [collateralFromWallet, setCollateralFromWallet] = React.useState(0);
  const [collateralFromBonds, setCollateralFromBonds] = React.useState(0);
  const [leveragePercentage, setLeveragePercentage] = React.useState(0);
  // section - 2
  const handlePositionButton = () => {
    if (
      safeLeverageDetails.position > 0 &&
      collateralFromWallet + collateralFromBonds <
        safeLeverageDetails.minimumTokensToLeverage
    ) {
      testCapital
        .increaseCollateral(collateralFromWallet, collateralFromBonds)
        .then((res) => {
          console.log("Res from Increase Collateral:", res);
        });
    } else console.log("Function not Disabled");
  };
  // section - 3
  const [enabledBuy, setEnabledBuy] = React.useState(false);
  // formator ------------------------
  const formator = (argument, unit) => {
    return argument === ""
      ? "Loading..."
      : unit === ""
      ? argument
      : argument.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        unit;
  };
  // // intFormator ------------------------
  // const decimalFormator = (argument) => {
  //   if (argument >= 1000) return argument;
  //   else if (argument >= 1 && argument < 1000) return argument.toFixed(2);
  //   else if (argument >= 0.1 && argument < 1) return argument.toFixed(3);
  //   else if (argument >= 0.01 && argument < 0.1) return argument.toFixed(4);
  //   else if (argument >= 0.001 && argument < 0.01) return argument.toFixed(5);
  //   else if (argument >= 0.0001 && argument < 0.001) return argument.toFixed(6);
  //   else if (argument >= 0.00001 && argument < 0.0001)
  //     return argument.toFixed(7);
  //   else if (argument < 0.00001) return argument.toFixed(8);
  //   else return argument;
  // };
  // const intFormator = (argument, unit) => {
  //   return argument === ""
  //     ? "Loading..."
  //     : unit === ""
  //     ? argument
  //     : decimalFormator(argument)
  //         .toString()
  //         .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
  //       " " +
  //       unit;
  // };
  // console.log("0.123456789:", decimalFormator(3453450.1));
  // console.log("0.123456789 int:", intFormator(3453450.1, ""));
  // console.log("01.23456789:", decimalFormator(0.0123456789));
  // console.log("012.3456789:", decimalFormator(0.00123456789));
  // console.log("0123.456789:", decimalFormator(0.00123456789));
  // console.log("01234.56789:", decimalFormator(0.000123456789));
  // console.log("012345.6789:", decimalFormator(0.0000123456789));
  // console.log("0123456.789:", decimalFormator(0.00000123456789));
  // console.log("01234567.89:", decimalFormator(0.000000123456789));
  // console.log("012345678.9:", decimalFormator(0.0000000123456789));
  return (
    <React.Fragment>
      <Sidebar
        user={user}
        onConnectWallet={onConnectWallet}
        network={network}
      />
      <div className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mb-4 mt-12">
            {/* main-card-1 */}
            <div className="flex justify-center items-center mb-8">
              <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 mb-5 flex-1 text-gray-700">
                    <span className="text-xs block py-4 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">Leverage Summary</h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      {/* <h6 className="text-xl font-bold  mb-2">______</h6> */}
                    </span>
                  </div>
                  {/* cards */}
                  
                  {leverageSummary.map((status, index) => (
                    
                    <PortfolioCard
                      key={index}
                      title={status.title}
                      value={status.value}
                      claim={status.claimable}
                      button={status.button}
                      handleButton={handleButton}
                    />
                  
                  ))}
                </div>
              </div>
            </div>
            {/* main-card-2 */}
            <div className="flex justify-center mb-8">
              <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 mb-5 flex-1 text-gray-700">
                    <span className="text-xs block py-4 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">
                          Select Collateral
                        </h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      {/* <h6 className="text-xl font-bold  mb-2">______</h6> */}
                    </span>
                  </div>
                  {/* item-1 */}
                  <div className="text-xs block py-2 px-4 mb-2 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-gray-700 hover:text-gray-900 rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold ">
                      <h6 className="py-2">
                        {"Collateral from wallet: " +
                          testCapitalDetails.userBalance}
                      </h6>
                      {/* slider*/}
                      <List className="my-0 p-0">
                        <ListItem
                          className={`${
                            testCapitalDetails.userBalance > 0
                              ? "text-gray-700 my-0"
                              : "text-gray-300 my-0"
                          } `}
                          innerClassName="flex space-x-2"
                          innerChildren={
                            <>
                              <span>0</span>
                              <Range
                                className="my-0"
                                value={collateralFromWallet}
                                step={1}
                                min={0}
                                max={testCapitalDetails.userBalance}
                                onChange={(e) =>
                                  setCollateralFromWallet(e.target.value)
                                }
                              />
                              {/* <span>{bondDetails.amountLeft}</span>{" "} */}
                              <span>{collateralFromWallet}</span>
                            </>
                          }
                        />
                      </List>
                      {/* end slider */}
                    </div>
                  </div>
                  {/* item-2 */}
                  <div className="text-xs block py-2 px-4 mb-2 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-gray-700 hover:text-gray-900 rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold ">
                      <h6 className="py-2">
                        {"Collateral from bonds: " +
                          bondingDepositoryDetails.bondHolderTokenVesting}
                      </h6>
                      {/* slider*/}
                      <List className="my-0 p-0">
                        <ListItem
                          className={`${
                            bondingDepositoryDetails.bondHolderTokenVesting > 0
                              ? "text-gray-700 my-0"
                              : "text-gray-300 my-0"
                          } `}
                          innerClassName="flex space-x-2"
                          innerChildren={
                            <>
                              <span>0</span>
                              <Range
                                className="my-0"
                                value={collateralFromBonds}
                                step={1}
                                min={0}
                                max={
                                  bondingDepositoryDetails.bondHolderTokenVesting
                                }
                                onChange={(e) =>
                                  setCollateralFromBonds(e.target.value)
                                }
                              />
                              {/* <span>{bondDetails.amountLeft}</span>{" "} */}
                              <span>{collateralFromBonds}</span>
                            </>
                          }
                        />
                      </List>
                      {/* end slider */}
                    </div>
                  </div>
                  {/* item-3 */}
                  <div className="text-xs block py-2 px-4 mb-2 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-gray-700 hover:text-gray-900 rounded-lg shadow hover:shadow-md transition duration-300">
                    <h6 className="py-2 text-base font-bold ">
                      {"Total collateral: "}
                      <span className="font-normal">
                        {collateralFromWallet + collateralFromBonds}
                      </span>
                    </h6>
                    <div className="flex items-center justify-between text-base font-bold ">
                      <h6 className="py-2">
                        {"Minimum collateral: "}
                        <span
                          className={`font-normal ${
                            collateralFromWallet + collateralFromBonds <
                            safeLeverageDetails.minimumTokensToLeverage
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {formator(
                            safeLeverageDetails.minimumTokensToLeverage,
                            "BOOM"
                          )}
                        </span>
                      </h6>
                      {safeLeverageDetails.position > 0 ? (
                        <button
                          onClick={handlePositionButton}
                          className={`text-sm block py-2 px-4 bg-gradient-to-r ${
                            safeLeverageDetails.position > 0 &&
                            collateralFromWallet + collateralFromBonds <
                              safeLeverageDetails.minimumTokensToLeverage
                              ? "from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from"
                              : " from-gray-600 to-slate-700 hover:to-gray-600 hover:from-slate-700"
                          } text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300`}
                        >
                          Increase Collateral
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* main-card-3 */}
            <div className="flex justify-center items-center mb-8">
              <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 mb-5 flex-1 text-gray-700">
                    <span className="text-xs block py-4 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">Select Leverage</h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      {/* <h6 className="text-xl font-bold  mb-2">______</h6> */}
                    </span>
                  </div>
                  {/* row - 1 */}
                  <div className="text-xs block py-2 px-4 mb-2 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-gray-700 hover:text-gray-900 rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold ">
                      <h6 className="py-2">{"Leverage %: "}</h6>
                      {console.log("POs", safeLeverageDetails.position)}
                      {/* slider*/}
                      <List className="my-0 p-0">
                        <ListItem
                          className={"text-gray-700 my-0"}
                          innerClassName="flex space-x-2"
                          innerChildren={
                            <>
                              <span>0</span>
                              <Range
                                className="my-0"
                                value={leveragePercentage}
                                step={1}
                                min={
                                  safeLeverageDetails.position === 0
                                    ? 0
                                    : safeLeverageDetails.userLeverageBPS
                                }
                                max={safeLeverageDetails.maximumLeverageBPS}
                                onChange={(e) =>
                                  setLeveragePercentage(e.target.value)
                                }
                              />
                              {/* <span>{bondDetails.amountLeft}</span>{" "} */}
                              <span>{leveragePercentage}</span>
                            </>
                          }
                        />
                      </List>
                      {/* end slider */}
                    </div>
                  </div>
                  {/* row - 2 */}
                  <div className="text-xs block py-2 px-4 mb-2 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-gray-700 hover:text-gray-900 rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold ">
                      <h6 className="py-2">
                        WETH Avalible To Borrow:
                        <span className="font-normal">
                          {formator(
                            safeLeverageDetails.WETHAvalibleToBorrow,
                            ""
                          )}
                        </span>
                      </h6>
                    </div>
                  </div>
                  {/* row - 3 */}
                  <div className="text-xs block py-2 px-4 mb-2 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-gray-700 hover:text-gray-900 rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold ">
                      <h6 className="py-2">
                        WETH Avalible To Borrow by User:
                        <span className="font-normal">
                          {formator(
                            safeLeverageDetails.WETHAvalibleToBorrowByUserAtLeverage,
                            ""
                          )}
                        </span>
                      </h6>
                    </div>
                  </div>
                  {/* end */}
                </div>
              </div>
            </div>
            {/* main-card-4 */}
            <div className="flex justify-center  mb-8">
              <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 mb-5 flex-1 text-gray-700">
                    <span className="text-xs block py-4 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">Use Leverage</h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      {/* <h6 className="text-xl font-bold  mb-2">______</h6> */}
                    </span>
                  </div>
                  {/* row - 1 */}
                  <div className="text-xs block py-2 px-4 mb-2 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-gray-700 hover:text-gray-900 rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold ">
                      <h6 className="py-2">
                        {enabledBuy ? "Market Buy" : "Bond"}
                      </h6>
                      <span className="font-normal">
                        <Switch                        
                          checked={enabledBuy}
                          onChange={
                            // safeLeverageDetails.isMarketBuyingOfTokensAvalible &&
                            ()=>setEnabledBuy(!enabledBuy)
                          }
                          className={`${
                            enabledBuy ? "bg-primary" : "bg-gray-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">Enable notifications</span>
                          <span
                            className={`${
                              enabledBuy ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white`}
                          />
                        </Switch>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Leverage;

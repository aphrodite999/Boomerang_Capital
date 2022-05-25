import React from "react";
import { ethers } from "ethers";
import Sidebar from "./sub-components/Sidebar";
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

function Portfolio({ user, network, onConnectWallet, signer }) {
  // Formator <<<--------------------------------------------------------------------------------------------
  const decimalFormator = (number) => {
    if (number === 0) {
      return 0;
    } else if (number >= 1000) {
      return Number.parseFloat(number).toFixed(0);
    } else if (number >= 1 && number < 1000) {
      return Number.parseFloat(number).toFixed(2);
    } else if (number >= 0.1 && number < 1) {
      return Number.parseFloat(number).toFixed(3);
    } else if (number >= 0.01 && number < 0.1) {
      return Number.parseFloat(number).toFixed(4);
    } else if (number >= 0.001 && number < 0.01) {
      return Number.parseFloat(number).toFixed(5);
    } else if (number >= 0.0001 && number < 0.001) {
      return Number.parseFloat(number).toFixed(6);
    } else if (number >= 0.00001 && number < 0.0001) {
      return Number.parseFloat(number).toFixed(7);
    } else if (number >= 0.000001 && number < 0.00001) {
      return Number.parseFloat(number).toFixed(8);
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
  // Formator -------------------------------------------------------------------------------------------->>>
  // ------------------------------------------------------------------------- useEffect
  const [testCapitalDetails, setTestCapitalDetails] = React.useState({
    userBalance: "",
    tokenBalance: "",
  });
  const [dividendTrackerDetails, setDividendTrackerDetails] = React.useState({
    totalReward: "",
    totalClaimed: "",
    lastClaim: "",
    totalClaimable: false,
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
        totalClaimed:
          parseInt(dividends[3]._hex, 16) - parseInt(dividends[2]._hex, 16),
        lastClaim: parseInt(dividends[4]._hex, 16),
        totalClaimable: parseInt(dividends[2]._hex, 16),
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch Bonding Depository Details ----------------------------------------------------------------------
  const fetchBondingDepositoryDetails = async () => {
    try {
      const bondHolderTokenVesting = await bondingDepository
        .getBondHolderTokenVesting(user)
        .then((balance) => {
          return parseInt(balance._hex, 16) / 1e18;
        });
      const bondHolderAvgPriceOfVB = await bondingDepository
        .getBondHolderAveragePriceOfVestingBonds(user)
        .then((balance) => {
          return parseInt(balance._hex, 16) / 1e18;
        });
      const bondHolderVestingTimeRemaining = await bondingDepository
        .getBondHolderVestingTimeRemaining(user)
        .then((res) => {
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
        return parseInt(balance._hex, 16);
      });
      const WETHOwed = await safeLeverage.getWETHOwed(user).then((balance) => {
        return parseInt(balance._hex, 16);
      });
      const liquidationPrice = await safeLeverage
        .getLiquidationPrice(user)
        .then((balance) => {
          return parseInt(balance._hex, 16) / 1e18;
        });
      const userLeverageBPS = await safeLeverage
        .getCurrentUserLeverageBPS(user)
        .then((balance) => {
          return parseInt(balance._hex, 16) / 100;
        });
      setSafeLeverageDetails({
        position: position,
        WETHOwed: WETHOwed,
        liquidationPrice: liquidationPrice,
        userLeverageBPS: userLeverageBPS,
      });
    } catch (error) {
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
      const currentBackingPrice = await testCapTaxManager
        .getCurrentBackingPrice()
        .then((res) => {
          return parseInt(res._hex, 16) / 1e18;
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

  const summary = [
    {
      title: "Total Holding",
      value: priceFormater(
        testCapitalDetails.userBalance +
          bondingDepositoryDetails.bondHolderTokenVesting +
          safeLeverageDetails.position / 1e18,
        "BOOM"
      ),
      button: "",
      claimable: false,
    },
    {
      title: "Held in Wallet",
      value: priceFormater(testCapitalDetails.userBalance / 1e18, "BOOM"),
      button: "",
      claimable: false,
    },
    {
      title: "Vesting in Bounds",
      value: priceFormater(
        bondingDepositoryDetails.bondHolderTokenVesting / 1e18,
        "BOOM"
      ),
      button: "",
      claimable: false,
    },
    {
      title: "Leveraged Position",
      value: priceFormater(safeLeverageDetails.position / 1e18, "ETH"),
      button: "",
      claimable: false,
    },
    {
      title: "Owned to Treasury",
      value: priceFormater(safeLeverageDetails.WETHOwed / 1e18, "BOOM"),
      button: "",
      claimable: false,
    },
  ];
  const wallet = [
    {
      title: "BOOM Balance",
      value: priceFormater(testCapitalDetails.userBalance, "BOOM"),
      button: "",
      claimable: false,
    },
    {
      title: "Total Rewards",
      value: priceFormater(dividendTrackerDetails.totalReward, "WETH"),
      button: "",
      claimable: false,
    },
    {
      title: "Total Claimed to Date",
      value: priceFormater(dividendTrackerDetails.totalClaimed, "WETH"),
      button: "",
      claimable: false,
    },
    {
      title: "Last Claim Time",
      value: priceFormater(dividendTrackerDetails.lastClaim, ""),
      button: "",
      claimable: false,
    },
    {
      title: "Total Claimable Rewards",
      value: priceFormater(dividendTrackerDetails.totalClaimable, "WETH"),
      button: "claim",
      claimable: dividendTrackerDetails.totalClaimable > 0 ? true : false,
    },
  ];
  const bonding = [
    {
      title: "Amount Vesting",
      value: priceFormater(
        bondingDepositoryDetails.bondHolderTokenVesting,
        "BOOM"
      ),
      button: "",
      claimable: false,
    },
    {
      title: "Average Purchase Price",
      value: priceFormater(
        bondingDepositoryDetails.bondHolderAvgPriceOfVB *
          priceFetcherDetails.WETHPriceInUSDC18Dec,
        "USDC"
      ),
      button: "",
      claimable: false,
    },
    {
      title: "Time Remaining to Vest",
      value: priceFormater(
        bondingDepositoryDetails.bondHolderVestingTimeRemaining,
        "seconds" // Date
      ),
      button: "",
      claimable: false,
    },
    {
      title: "Last Bonding Time",
      value: priceFormater(
        bondingDepositoryDetails.bondHolderBondingTime,
        "seconds" // Time
      ),
      button: "",
      claimable: false,
    },
    {
      title: "Bonded Amount Claimable",
      value: priceFormater(
        bondingDepositoryDetails.bondHolderTokenVesting > 0 &&
          bondingDepositoryDetails.bondHolderVestingTimeRemaining === 0
          ? bondingDepositoryDetails.bondHolderTokenVesting
          : 0,
        ""
      ),

      button: "claim",
      claimable: false,
    },
  ];
  const leverage = [
    {
      title: "Position",
      value: priceFormater(safeLeverageDetails.position, "BOOM"),
      button: "",
      claimable: false,
    },
    {
      title: "Amount Owned",
      value: priceFormater(safeLeverageDetails.position, "WETH"),
      button: "",
      claimable: false,
    },
    {
      title: "BOOM Backing Price",
      value: priceFormater(
        testCapTaxManagerDetails.currentBackingPrice *
          priceFetcherDetails.WETHPriceInUSDC18Dec,
        "USDC"
      ),
      button: "Claim",
      claimable: false,
    },
    {
      title: "Liquidation Price",
      value: priceFormater(
        safeLeverageDetails.liquidationPrice *
          priceFetcherDetails.WETHPriceInUSDC18Dec,
        "USDC"
      ),
      button: "Claim",
      claimable: false,
    },
    {
      title: "Leverage %",
      value: priceFormater(safeLeverageDetails.userLeverageBPS, "%"),
      button: "Close Position",
      claimable: false,
    },
  ];
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
                        <h2 className="text-2xl font-bold">Summary</h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      {/* <h6 className="text-xl font-bold  mb-2">______</h6> */}
                    </span>
                  </div>
                  {/* cards */}
                  {summary.map((status, index) => (
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
            <div className="flex justify-center items-center mb-8">
              <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 mb-5 flex-1 text-gray-700">
                    <span className="text-xs block py-4 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">Wallet</h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      {/* <h6 className="text-xl font-bold  mb-2">______</h6> */}
                    </span>
                  </div>
                  {/* cards */}
                  {wallet.map((status, index) => (
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
            {/* main-card-3 */}
            <div className="flex justify-center items-center  mb-8">
              <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 mb-5 flex-1 text-gray-700">
                    <span className="text-xs block py-4 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">Bonding</h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      {/* <h6 className="text-xl font-bold  mb-2">______</h6> */}
                    </span>
                  </div>
                  {/* cards */}
                  {bonding.map((status, index) => (
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
            {/* main-card-4 */}
            <div className="flex justify-center  mb-8">
              <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 mb-5 flex-1 text-gray-700">
                    <span className="text-xs block py-4 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">Leverage</h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      {/* <h6 className="text-xl font-bold  mb-2">______</h6> */}
                    </span>
                  </div>
                  {/* cards */}
                  {leverage.map((status, index) => (
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Portfolio;

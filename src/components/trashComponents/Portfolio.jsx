import React from "react";
import { ethers } from "ethers";
import Sidebar from "./sub-components/Sidebar";
import PortfolioCard from "./sub-components/PortfolioCard";
import {
  TestCapitalAddress,
  DividendTrackerAddress,
} from "./../contract/addresses";
import { TestCapitalAbi } from "./../contract/testCapitalAbi";
import { DividendTrackerAbi } from "./../contract/dividendTrackerAbi";

function Portfolio({ user, onConnectWallet, signer }) {
  const [testCapitalDetails, setTestCapitalDetails] = React.useState({
    tokenBalance: "",
  });
  const [dividendTrackerDetails, setDividendTrackerDetails] = React.useState({
    totalReward: "",
    totalClaimed: "",
    lastClaim: "",
    totalClaimable: "",
  });
  let testCapital, dividendTracker;
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
  }
  const handleButton = async (number) => {
    if (number === 7 && dividendTrackerDetails.totalClaimable > 0) {
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
        return parseInt(balance._hex, 16);
      });
      setTestCapitalDetails({
        tokenBalance: tokenBalance,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch Div Details -----------------------------------------------------------------------------
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
  // useEffect ---------------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (!signer) return;
    fetchTestCapitalDetails();
    fetchDividendTrackerDetails();
  }, [signer]);

  const statuses = [
    {
      title: "Token  Balance",
      value: `${
        testCapitalDetails.tokenBalance === ""
          ? "loading..."
          : testCapitalDetails.tokenBalance
      }`,
      description: "",
      des_title: "FDV",
      button: "",
    },
    {
      title: "Amount Vesting",
      value: "to be coded...",
      description: "",
      des_title: "",
      button: "",
    },
    {
      title: "Time Remaining to Vest",
      value: "to be coded...",
      description: "",
      des_title: "",
      button: "",
    },
    {
      title: "Bonded Amount Claimable",
      value: "to be coded...",
      description: "",
      des_title: "",
      button: "Total claimable rewards",
    },
    {
      title: "Total rewards",
      value: `${
        dividendTrackerDetails.totalReward === ""
          ? "loading..."
          : dividendTrackerDetails.totalReward
      }`,
      description: "",
      des_title: "",
      button: "",
    },
    {
      title: "Total Claimed to date",
      value: `${
        dividendTrackerDetails.totalClaimed === ""
          ? "loading..."
          : dividendTrackerDetails.totalClaimed
      }`,
      description: "",
      des_title: "",
      button: "",
    },
    {
      title: "Last Claim Time",
      value: `${
        dividendTrackerDetails.lastClaim === ""
          ? "loading..."
          : dividendTrackerDetails.lastClaim
      }`,
      description: "",
      des_title: "",
      button: "",
    },
    {
      title: "Total Claimable Rewards",
      value: `${
        dividendTrackerDetails.totalClaimable === ""
          ? "loading..."
          : dividendTrackerDetails.totalClaimable
      }`,
      description: "",
      des_title: "",
      button: "Total claimable Rewards",
    },
  ];
  return (
    <React.Fragment>
      <Sidebar user={user} onConnectWallet={onConnectWallet} />
      <div className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mb-4">
            {statuses.map((status, index) => (
              <PortfolioCard
                key={index}
                title={status.title}
                value={status.value}
                description={status.description}
                des_title={status.des_title}
                button={status.button}
                buttonNumber={index}
                handleButton={handleButton}
              />
            ))}
          </div>
        </div>
      </div>
      {/* -------------------------       */}
      <div className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mb-4 mt-12">
            {/* tile-1 */}
            <div className="flex justify-center items-center">
              <div className="p-5 m-2 w-full bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 flex-1 text-gray-700">
                    <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">
                          Current Buy Taxes
                        </h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      <h6 className="text-xl font-bold  mb-2">______</h6>
                    </span>
                  </div>
                  {/* end main header div */}
                  {/* ammount in holder wallet */}
                  <span className="text-xs mt-4 block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold">
                      <h2>Holder reflections:</h2>
                      <h2>to be clearify...</h2>
                    </div>
                  </span>
                  <span className="text-xs block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold">
                      <h2>Treasury Tax:</h2>
                      <h2>to be clearify...</h2>
                    </div>
                  </span>
                  <span className="text-xs block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold">
                      <h2>Liquidity Tax :</h2>
                      <span>to be clearify...</span>
                    </div>
                  </span>
                  <span className="text-xs block py-2 px-4 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold ">
                      <h2>Marketing Tax:</h2>
                      <h2>to be clearify...</h2>
                    </div>
                  </span>
                  {/* <div className="mb-2 flex-1 ">
                      <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                        <span className="text-sm font-bold">
                          Compounding DividendRewards :{" "}
                        </span>{" "}
                        to be coded...
                      </span>
                    </div> */}
                </div>
              </div>
            </div>
            {/* tile-2 */}
            <div className="flex justify-center items-center">
              <div className="p-5 m-2 w-full bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 flex-1 text-gray-700">
                    <span className="text-xs block py-2 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from  rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">
                          Current Sell Taxes
                        </h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      <h6 className="text-xl font-bold  mb-2">______</h6>
                    </span>
                  </div>
                  {/* end main header div */}
                  {/* ammount in holder wallet */}
                  <span className="text-xs mt-4 block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold">
                      <h2>Holder reflections:</h2>
                      <h2>to be clearify...</h2>
                    </div>
                  </span>
                  <span className="text-xs block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold">
                      <h2>Treasury Tax:</h2>
                      <h2>to be clearify...</h2>
                    </div>
                  </span>
                  <span className="text-xs block py-2 px-4 mb-3 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold">
                      <h2>Liquidity Tax :</h2>
                      <span>to be clearify...</span>
                    </div>
                  </span>
                  <span className="text-xs block py-2 px-4 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-green-100 hover:text-white rounded-lg shadow hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between text-base font-bold ">
                      <h2>Marketing Tax:</h2>
                      <h2>to be clearify...</h2>
                    </div>
                  </span>
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

// <div className="px-3 md:px-8">
//   <div className="container mx-auto max-w-full">
//     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mb-4">
//       {statuses.map((status) => (
//         <PortfolioCard
//           title={status.title}
//           value={status.value}
//           description={status.description}
//           des_title={status.des_title}
//           button={status.button}
//         />
//       ))}
//     </div>
//   </div>
// </div>;

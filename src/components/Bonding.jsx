import React from "react";
import { ethers } from "ethers";
import Sidebar from "./sub-components/Sidebar";
import BondingPopup from "./sub-components/bondingPopup";
import {
  BondingDepositoryAddress,
  PriceFetcherAddress,
  WETHAddress,
  USDCAddress,
} from "./../contract/addresses";
import { BondingDepositoryAbi } from "./../contract/bondingDepositoryAbi";
import { PriceFetcherAbi } from "./../contract/priceFetcherAbi";
import { WETHAbi } from "./../contract/wethAbi";
import { USDCAbi } from "./../contract/usdcAbi";

function Bonding({ user, signer, network, onConnectWallet, triggerPopup }) {
  // Formator -------------------------------------------------------------->>>
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
  // Formator ---------------------------------------------------------------<<<
  let bondingDepository;
  let priceFetcher;
  let WETHContract;
  let USDCContract;
  const [loadingTableRec, setLoadingTableRec] = React.useState(false);
  if (signer) {
    bondingDepository = new ethers.Contract(
      BondingDepositoryAddress,
      BondingDepositoryAbi,
      signer
    );
    priceFetcher = new ethers.Contract(
      PriceFetcherAddress,
      PriceFetcherAbi,
      signer
    );
    WETHContract = new ethers.Contract(WETHAddress, WETHAbi, signer);
    USDCContract = new ethers.Contract(USDCAddress, USDCAbi, signer);
  }
  //------------------------------------------------------------------- useState
  const [maxROI, setMaxROI] = React.useState(0);
  const [bondingDepositoryDetails, setBondingDepositoryDetails] =
    React.useState({
      totalBondsClaimedToDate: "Loading...",
      totalBondsVestingNow: "Loading...",
      totalBondsAvalibleToBuyNow: "Loading...",
      bondingDepoTokenBalanceAvalible: "Loading...",
      vestingTermByBondID: "Loading...",
      totalNumberOfBondingTerms: "Loading...",
    });
  const [priceFetcherDetails, setPriceFetcherDetails] = React.useState({
    priceInUSDC: "Loading...",
    priceInWETH: "Loading...",
    marketPrice: "Loading...",
  });
  const [bondingTableDetails, setBondingTableDetails] = React.useState([]);
  const [USDCContractDetails, setUSDCContractDetails] = React.useState({
    balanceofUserInUSDC: "Loading...",
    isAllowanceAvailable: "Loading...",
  });
  const [WETHContractDetails, setWETHContractDetails] = React.useState({
    balanceofUserInWETH: "Loading...",
    isAllowanceAvailable: "Loading...",
  });
  const fetchPriceFetcherDetails = async () => {
    const marketPriceInWETH = await priceFetcher
      .getPriceOfTokenInWETH18Dec()
      .then((res) => {
        return priceFormater(parseInt(res._hex, 16) / 1e18, "WETH");
      });
    const marketPriceInUSDC = await priceFetcher
      .getTokenPriceInUSDC18Dec()
      .then((res) => {
        return priceFormater(parseInt(res._hex, 16) / 1e18, "USDC");
      });
    setPriceFetcherDetails({
      priceInUSDC: marketPriceInUSDC,
      priceInWETH: marketPriceInWETH,
      marketPrice: marketPriceInUSDC + " / " + marketPriceInWETH,
    });
  };
  // ------------------------------------------------------------------- fetchWETHDetails
  const fetchWETHDetails = async () => {
    // Provides balance of WETH or USDC that user has in their wallet avalible to bond
    const balanceOfUserInWETH = await WETHContract.balanceOf(user).then(
      (res) => {
        return parseInt(res._hex, 16);
      }
    );
    const isAllowanceAvailable = await WETHContract.allowance(
      user,
      BondingDepositoryAddress
    ).then((res) => {
      return parseInt(res._hex, 16) > 10000000 * 1e18 ? true : false;
    });
    setWETHContractDetails({
      balanceofUserInWETH: balanceOfUserInWETH,
      isAllowanceAvailable: isAllowanceAvailable,
    });
  };

  // ------------------------------------------------------------------- fetchWETHDetails
  const fetchUSDCDetails = async () => {
    // Provides balance of WETH or USDC that user has in their wallet avalible to bond
    const balanceOfUserInUSDC = await USDCContract.balanceOf(user).then(
      (res) => {
        return parseInt(res._hex, 16);
      }
    );
    const isAllowanceAvailable = await WETHContract.allowance(
      user,
      BondingDepositoryAddress
    ).then((res) => {
      return parseInt(res._hex, 16) > 1000000000 * 1e18 ? true : false;
    });
    setUSDCContractDetails({
      balanceofUserInUSDC: balanceOfUserInUSDC,
      isAllowanceAvailable: isAllowanceAvailable,
    });
  };
  // ------------------------------------------------------------------- fetchBondingDepositoryDetails
  const fetchBondingDepositoryDetails = async () => {
    await fetchPriceFetcherDetails();
    try {
      // const allowance = await bondingDepository
      //   .IERC20("0xc778417e063141139fce010982780140aa0cd5ab")
      //   .allowance(user, "0x86c71a1Fd390346998beF4ee18Cd57C15e5d0d51")
      //   .then((res) => {
      //     console.log("Allowance: ", res);
      //   });
      const totalBondsClaimedToDate = await bondingDepository
        .getTotalBondsClaimedToDate()
        .then((res) => {
          return priceFormater(parseInt(res._hex, 16) / 1e18, "BOOM");
        });
      const totalBondsVestingNow = await bondingDepository
        .getTotalBondsVestingNow()
        .then((res) => {
          return priceFormater(parseInt(res._hex, 16) / 1e18, "BOOM");
        });
      const totalBondsAvalibleToBuyNow = await bondingDepository
        .getTotalBondsAvalibleToBuyNow()
        .then((res) => {
          return priceFormater(parseInt(res._hex, 16) / 1e18, "BOOM");
        });
      const bondingDepoTokenBalanceAvalible = await bondingDepository
        .getBondingDepoTokenBalanceAvalible()
        .then((res) => {
          return priceFormater(parseInt(res._hex, 16) / 1e18, "BOOM");
        });
      const totalNumberOfBondingTerms = await bondingDepository
        .getTotalNumberOfBondingTerms()
        .then((res) => {
          return ((parseInt(res._hex, 16) - 1) / 60) * 60 * 24;
        });

      const vestingTermByBondID = await bondingDepository
        .getVestingTermByBondID(totalNumberOfBondingTerms)
        .then((res) => {
          return priceFormater(parseInt(res._hex, 16) / 1e18, "");
        });

      //------------------------------------------------------------------- useEffect
      setBondingDepositoryDetails({
        totalBondsClaimedToDate: totalBondsClaimedToDate,
        totalBondsVestingNow: totalBondsVestingNow,
        totalBondsAvalibleToBuyNow: totalBondsAvalibleToBuyNow,
        bondingDepoTokenBalanceAvalible: bondingDepoTokenBalanceAvalible,
        vestingTermByBondID: vestingTermByBondID,
        totalNumberOfBondingTerms: totalNumberOfBondingTerms,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  //------------------------------------------------------------------- fetchBondingTableDetails
  const fetchBondingTableDetails = async () => {
    // console.log("Price in USDC:", priceFetcherDetails.priceInUSDC);
    try {
      const lastAssetIndex = await bondingDepository
        .getTotalNumberOfBondingTerms()
        .then((res) => {
          return parseInt(res._hex, 16) - 1;
        });
      // console.log("Last Asset Index", lastAssetIndex);
      for (let i = 0; i < lastAssetIndex; i++)
        if (await bondingDepository.getActiveByBondID(i)) {
          setLoadingTableRec(true);
          let Asset_Bonded = await bondingDepository
            .getAssetBondedByBondID(i)
            .then((res) => {
              return res; // Return String
            });
          let Token_Price = await bondingDepository
            .getTokenPriceByBondID(i)
            .then((res) => {
              return priceFormater(parseInt(res._hex, 16) / 1e18, Asset_Bonded);
            });
          let Just_Token_Price = await bondingDepository
            .getTokenPriceByBondID(i)
            .then((res) => {
              return priceFormater(parseInt(res._hex, 16) / 1e18, "");
            });
          let Vesting_term = await bondingDepository
            .getVestingTermByBondID(i)
            .then((res) => {
              // return parseInt(res._hex, 16);
              let seconds = Number(parseInt(res._hex, 16));
              // console.log("seconds", seconds);
              let y = Math.floor(seconds / 31536000);
              let mo = Math.floor((seconds % 31536000) / 2628000);
              let d = Math.floor(((seconds % 31536000) % 2628000) / 86400);
              let h = Math.floor((seconds % (3600 * 24)) / 3600);
              let m = Math.floor((seconds % 3600) / 60);
              let s = Math.floor(seconds % 60);

              let yDisplay =
                y > 0 ? y + (y === 1 ? " year, " : " years, ") : "";
              let moDisplay =
                mo > 0 ? mo + (mo === 1 ? " month, " : " months, ") : "";
              let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
              let hDisplay =
                h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
              let mDisplay =
                m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
              let sDisplay =
                s > 0 ? s + (s === 1 ? " second" : " seconds ") : "";
              let result =
                yDisplay +
                moDisplay +
                dDisplay +
                hDisplay +
                mDisplay +
                sDisplay;
              result = result.charAt(result.length - 2 === ",")
                ? result.slice(0, -2)
                : result;
              return result;
            });
          let Total_Amount = await bondingDepository
            .getTotalAmountByBondID(i)
            .then((res) => {
              return priceFormater(parseInt(res._hex, 16) / 1e18, "BOOM");
            });
          let Amount_Left = await bondingDepository
            .getAmountLeftByBondID(i)
            .then((res) => {
              return priceFormater(parseInt(res._hex, 16) / 1e18, "BOOM");
            });
          let Current_ROI = await bondingDepository
            .getBondTermCurrentROIByID(i)
            .then((res) => {
              if (parseInt(res._hex, 16) > maxROI)
                setMaxROI(parseInt(res._hex, 16));
              return priceFormater(parseInt(res._hex, 16) / 100, "%");
            });
          // ------------------------------------------------ setBondingTableDetails
          setBondingTableDetails((bondingTableDetails) => [
            ...bondingTableDetails,
            {
              bondingPrice:
                Asset_Bonded === "WETH"
                  ? Token_Price +
                    "/" +
                    Just_Token_Price * priceFetcherDetails.priceInUSDC +
                    "USDC"
                  : Just_Token_Price * priceFetcherDetails.priceInWETH +
                    "WETH /" +
                    Token_Price +
                    "USDC",
              assetsBounded: Asset_Bonded,
              tokenPrice: Token_Price,
              vestingTerm: Vesting_term,
              totalAmount: Total_Amount,
              amountLeft: Amount_Left,
              currentROI: Current_ROI,
            },
          ]);
        }

      //------------------------------------------------------------------- useEffect
      // setBondingDepositoryDetails({});
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  //------------------------------------------------------------------- BondModel >>>>>>>>>>>
  let [isBondOpen, setIsBondOpen] = React.useState(false);
  const [bondDetails, setBondDetails] = React.useState({
    index: "",
    bondingPrice: "",
    vestingTerm: "",
    amountLeft: "",
  });
  // ------------------------------------------------------------------- handleBondPopup
  const handleBondPopup = async (index) => {
    if (bondingTableDetails[index].assetsBounded === "WETH") {
      if (WETHContractDetails.isAllowanceAvailable) {
        setBondDetails({
          index: index,
          bondingPrice: bondingTableDetails[index].bondingPrice,
          tokenPrice: bondingTableDetails[index].tokenPrice,
          balanceInUserWallet:
            bondingTableDetails[index].assetsBounded === "WETH"
              ? priceFormater(WETHContractDetails.balanceofUserInWETH, "WETH")
              : priceFormater(USDCContractDetails.balanceofUserInUSDC, "USDC"),
          vestingTerm: bondingTableDetails[index].vestingTerm,
          amountTotal: bondingTableDetails[index].totalAmount,
          amountLeft: bondingTableDetails[index].amountLeft,
          currentROI: bondingTableDetails[index].currentROI,
          assetToBoundType: bondingTableDetails[0].assetsBounded,
          marketPrice: priceFetcherDetails.marketPrice,
        });
        setIsBondOpen(true);
      } else {
        /* global BigInt */
        WETHContract.approve(BondingDepositoryAddress, BigInt(20000000 * 1e18));
      }
    } else if (bondingTableDetails[index].assetsBounded === "USDC") {
      if (USDCContractDetails.isAllowanceAvailable) {
        setBondDetails({
          index: index,
          bondingPrice: bondingTableDetails[index].bondingPrice,
          tokenPrice: bondingTableDetails[index].tokenPrice,
          balanceInUserWallet:
            bondingTableDetails[index].assetsBounded === "WETH"
              ? priceFormater(WETHContractDetails.balanceofUserInWETH, "WETH")
              : priceFormater(USDCContractDetails.balanceofUserInUSDC, "USDC"),
          vestingTerm: bondingTableDetails[index].vestingTerm,
          amountTotal: bondingTableDetails[index].totalAmount,
          amountLeft: bondingTableDetails[index].amountLeft,
          currentROI: bondingTableDetails[index].currentROI,
          assetToBoundType: bondingTableDetails[0].assetsBounded,
          marketPrice: priceFetcherDetails.marketPrice,
        });
        setIsBondOpen(true);
      } else {
        USDCContract.approve(BondingDepositoryAddress, BigInt(2000000000 * 1e18));
      }
    } else {
      return;
    }
  };
  //------------------------------------------------------------------- handlePurchaseBond
  const purchaseBond = async (index, tokensToBond) => {
    // console.log("purchase bond index :", index, "& Bond:", tokensToBond);
    try {
      await bondingDepository
        .purchaseBond(index, tokensToBond)
        .then((res) => {
          console.log("purchase bond index : ", index, "& Bond : ", tokensToBond)

          console.log("Res:", res);
        });
      setIsBondOpen(false);
    } catch (error) {
      setIsBondOpen(false);
      triggerPopup("Transaction Fail", JSON.stringify(error.error.message));
      // console.log("Error", JSON.stringify(error.error.message));
    }
  };
  //------------------------------------------------------------------- BondModel <<<<<<<<

  //------------------------------------------------------------------- Data
  const statuses = [
    {
      title: "Amount claimed to date",
      value: bondingDepositoryDetails.totalBondsClaimedToDate,
    },
    {
      title: "Amount vesting",
      value: bondingDepositoryDetails.totalBondsVestingNow,
    },
    {
      title: "Active bonds available",
      value: bondingDepositoryDetails.totalBondsAvalibleToBuyNow,
    },
    {
      title: "Total amount available to bond",
      value: bondingDepositoryDetails.bondingDepoTokenBalanceAvalible,
    },
    {
      title: "Current vesting term",
      value: bondingDepositoryDetails.vestingTermByBondID,
    },
    {
      title: "Current bonding ROI",
      value: loadingTableRec
        ? maxROI
          ? priceFormater(maxROI / 100, "%")
          : "Loading..."
        : "No Data!",
    },
  ];
  // ------------------------------------------------------------------------------ useEffect
  const [signerState, updateSignerState] = React.useState(false); // useEffect cause rander twice so I use this technique to handle it
  React.useEffect(() => {
    if (!signer) return;
    if (!signerState) {
      updateSignerState(true);
      (async function () {
        fetchBondingDepositoryDetails();
        fetchBondingTableDetails();
        fetchWETHDetails();
        fetchUSDCDetails();
      })();
    }
  }, [signer]);
  return (
    <React.Fragment>
      <BondingPopup
        isBondOpen={isBondOpen}
        setIsBondOpen={setIsBondOpen}
        bondDetails={bondDetails}
        purchaseBond={purchaseBond}
      />
      <Sidebar
        user={user}
        network={network}
        onConnectWallet={onConnectWallet}
      />
      {/* cards */}
      <div className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
            {statuses.map((status, index) => (
              <div className="flex justify-center items-center">
                <span className="p-6 m-2 w-full  bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-green-100 hover:text-white  rounded-lg shadow hover:shadow-md transition duration-300">
                  <div className="flex items-center justify-between ">
                    <h2 className="text-xl font-bold text-gray-700">
                      {status.title}
                    </h2>
                    <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                      <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                    </div>
                  </div>
                  <h6 className="text-xl font-bold text-gray-700">
                    {status.value}
                  </h6>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* description */}
      <h2 className="px-10 text-lg font-normal dark:text-gray-700">
        <p>
          <span className="font-semibold">Description: </span>
          Purchasing or claiming the bond is not taxed. Purchased bonds claim
          rewards at full face value from the moment of purchase. You need to
          hold tokens in wallet (purchase them first in the market) to bond -
          maximum bonding amount = 5x of amount held in wallet
        </p>
      </h2>
      {/* table */}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Bonding Terms
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead className="bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-gray-100">
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold  uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Bonding price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Asset bonded
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Token price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Vesting term
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Total amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Amount Left
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Current ROI
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      {""}
                    </th>
                  </tr>
                </thead>
                {console.log("BondingTableDetailsLength : ",bondingTableDetails.length)}
                {bondingTableDetails.length > 0 ? (
                  <tbody className="text-gray-700 bg-white">
                    {bondingTableDetails.map((wallet, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">{index + 1}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {wallet.bondingPrice}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {wallet.assetsBounded}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {wallet.tokenPrice}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {wallet.vestingTerm}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {wallet.totalAmount}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {wallet.amountLeft}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {wallet.currentROI}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <button
                              onClick={() => handleBondPopup(index)}
                              className="relative inline-block px-6 py-1.5 font-medium text-green-100 leading-tight"
                            >
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"
                              ></span>
                              <span className="relative">Bond</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <tbody className="text-gray-700 bg-white">
                    <tr key={432}>
                      <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                        <p className="whitespace-no-wrap"></p>
                      </td>
                      <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                        <p className="whitespace-no-wrap">
                          {loadingTableRec ? "Loading..." : "No Data!"}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                        <p className="whitespace-no-wrap"></p>
                      </td>
                      <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                        <p className="whitespace-no-wrap"></p>
                      </td>
                      <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                        <p className="whitespace-no-wrap"></p>
                      </td>
                      <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                        <p className="whitespace-no-wrap"></p>
                      </td>
                      <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                        <p className="whitespace-no-wrap"></p>
                      </td>
                      <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                        <p className="whitespace-no-wrap"></p>
                      </td>
                      <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                        <p className="whitespace-no-wrap"></p>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
              {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Bonding;

import React from "react";
import { ethers } from "ethers";
import Sidebar from "./sub-components/Sidebar";
import { TestCapTreasuryAddress } from "./../contract/addresses";
import { TestCapTreasuryAbi } from "./../contract/testCapTreasuryAbi";

function Treasury({ user, signer, network, onConnectWallet }) {
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
  let testCapitalTreasury;
  if (signer) {
    testCapitalTreasury = new ethers.Contract(
      TestCapTreasuryAddress,
      TestCapTreasuryAbi,
      signer
    );
  }
  const [testCapTreasuryDetails, setTestCapTreasuryDetails] = React.useState({
    treasuryValue: "",
    numberOfAssets: "",
  });
  // Fetch Test Capital Details -----------------------------------------------------------------------------
  const fetchTestCapTreasuryDetails = async () => {
    try {
      const treasuryValue = await testCapitalTreasury
        .currentTreasuryValue()
        .then((res) => {
          return (parseInt(res._hex, 16) / 1e18)
            .toFixed(0)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        });
      const getLastIndexNumber = await testCapitalTreasury
        .getLastIndexNumber()
        .then((res) => {
          console.log("getLastIndexNumber", parseInt(res._hex, 16));
          return parseInt(res._hex, 16)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        });

      let numberOfAssets = 0;
      for (let i = 0; i <= getLastIndexNumber; i++)
        if (await testCapitalTreasury.getTreasuryAssetIsIncludedById(0))
          numberOfAssets += 1;
      setTestCapTreasuryDetails({
        treasuryValue: treasuryValue,
        numberOfAssets: numberOfAssets,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // Fetch Test Capital Details -----------------------------------------------------------------------------
  const [assets, setAssets] = React.useState([]);
  const fetchTestCapTreasuryTableDetails = async () => {
    try {
      const getLastIndexNumber = await testCapitalTreasury
        .getLastIndexNumber()
        .then((res) => {
          return parseInt(res._hex, 16);
        });
      console.log("getLastIndexNumber", getLastIndexNumber);
      setAssets([]);
      // Change <= to <
      for (let i = 0; i <= getLastIndexNumber; i++)
        if (await testCapitalTreasury.getTreasuryAssetIsIncludedById(i)) {
          const assetSymbol =
            await testCapitalTreasury.getTreasuryAssetNameById(i);
          const chainName = await testCapitalTreasury
            .getTreasuryAssetChainNameById(i)
            .then((res) => {
              return Number.isNaN(parseInt(res._hex, 16))
                ? ""
                : parseInt(res._hex, 16) / 1e18;
            });
          const quantity = await testCapitalTreasury
            .getTreasuryAssetQuantityById(i)
            .then((res) => {
              return parseInt(res._hex, 16) / 1e18;
            });
          const priceInEth = await testCapitalTreasury
            .getTreasuryAssetPriceInWETHById(i)
            .then((res) => {
              return parseInt(res._hex, 16) / 1e18;
            });
          const priceInUSDC = await testCapitalTreasury
            .getTreasuryAssetPriceInUSDCById(i)
            .then((res) => {
              return parseInt(res._hex, 16) / 1e18;
            });
          const valueInEth = await testCapitalTreasury
            .getTreasuryAssetValueInWETHById(i)
            .then((res) => {
              return parseInt(res._hex, 16) / 1e18;
            });
          const valueInUSDC = await testCapitalTreasury
            .getTreasuryAssetValueInUSDCById(i)
            .then((res) => {
              return parseInt(res._hex, 16) / 1e18;
            });
          // ----------------------------------------------------------------
          setAssets((assets) => [
            ...assets,
            {
              assetSymbol: assetSymbol,
              chainName: chainName,
              quantity: quantity,
              priceInEth: priceInEth,
              priceInUSDC: priceInUSDC,
              valueInEth: valueInEth,
              valueInUSDC: valueInUSDC,
            },
          ]);
        }
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  // useEffect ----------------------------------------------------------------------------------------------
  const [signerState, updateSignerState] = React.useState(false); // useEffect cause rander twice so I use this technique to handle it
  React.useEffect(() => {
    if (signer) {
      if (!signerState) {
        updateSignerState(true);
        console.log("I am called 🤯");
        fetchTestCapTreasuryDetails();
        fetchTestCapTreasuryTableDetails();
      }
    }
  }, [signer]);

  return (
    <React.Fragment>
      <Sidebar
        user={user}
        onConnectWallet={onConnectWallet}
        network={network}
      />
      <h2 className="my-4 px-8 text-4xl font-semibold dark:text-gray-700">
        <p>
          Total Treasury Value:{" "}
          <span className="text-4xl">
            {testCapTreasuryDetails.treasuryValue}
          </span>
        </p>
        <p className="text-xl font-normal">
          Number of assets :{" "}
          <span className="text-lg">
            {testCapTreasuryDetails.numberOfAssets}
          </span>
        </p>
      </h2>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Treasury Assets
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
                      Asset
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Chain
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Price in ETH
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Price in USDT
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Value in ETH
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Value in USDT
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 bg-white">
                  {assets.length > 0 &&
                    assets.map((asset, index) => {
                      return (
                        <tr>
                          {/* {console.log("I am Asset:", asset)} */}
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">{index + 1}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {asset.assetSymbol}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {asset.chainName}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {priceFormater(asset.quantity, "")}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {priceFormater(asset.priceInEth, "ETH")}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {priceFormater(asset.priceInUSDC, "USDC")}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {priceFormater(asset.valueInEth, "")}
                              {console.log("Value in ETH:", asset.valueInEth)}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {priceFormater(asset.valueInUSDC, "")}
                              {console.log("Value in ETH:", asset.valueInUSDC)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
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

export default Treasury;

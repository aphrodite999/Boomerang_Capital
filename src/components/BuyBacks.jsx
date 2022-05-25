import React from "react";
import { ethers } from "ethers";
import Sidebar from "./sub-components/Sidebar";
import { MarketInterventionLedgerAddress } from "./../contract/addresses";
import { MarketInterventionLedgerAbi } from "./../contract/marketInterventionLedgerAbi";

function BuyBacks({ user, signer, network, onConnectWallet }) {
  let marketInterventionLedger;
  if (signer) {
    marketInterventionLedger = new ethers.Contract(
      MarketInterventionLedgerAddress,
      MarketInterventionLedgerAbi,
      signer
    );
  }
  // --------------------------------------------------------------------- useState
  const [assets, setAssets] = React.useState([]);
  // --------------------------------------------------------------------- fetchTableRecords
  const fetchTableRecords = async () => {
    try {
      const lastAssetIndex = await marketInterventionLedger
        .getLastInterventionID()
        .then((res) => {
          console.log("Last Asset", parseInt(res._hex, 16));
          return parseInt(res._hex, 16);
        });
      for (let i = 0; i <= lastAssetIndex; i++) {
        let dateAndTime = await marketInterventionLedger
          .getInterventionTimeStampByID(i)
          .then((res) => {
            let seconds = Number(parseInt(res._hex, 16));
            const dateObject = new Date(seconds * 1000);
            return dateObject.toLocaleString("en-US", {
              timeZoneName:"short",
              timeZone: "UTC",
            });
            // convert second into days, hours, and minutes.
            // let y = Math.floor(seconds / 31536000);
            // let mo = Math.floor((seconds % 31536000) / 2628000);
            // let d = Math.floor(((seconds % 31536000) % 2628000) / 86400);
            // let h = Math.floor((seconds % (3600 * 24)) / 3600);
            // let m = Math.floor((seconds % 3600) / 60);
            // let s = Math.floor(seconds % 60);

            // let yDisplay = y > 0 ? y + (y === 1 ? " year, " : " years, ") : "";
            // let moDisplay =
            //   mo > 0 ? mo + (mo === 1 ? " month, " : " months, ") : "";
            // let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
            // let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
            // let mDisplay =
            //   m > 0 ? m + (m === 1 ? " minute " : " minutes, ") : "";
            // let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds ") : "";
            // return (
            //   yDisplay + moDisplay + dDisplay + hDisplay + mDisplay + sDisplay
            // );
          });
        let type = await marketInterventionLedger
          .getInterventionIsBuybackByID(i)
          .then((res) => (res ? "Buyback" : "Sellback"));
        let numOfTokens = await marketInterventionLedger
          .getInterventionNumberOFTokensByID(i)
          .then((res) => {
            return parseInt(res._hex, 16);
          });
        let valueInETH = await marketInterventionLedger
          .getInterventionValueInETHByID(i)
          .then((res) => {
            return parseInt(res._hex, 16);
          });
        let valueInUSDC = await marketInterventionLedger
          .getInterventionValueInUSDCByID(i)
          .then((res) => {
            return parseInt(res._hex, 16);
          });
        // --------------------------------------------------------------------- setState
        setAssets((assets) => [
          ...assets,
          {
            dateAndTime: dateAndTime,
            type: type,
            numOfCoins: numOfTokens,
            ETHValue: valueInETH,
            USDCValue: valueInUSDC,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("assets:", assets);
  // --------------------------------------------------------------------- useEffect
  const [signerState, updateSignerState] = React.useState(false); // useEffect cause rander twice so I use this technique to handle it
  React.useEffect(() => {
    if (!signer) return;
    if (!signerState) {
      updateSignerState(true);
      console.log("call from useEffect!");
      fetchTableRecords();
    }
  }, [signer]);

  return (
    <React.Fragment>
      <Sidebar
        user={user}
        network={network}
        onConnectWallet={onConnectWallet}
      />
      {/* table */}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              All Buyback Transactions
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
                      Date and Time of purchase
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Type (Buyback / Sellback)
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Number of coins
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      ETH Value
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      USDC Value
                    </th>
                  </tr>
                </thead>
                {assets.length > 0 ? (
                  <tbody className="text-gray-700 bg-white">
                    {assets.map((record, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">{index + 1}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {record.dateAndTime}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">{record.type}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {record.numOfCoins}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {record.ETHValue}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {record.USDCValue}
                            </p>
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
                        <p className="whitespace-no-wrap">Loading...</p>
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BuyBacks;

import React from "react";
import Sidebar from "./sub-components/Sidebar";

function Addresses({ user, network, onConnectWallet }) {
  const assets = [
    {
      name: "Boomerang Capital",
      contractAddress: "0xFa46Ed717D9e992BEb6652A52c1E5D6916a2654d",
      walletAddress: "N/A",
    },
    {
      name: "BoomDividendTracker",
      contractAddress: "0x894a882D6C77E1a3d9D9f58605677737a81e6895",
      walletAddress: "N/A",
    },
    {
      name: "BoomTaxManager",
      contractAddress: "0x845F58ae5539ea34Fdf8C31E909CCCE3cdE5822F",
      walletAddress: "N/A",
    },
    {
      name: "BoomTreasury",
      contractAddress: "0x540cFB77703703F55dB8A9942CbbAa715928c8e1",
      walletAddress: "0xAF6EA743b2d5A6128417200c117D838b531e671e",
    },
    {
      name: "BoomBondDepo",
      contractAddress: "0x86c71a1Fd390346998beF4ee18Cd57C15e5d0d51",
      walletAddress: "0xAF6EA743b2d5A6128417200c117D838b531e671e",
    },
    {
      name: "BoomSafeLeverage",
      contractAddress: "0xA72aa1A161Cb7F63a7B864c71695fD57b5cC49F6",
      walletAddress: "0xAF6EA743b2d5A6128417200c117D838b531e671e",
    },
    {
      name: "Marketing Wallet",
      contractAddress: "N/A",
      walletAddress: "0x76A44F4EEb533018847feA0a6d014766Eeb92ef6",
    },
    {
      name: "Liquidity Wallet",
      contractAddress: "N/A",
      walletAddress: "0xAF6EA743b2d5A6128417200c117D838b531e671e",
    },
    {
      name: "Deployer",
      contractAddress: "0x0A185FE59bfb0963D05D0987A80D6b7fACe2B2D0",
      walletAddress: "N/A",
    },
    {
      name: "UniswapPair",
      contractAddress: "0x80e36E89be77003A3735fbcd596F6044eDbd29A0",
      walletAddress: "N/A",
    },
    {
      name: "UniswapV2Router",
      contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      walletAddress: "N/A",
    },
    {
      name: "WETH",
      contractAddress: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
      walletAddress: "N/A",
    },
    {
      name: "USDC",
      contractAddress: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
      walletAddress: "N/A",
    },
  ];
  return (
    <React.Fragment>
      <Sidebar
        user={user}
        network={network}
        onConnectWallet={onConnectWallet}
      />
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
                      Item
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Contract Address
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#35cff270] text-left text-xs font-semibold uppercase tracking-wider">
                      Wallet Address
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 bg-white">
                  {assets.length > 0 &&
                    assets.map((asset, index) => {
                      return (
                        <tr>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">{index + 1}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">{asset.name}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {asset.contractAddress}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap">
                              {asset.walletAddress}
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

export default Addresses;

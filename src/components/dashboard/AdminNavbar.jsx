import React from "react";
import { useLocation } from "react-router-dom";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { RiSignalWifiErrorLine } from "react-icons/ri";

export default function AdminNavbar({
  showSidebar,
  setShowSidebar,
  user,
  network,
  onConnectWallet,
}) {
  const location = useLocation().pathname;
  console.log("nav rander");
  return (
    <nav className="bg-light-blue-500 py-6 px-3">
      <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
        <div className="md:hidden">
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            iconOnly
            rounded
            ripple="light"
            onClick={() => setShowSidebar("left-0")}
          >
            <Icon name="menu" size="2xl" color="white" />
          </Button>
          <div
            className={`absolute top-2 md:hidden ${
              showSidebar === "left-0" ? "left-64" : "-left-64"
            } z-50 transition-all duration-300`}
          >
            <Button
              color="transparent"
              buttonType="link"
              size="lg"
              iconOnly
              rounded
              ripple="light"
              onClick={() => setShowSidebar("-left-64")}
            >
              <Icon name="close" size="2xl" color="white" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <h4 className="uppercase text-white text-sm tracking-wider mt-1">
            {location === "/"
              ? "DASHBOARD"
              : location.toUpperCase().replace("/", "")}
          </h4>

          <div className="flex">
            <div className="-mr-4 ml-6">
              {/* Connect wallet */}
              {typeof window.ethereum !== "undefined" ? (
                <div className="flex">
                  {network.chainId !== 4 ? (
                    <div className="flex items-center bg-black transition-colors text-yellow-500 font-normal py-2 px-4 mr-2 rounded">
                      <RiSignalWifiErrorLine className="mr-2"/>
                      Please Connect to Rinkeby Testnet
                    </div>
                  ) : (
                    <></>
                  )}

                  <button
                    onClick={onConnectWallet}
                    className="bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from transition-colors font-bold py-2 px-4 rounded"
                  >
                    {user ? user : "Connect MetaMask"}
                  </button>
                </div>
              ) : (
                <></>
              )}
              {/* Install Metamask */}
              {typeof window.ethereum === "undefined" ? (
                <a href="https://metamask.io/" target="_blank">
                <button className="bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from transition-colors font-bold py-2 px-4 rounded">
                  Install Metamask
                </button>
                </a>
              ) : (
                // </a>
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ethers } from "ethers";
import Bonding from "./components/Bonding";
import BuyBacks from "./components/BuyBacks";
import Calculator from "./components/Calculator";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Portfolio from "./components/Portfolio";
import Treasury from "./components/Treasury";
import TaxesAndZones from "./components/TaxesAndZones";
import Options from "./components/Options";
import Leverage from "./components/Leverage";
import Docs from "./components/Docs";
import MessagePopup from "./components/sub-components/MessagePopup";
import Addresses from "./components/Addresses";
// import Sidebar from "./components/sub-components/Sidebar";

export default function App() {
  const location = useLocation().pathname;
  const [user, setUser] = useState("");
  const [signer, setSigner] = useState("");
  const [network, setNetwork] = useState("");
  // Message Popup
  const [popup, setPopup] = useState({
    isOpen: false,
    heading: "",
    message: "",
  });
  const handlePopupState = (popupState) => {
    setPopup(popupState, "", "");
  };
  const triggerPopup = (heading, message) => {
    setPopup({ isOpen: true, heading, message });
  };
  // Connect Wallet
  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask");
    }
    else {
      console.log("We have ethereum object", ethereum);
    }

    try {
      // await window.ethereum.enable();
      // const accounts = await window.ethereum.send("eth_requestAccounts");
      // setUser(accounts?.result[0]);
      await window.ethereum.enable();
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setUser(account);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  // Get Signer
  useEffect(() => {
    async function fetchData() {
      if (location === "/") return;
      try {
        const _user = await window.ethereum.send("eth_requestAccounts");
        setUser(_user?.result[0]);
        const _signer = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(_signer.getSigner());

        const network = await _signer.getNetwork();
        setNetwork(network);
        // Detect change in Metamask account
        if (window.ethereum) {
          window.ethereum.on("chainChanged", async () => {
            const _user = await window.ethereum.send("eth_requestAccounts");
            setUser(_user?.result[0]);
            const _signer = new ethers.providers.Web3Provider(window.ethereum);
            setSigner(_signer.getSigner());

            const network = await _signer.getNetwork();
            setNetwork(network);
          });
          window.ethereum.on("accountsChanged", async () => {
            const _user = await window.ethereum.send("eth_requestAccounts");
            setUser(_user?.result[0]);
            const _signer = new ethers.providers.Web3Provider(window.ethereum);
            setSigner(_signer.getSigner());
          });
        }
        // const _user = await window.ethereum.send("eth_requestAccounts");
        // setUser(_user?.result[0]);
        // const _signer = new ethers.providers.Web3Provider(window.ethereum);
        // setSigner(_signer.getSigner());
        // const network = await _signer.getNetwork();
        // setNetwork(network);
      } catch (error) {
        console.log("Error:", error.message);
      }
    }
    fetchData();
    console.log("I am AppJs and I am running");
  }, [location]);

  return (
    <>
      {popup.isOpen && (
        <MessagePopup
          isOpen={popup.isOpen}
          heading={popup.heading}
          message={popup.message}
          handlePopup={handlePopupState}
        />
      )}
      <div className="md:ml-64">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={user}
                signer={signer}
                network={network}
                onConnectWallet={connectWallet}
              />
            }
          />
          <Route
            path="/portfolio"
            element={
              <Portfolio
                user={user}
                signer={signer}
                network={network}
                onConnectWallet={connectWallet}
              />
            }
          />
          <Route
            path="/taxes-and-zones"
            element={
              <TaxesAndZones
                user={user}
                signer={signer}
                network={network}
                onConnectWallet={connectWallet}
                // data={taxesAndZones}
              />
            }
          />
          <Route
            path="/treasury"
            element={
              <Treasury
                user={user}
                signer={signer}
                network={network}
                onConnectWallet={connectWallet}
              />
            }
          />
          <Route
            path="/bonding"
            element={
              <Bonding
                user={user}
                signer={signer}
                network={network}
                triggerPopup={triggerPopup}
                onConnectWallet={connectWallet}
              />
            }
          />
          <Route
            path="/leverage"
            element={
              <Leverage
                user={user}
                signer={signer}
                network={network}
                onConnectWallet={connectWallet}
              />
            }
          />
          <Route
            path="/options"
            element={
              <Options
                user={user}
                signer={signer}
                network={network}
                onConnectWallet={connectWallet}
              />
            }
          />
          <Route
            path="/calculator"
            element={
              <Calculator
                user={user}
                signer={signer}
                network={network}
                onConnectWallet={connectWallet}
              />
            }
          />
          <Route
            path="/buy-backs"
            element={
              <BuyBacks
                user={user}
                signer={signer}
                network={network}
                onConnectWallet={connectWallet}
              />
            }
          />
          <Route
            path="/docs"
            element={
              <Docs
                user={user}
                network={network}
                onConnectWallet={connectWallet}
              />
            }
          />
          <Route
            path="/addresses"
            element={
              <Addresses
                user={user}
                network={network}
                onConnectWallet={connectWallet}
              />
            }
          />
        </Routes>
      </div>
      {/* <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes> */}
    </>
  );
}

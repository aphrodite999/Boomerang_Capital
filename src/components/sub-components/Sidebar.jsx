import { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminNavbar from "../dashboard/AdminNavbar";
// images
import Logo from "./../../assets/icons/logo_round.png";
import LogoText from "./../../assets/icons/logo_text.png";
import Uniswap from "./../../assets/images/uniswap_logo.svg.png";
// icons
import { GoDashboard } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { GiOpenTreasureChest, GiShieldBounces } from "react-icons/gi";
import { AiOutlineCalculator } from "react-icons/ai";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { FaHandHoldingUsd, FaBalanceScaleLeft } from "react-icons/fa";
import { SiReadthedocs } from "react-icons/si";
import { IoOptions, IoDocumentTextOutline } from "react-icons/io5";

const Sidebar = ({ user, network, onConnectWallet }) => {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  return (
    <>
      <AdminNavbar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        user={user}
        network={network}
        onConnectWallet={onConnectWallet}
      />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-black w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <div className="flex justify-between items-center">
            <img src={Logo} alt="Logo" width="50" />
            <img src={LogoText} alt="Logo" width="170" />
          </div>

          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              {/* Dashboard */}
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/dashboard"
                  exact
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <GoDashboard className="text-2xl" />
                  Dashboard
                </NavLink>
              </li>
              {/* Portfolio */}
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/portfolio"
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <RiTeamLine className="text-2xl" />
                  Portfolio
                </NavLink>
              </li>
              {/* Taxes and Zones */}
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/taxes-and-zones"
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <SiReadthedocs className="text-2xl" />
                  Taxes and Zones
                </NavLink>
              </li>
              {/* Treasury */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/treasury"
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <GiOpenTreasureChest className="text-2xl" />
                  Treasury
                </NavLink>
              </li>
              {/* Bonding */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/bonding"
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <GiShieldBounces className="text-2xl" />
                  Bonding
                </NavLink>
              </li>
              {/* Leverage */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/leverage"
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <FaBalanceScaleLeft className="text-2xl" />
                  Leverage
                </NavLink>
              </li>
              {/* Options */}
              {/* <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/options"
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <IoOptions className="text-2xl" />
                  Options
                </NavLink>
              </li> */}
              {/* Calculator */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/calculator"
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <AiOutlineCalculator className="text-2xl" />
                  Calculator
                </NavLink>
              </li>
              {/* Buybacks */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/buy-backs"
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <FaHandHoldingUsd className="text-2xl" />
                  Buybacks
                </NavLink>
              </li>
              {/* Landing Page */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/"
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <MdOutlineMapsHomeWork className="text-2xl" />
                  Landing Page
                </NavLink>
              </li>
              {/* Docs */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/docs"
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <IoDocumentTextOutline className="text-2xl" />
                  Docs
                </NavLink>
              </li>
              {/* Addresses */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/addresses"
                  className="flex items-center gap-4 text-sm hover:bg-link font-light px-4 py-3 rounded-lg"
                >
                  <IoDocumentTextOutline className="text-2xl" />
                  Addresses
                </NavLink>
              </li>
              {/* Links */}
              <li className="rounded-lg mb-2 ">
                <span className="flex items-center gap-4 text-sm text-link font-normal px-4 py-3 rounded-lg ">
                  Links
                </span>
              </li>
              {/* Buy on Uniswap */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/"
                  className="flex items-center gap-4 text-sm font-normal hover:bg-link px-4 py-3 rounded-lg "
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img
                    src={Uniswap}
                    alt="Uniswap"
                    width="20"
                    className="bg-white rounded-full hover:bg-link"
                  />
                  Buy on Uniswap
                </NavLink>
              </li>
              {/* Buy on Uniswap */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/"
                  className="flex items-center gap-4 text-sm font-normal hover:bg-link px-4 py-3 rounded-lg "
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img
                    src={Uniswap}
                    alt="Uniswap"
                    width="20"
                    className="bg-white rounded-full hover:bg-link"
                  />
                  Chart on DexTools
                </NavLink>
              </li>
              {/* Buy on Uniswap */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/"
                  className="flex items-center gap-4 text-sm font-normal hover:bg-link px-4 py-3 rounded-lg "
                  // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img
                    src={Uniswap}
                    alt="Uniswap"
                    width="20"
                    className="bg-white rounded-full hover:bg-link"
                  />
                  Chart on DexScreener
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

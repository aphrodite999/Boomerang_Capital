import React from "react";
import { Link } from "react-router-dom";
// Images
import rocket from "./../../assets/icons/logo_transparent.png";
import uniswap from "./../../assets/images/uniswap_logo.svg.png";
// Icons
import { MdDashboard } from "react-icons/md";

const HeroSection = () => {
  // const [show, setShow] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-28 h-[calc(100vh-108px)]">
      {/* <!-- hero text --> */}
      <div className="hero-text col-span-6">
        <div className="flex items-center justify-center lg:justify-end px-12 lg:px-24">
          <div className="text-center lg:text-right">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-normal italic ">
              Boomerang
              <br />
              Capital
            </h2>
            <p className="my-4">farm-trade-seed-as-a-service</p>
            <button className="bg-white hover:bg-link text-black hover:text-white text-lg font-semibold py-2 px-4 mb-4 rounded-full inline-flex items-center">
              <div className="h-full my-auto mr-2">
                <img src={uniswap} alt="Uniswap Logo" width="24" height="24" />
              </div>
              Buy EXPO on Uniswap
            </button>
            <br />
            <div>
              <Link to="/dashboard">
                <button className="bg-white hover:bg-link text-black hover:text-white text-lg font-semibold py-2 px-4 rounded-full inline-flex items-center">
                  <MdDashboard className="mr-2" />
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- hero image --> */}
      <div className="col-span-6">
        <img
          src={rocket}
          alt="rocket"
          className="w-full lg:w-10/12 px-10 md:px-8"
        />
      </div>
    </div>
  );
};

export default HeroSection;

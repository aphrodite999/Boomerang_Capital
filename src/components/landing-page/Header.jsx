import React, { useState, useEffect } from "react";
import { FaTelegramPlane, FaMediumM, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import Logo from "./../../assets/icons/logo_round.png";

function Header() {
  const [sticky, setSticky] = useState(false);
  const [hidden, setHidden] = useState(true);
  // Add Background on scroll bottom
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) setSticky(true);
      else setSticky(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  // Show Hide Navbar on Scroll
  window.onscroll = function (e) {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    scrollY <= this.lastScroll ? setHidden(true) : setHidden(false);
    this.lastScroll = scrollY;
  };

  return (
    <React.Fragment>
      <div
        className={`flex justify-between items-center px-16 py-5 fixed top-0 w-full z-50 ${
          sticky && "bg-black transition"
        } ${hidden ? "" : "hidden"}
        `}
      >
        <img src={Logo} alt="logo" width="70" className="hidden sm:block" />
        <ul className="flex items-center">
          <li className="text-white hover:text-link cursor-pointer pr-7">
            <FaTelegramPlane className="text-4xl " />
          </li>
          <li className="text-white hover:text-link cursor-pointer pr-7">
            <FaMediumM className="text-4xl " />
          </li>
          <li className="text-white hover:text-link cursor-pointer pr-7">
            <FaTwitter className="text-4xl " />
          </li>
          <li className="text-white hover:text-link cursor-pointer pr-7">
            <MdEmail className="text-4xl " />
          </li>
          <li className="text-white hover:text-link cursor-pointer pr-7">
            <RiOrganizationChart className="text-4xl " />
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Header;

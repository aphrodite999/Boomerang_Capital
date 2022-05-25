import React from "react";
import { FaTelegramPlane, FaMediumM, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";

function Footer() {
  return (
    <div className="flex justify-between items-center px-16 py-7 w-full bg-black">
      <ul className="flex items-center w-60 ">
        <li className="text-white hover:text-link cursor-pointer">
          <FaTelegramPlane className="text-4xl mr-7" />
        </li>
        <li className="text-white hover:text-link cursor-pointer">
          <FaMediumM className="text-4xl mr-7" />
        </li>
        <li className="text-white hover:text-link cursor-pointer">
          <FaTwitter className="text-4xl mr-7" />
        </li>
        <li className="text-white hover:text-link cursor-pointer">
          <MdEmail className="text-4xl mr-7" />
        </li>
        <li className="text-white hover:text-link cursor-pointer">
          <RiOrganizationChart className="text-4xl mr-7" />
        </li>
      </ul>
      <p>Copyright © 2022. All Rights Reserved.</p>
    </div>

  );
}

export default Footer;

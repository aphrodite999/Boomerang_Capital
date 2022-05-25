import React from "react";
import TokenomicsImg from "./../../assets/images/tokenomics.png";

function Tokenomics() {
  return (
    <div className="mx-auto container">
      <div className="px-7 lg:px-14 py-14 lg:py-24">
        <h2 className="title-font mb-2 text-4xl font-extrabold leading-10 tracking-tight text-center sm:text-5xl sm:leading-none md:text-6xl">
          Tokenomics
        </h2>
        <img
          src={TokenomicsImg}
          alt="how it works"
          className="pt-10 lg:pt-20 w-full lg:w-8/12 mx-auto"
        />
      </div>
    </div>
  );
}

export default Tokenomics;

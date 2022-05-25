import React from "react";
import SecImage from "./../../assets/images/how-it-work.png";

function HowItWork() {
  return (
    <div className="mx-auto container">
      <div className="px-7 lg:px-14 py-7 lg:py-14">
        <h2 className="title-font mb-2 text-4xl font-extrabold leading-10 tracking-tight text-center sm:text-5xl sm:leading-none md:text-6xl">
          How it works?
        </h2>
        <img src={SecImage} alt="how it works" className="pt-10 lg:pt-20" />
      </div>
    </div>
  );
}

export default HowItWork;

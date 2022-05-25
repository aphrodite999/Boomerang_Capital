import React from "react";
import RoadmapImg from "./../../assets/images/roadmap.png";

function Roadmap() {
  return (
    <div className="mx-auto container">
      <div className="px-7 lg:px-14 py-14 lg:py-24">
        <h2 className="title-font mb-2 text-4xl font-extrabold leading-10 tracking-tight text-center sm:text-5xl sm:leading-none md:text-6xl">
          Roadmap
        </h2>
        <img
          src={RoadmapImg}
          alt="how it works"
          className="pt-10 lg:pt-20 mx-auto w-full lg:w-10/12 "
        />
      </div>
    </div>
  );
}

export default Roadmap;

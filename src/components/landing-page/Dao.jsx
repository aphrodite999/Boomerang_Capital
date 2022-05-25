import React from 'react';
import DaoImg from "./../../assets/images/dao.png";

function Dao() {
  return (
    <div className="mx-auto container">
      <div className="px-7 lg:px-14 py-14 lg:py-24">
        <h2 className="title-font mb-2 text-4xl font-extrabold leading-10 tracking-tight text-center sm:text-5xl sm:leading-none md:text-6xl">
          DAO Snapshot Voting
        </h2>
        <img src={DaoImg} alt="dao" className="pt-10 lg:pt-20 mx-auto w-full mg:w-8/12 lg:w-1/2"  />
      </div>
    </div>
  );
}

export default Dao
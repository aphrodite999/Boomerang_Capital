import React from "react";
import OfferImageOne from "./../../assets/images/offer_img_1.png";
import OfferImageTwo from "./../../assets/images/offer_img_2.png";
import OfferImageThree from "./../../assets/images/offer_img_3.png";

function Offering() {
  return (
    <div>
      <section className=" text-gray-200 w-full">
        <div className="w-full mx-auto px-5 py-24 ">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="title-font mb-2 text-4xl font-extrabold leading-10 tracking-tight text-left sm:text-5xl sm:leading-none md:text-6xl">
              Our Offering?
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-base">
              We invest across multiple chains and reward EXPO holders with buy
              reflections and generated profit
            </p>
          </div>
          <div className="flex flex-wrap mx-auto w-full">
            <div className="w-full xl:w-1/3 md:w-1/2 p-4">
              <div className="text-center mt-2 leading-none flex-col justify-center items-center px-12 md:px-16 xl:px-32 w-full">
                <img src={OfferImageOne} alt="offering 1" className="mx-auto" />
                <h3 className="text-xl font-medium title-font my-4">
                  Yield Farming
                </h3>
              </div>
            </div>
            <div className="w-full xl:w-1/3 md:w-1/2 p-4">
              <div className="text-center mt-2 leading-none flex-col justify-center items-center px-12 md:px-16  xl:px-32 w-full">
                <img src={OfferImageTwo} alt="offering 1" className="mx-auto" />
                <h3 className="text-xl font-medium title-font my-4">
                  Seed Investment
                </h3>
              </div>
            </div>
            <div className="w-full xl:w-1/3 md:w-1/2 p-4">
              {/* <div className="border border-gray-300 p-6 rounded-lg"> */}
              <div className="text-center mt-2 leading-none flex-col justify-center items-center px-12 md:px-16  xl:px-32 w-full">
                <img
                  src={OfferImageThree}
                  alt="offering 1"
                  className="mx-auto"
                />
                <h3 className="text-xl font-medium title-font my-4">Trading</h3>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Offering;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  Page,
  Navbar,
  NavbarBackLink,
  BlockTitle,
  BlockHeader,
  List,
  ListItem,
  Range,
} from "konsta/react";

const BondingPopup = ({
  isBondOpen,
  setIsBondOpen,
  bondDetails,
  purchaseBond,
}) => {
  // slider
  const [tokensToBond, setTokensToBond] = useState(0);
  // Formator <<<-------------------------------------------------------------------
  const decimalFormator = (number) => {
    if (number === 0) {
      return 0;
    } else if (number >= 1000) {
      return Number.parseFloat(number).toFixed(0);
    } else if (number >= 1 && number < 1000) {
      return Number.parseFloat(number).toFixed(2);
    } else if (number >= 0.1 && number < 1) {
      return Number.parseFloat(number).toFixed(3);
    } else if (number >= 0.01 && number < 0.1) {
      return Number.parseFloat(number).toFixed(4);
    } else if (number >= 0.001 && number < 0.01) {
      return Number.parseFloat(number).toFixed(5);
    } else if (number >= 0.0001 && number < 0.001) {
      return Number.parseFloat(number).toFixed(6);
    } else if (number >= 0.00001 && number < 0.0001) {
      return Number.parseFloat(number).toFixed(7);
    } else if (number >= 0.000001 && number < 0.00001) {
      return Number.parseFloat(number).toFixed(8);
    } else return number;
  };

  const priceFormater = (number, unit) => {
    let _number = decimalFormator(number);
    return _number === "Loading..."
      ? "Loading..."
      : unit === ""
      ? _number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      : _number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        unit;
  };
  // Formator ---------------------------------------------------------------------->>>
  return (
    <>
      <Transition appear show={isBondOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsBondOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Bonding Price
                </Dialog.Title>
                <div className="mt-2 text-gray-500">
                  <p>Token Price: {bondDetails.tokenPrice}</p>
                  <p>Bonding Price: {bondDetails.bondingPrice}</p>
                  <p>
                    Balance In User Wallet: {bondDetails.balanceInUserWallet}
                  </p>
                  <p>Vesting Term: {bondDetails.vestingTerm}</p>
                  <p>Total Amount: {bondDetails.amountTotal}</p>
                  <p>Amount available to bond: {bondDetails.amountLeft}</p>
                  <p>Current ROI: {bondDetails.currentROI}</p>
                  <p>
                    Price for selected number of Tokens:{" "}
                    {bondDetails.assetToBoundType === "WETH"
                      ? ((tokensToBond * 1e18) / bondDetails.tokenPrice)
                          .toString()
                          .concat(" WETH")
                      : ((tokensToBond * 1e18) / bondDetails.tokenPrice)
                          .toString()
                          .concat(" USDC")}
                  </p>
                  <p>Market Price: {bondDetails.marketPrice}</p>
                </div>
                {/* slider*/}
                <BlockTitle className="text-gray-700">
                  Tokens to Bond:{" "}
                  {parseInt(tokensToBond) > 1
                    ? priceFormater(parseInt(tokensToBond), "Tokens")
                    : priceFormater(parseInt(tokensToBond), "Token")}
                </BlockTitle>
                <List className="m-0 p-0">
                  <ListItem
                    className="text-gray-700 m-0"
                    innerClassName="flex space-x-2"
                    innerChildren={
                      <>
                        <span>0</span>
                        <span
                          className="cursor-pointer bg-primary rounded-full p-1 h-5 w-7 flex justify-center items-center"
                          onClick={
                            tokensToBond > 0 ? (
                              () => setTokensToBond(parseInt(tokensToBond) - 1)
                            ) : (
                              <></>
                            )
                          }
                        >
                          -
                        </span>
                        <Range
                          className="m-0"
                          value={tokensToBond}
                          step={1}
                          min={0}
                          max={parseInt(
                            bondDetails.amountLeft.replaceAll(",", "")
                          )}
                          // max={5000}
                          onChange={(e) => setTokensToBond(e.target.value)}
                        />
                        <span
                          className="cursor-pointer bg-primary rounded-full p-1 h-5 w-7 flex justify-center items-center"
                          onClick={() =>
                            setTokensToBond(parseInt(tokensToBond) + 1)
                          }
                        >
                          +
                        </span>
                        <span>{bondDetails.amountLeft}</span>
                      </>
                    }
                  />
                </List>
                {/* end slider */}
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 mr-2 text-sm font-medium text-blue-900 bg-gradient-to-r from-[#1da0f271] to-[#35cff271] hover:from-[#1da0f271] hover:to-[#35cff271] border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsBondOpen(false)}
                  >
                    Cancel
                  </button>
                  {console.log("bondDetailsIndex : ",bondDetails.index, "tokensToBond : ", tokensToBond)}
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium bg-gradient-to-r ${
                      tokensToBond > 0
                        ? "from-[#1da0f271] to-[#35cff271] hover:from-[#1da0f271] hover:to-[#35cff271] text-blue-900"
                        : "from-gray-500 to-gray-500 text-white"
                    } border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500`}
                    onClick={() =>
                      // tokensToBond > 0 &&
                      purchaseBond(bondDetails.index + 1, tokensToBond)
                    }
                  >
                    Purchase Bond
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default BondingPopup;

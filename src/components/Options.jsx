import React from "react";
import Sidebar from "./sub-components/Sidebar";

function Options({ user, network, onConnectWallet }) {
  const decimalFormator = (number) => {
    if (number === 0) {
      return 0;
    } else if (number >= 1000) {
      return number.toFixed(0);
    } else if (number >= 1 && number < 1000) {
      return number.toFixed(2);
    } else if (number >= 0.1 && number < 1) {
      return number.toFixed(3);
    } else if (number >= 0.01 && number < 0.1) {
      return number.toFixed(4);
    } else if (number >= 0.001 && number < 0.01) {
      return number.toFixed(5);
    } else if (number >= 0.0001 && number < 0.001) {
      return number.toFixed(6);
    } else if (number >= 0.00001 && number < 0.0001) {
      return number.toFixed(7);
    } else if (number >= 0.000001 && number < 0.00001) {
      return number.toFixed(8);
    } else return number;
  };

  const priceFormatter = (number, unit) => {
    let _number = decimalFormator(number);
    return _number === ""
      ? "Loading..."
      : unit === ""
      ? _number
      : _number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        unit;
  };

  console.log("PF 0.003559: ", priceFormatter(0.003559, "USD"));
  console.log("PF 0.5934: ", priceFormatter(0.5934, ""));
  console.log("PF 0.0000023476: ", priceFormatter(0.0000023476, "USD"));
  console.log("PF 143406.14567: ", priceFormatter(106543.14567, "USD"));
  console.log(
    "PF 10980.0000023476: ",
    priceFormatter(109345353553465455645380.0000023476, "USD")
  );

  // const formator = (argument, unit) => {
  //   return argument === ""
  //     ? "Loading..."
  //     : unit === ""
  //     ? argument
  //     : argument.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
  //       " " +
  //       unit;
  // };

  // console.log("Format 0:", decimalFormator(0));
  // console.log("Format 1000:", decimalFormator(1000));
  // console.log("Format 0.1:", decimalFormator(0.1));
  // console.log("Format 0.01:", decimalFormator(0.01));
  // console.log("Format 0.001:", decimalFormator(0.001));
  // console.log("Format 0.0001:", decimalFormator(0.0001));
  // console.log("Format 0.00001:", decimalFormator(0.00001));
  // console.log("Format 0.000001:", decimalFormator(0.000001));
  // console.log("Format 0.0000001:", decimalFormator(0.0000001));
  // console.log("Format 0.00000001:", decimalFormator(0.00000001));
  // console.log("Format 0.000000001:", decimalFormator(0.000000001));
  return (
    <React.Fragment>
      <Sidebar
        user={user}
        network={network}
        onConnectWallet={onConnectWallet}
      />
    </React.Fragment>
  );
}

export default Options;

import React from "react";
import Sidebar from "./sub-components/Sidebar";

function Calculator({ user, network, onConnectWallet }) {
  return (
    <React.Fragment>
      <Sidebar
        user={user}
        network={network}
        onConnectWallet={onConnectWallet}
      />
      <h2 className="pl-12">In Construction</h2>
    </React.Fragment>
  );
}

export default Calculator;

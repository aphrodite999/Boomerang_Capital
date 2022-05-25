import React from "react";
import Sidebar from "./sub-components/Sidebar";

function Docs({ user, network, onConnectWallet }) {
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
export default Docs;

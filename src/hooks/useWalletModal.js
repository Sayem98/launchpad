import React from "react";
import { useState } from "react/cjs/react.production.min";

function useWalletModal() {
  const [open, setOpen] = useState(true);

  const onConnectModalOpen = () => {
    setOpen(true);
  };

  const onConnectModalClose = () => {
    setOpen(false);
  };
  const isConnectModalOpen = () => {
    return open;
  };
  return { onConnectModalOpen, onConnectModalClose, isConnectModalOpen };
}

export default useWalletModal;

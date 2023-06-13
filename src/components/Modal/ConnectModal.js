import React from "react";
import { Modal } from "antd";
import { useWeb3React } from "@web3-react/core";
import { switchNetwork } from "../../utils/web3React";
import DEFAULT_NETWORK_URL from "../../config/network/deafult.network.json";
function ConnectModal({ onConnectModalOpen, open, onConnectModalClose }) {
  const { library } = useWeb3React();

  return (
    <div>
      {" "}
      <Modal
        title="Choose Network"
        centered
        open={open}
        onOk={onConnectModalOpen}
        onCancel={onConnectModalClose}
        width={500}
        footer={null}
      >
        <div className="SwitchNetworkForm_chains__1fTaE">
          {DEFAULT_NETWORK_URL.network.map((item, key) => (
            <div
              className="SwitchNetworkItem_item__1gmeN"
              key={key}
              onClick={() => {
                switchNetwork(library, item.chainId);
                onConnectModalClose();
              }}
            >
              <img
                src={item.logoURI}
                alt={item.name}
                className="SwitchNetworkItem_icon__1Lbfx"
              />
              <div className="SwitchNetworkItem_name__2pWLA">{item.name}</div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default ConnectModal;

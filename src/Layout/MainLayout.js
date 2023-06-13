import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainSection from "../components/MainSection";
import DEFAULT_NETWORK_URL from "../config/network/deafult.network.json";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Space, Button } from "antd";
import { Link } from "react-router-dom";
import ConnectModal from "../components/Modal/ConnectModal";
import useAuth from "../hooks/useAuth";
import { useWeb3React } from "@web3-react/core";
import { truncateAddress } from "../utils";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const onConnectModalOpen = () => {
    setOpen(true);
  };

  const onConnectModalClose = () => {
    setOpen(false);
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Header
        toggleCollapsed={toggleCollapsed}
        collapsed={collapsed}
        onConnectModalOpen={onConnectModalOpen}
      />
      <Sidebar toggleCollapsed={toggleCollapsed} collapsed={collapsed} />
      <ConnectModal
        onConnectModalClose={onConnectModalClose}
        open={open}
        onConnectModalOpen={onConnectModalOpen}
      />
      <MainSection />
    </>
  );
}

const Header = ({ toggleCollapsed, collapsed, onConnectModalOpen }) => {
  const { login, logout } = useAuth();
  const { chainId, active, account } = useWeb3React();
  console.log(chainId, active, account);
  const menu = (
    <Menu
      items={[
        {
          label: <Link to="token">Token</Link>,
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: <Link to="/launchpad/create">Crypto Factory</Link>,
          key: "1",
        },
        {
          label: <Link to="/private-sale/create">Private Sale</Link>,
          key: "1",
        },
        {
          label: <Link to="/staking/create">Staking</Link>,
          key: "1",
        },
        {
          label: <Link to="/airdrop/create">Airdrop</Link>,
          key: "1",
        },
        {
          label: <Link to="/multisender">Multi Sender</Link>,
          key: "1",
        },
      ]}
    />
  );
  return (
    <>
      {" "}
      <section className="ant-layout ant-layout-has-sider">
        <header
          className="ant-layout-header"
          style={{
            background: "rgb(26 34 45)",
            color: "rgba(0, 0, 0, 0.85)",
            height: 79,
            position: "fixed",
            zIndex: 100,
            width: "100%",
            padding: "0px 30px",
            display: "flex",
            alignItems: "center",
            top: "-1px",
            boxShadow: "rgb(20 19 19 / 33%) 3px 5px 18px",
          }}
        >
          <nav className="flex w-100 items-center noselect">
            <Button type="text" onClick={toggleCollapsed}>
              {collapsed ? (
                <MenuUnfoldOutlined
                  style={{ fontSize: "23px", color: "white" }}
                />
              ) : (
                <MenuFoldOutlined
                  style={{ fontSize: "23px", color: "white" }}
                />
              )}
            </Button>
            <a className="logo mr-3" href="/?chain=BSC-Test">
              <div className="logo-icon">
                <img
                  src={process.env.PUBLIC_URL + "/assets/logo-2.svg"}
                  alt="LPadSale"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            </a>
            <div className="flex-1" />

            <div className="ant-dropdown-trigger connectButton on-mobile">
              <Dropdown overlay={menu} trigger={["click"]}>
                <Link onClick={(e) => e.preventDefault()}>
                  <Space>
                    <PlusOutlined style={{ color: "white" }} />
                    <span style={{ color: "white" }}>Create</span>
                  </Space>
                </Link>
              </Dropdown>
            </div>
            {/* </div> */}
            <div
              className="network on-mobile"
              style={{ cursor: "pointer" }}
              onClick={onConnectModalOpen}
            >
              <img
                src={DEFAULT_NETWORK_URL.networkList[chainId || 97].logoURI}
                alt="nn"
                width="18"
              />
              <span className="ml-2 hide-on-mobile">
                {console.log(chainId)}
                {DEFAULT_NETWORK_URL.networkList[chainId || 97].name}
              </span>
            </div>
            <div
              className="ant-dropdown-trigger connectButton"
              onClick={() => {
                if (!active) {
                  login();
                } else {
                  logout();
                }
              }}
            >
              <span style={{ color: "white" }}>
                {!active ? "Connect" : truncateAddress(account)}
              </span>
            </div>
          </nav>
        </header>
      </section>
    </>
  );
};

export default MainLayout;

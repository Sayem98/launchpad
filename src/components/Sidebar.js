import React, { useState } from "react";
import { Menu, Button } from "antd";
import {
  HomeOutlined,
  RocketOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { GiAirBalloon } from "react-icons/gi";
import { RiSendPlane2Line, RiVipCrown2Line } from "react-icons/ri";
import { FaTwitter, FaTelegramPlane, FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";
function Sidebar({ collapsed }) {
  return (
    <div>
      <aside
        className="ant-layout-sider ant-layout-sider-light"
        style={{
          background: "rgb(26 34 45)",
          color: "rgba(0, 0, 0, 0.85)",
          overflow: "auto",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 10,
          flex: "0 0 200px",
          boxShadow: "rgb(20 19 19 / 33%) 3px 5px 18px",
          maxWidth: collapsed ? 100 : 200,
          minWidth: collapsed ? 100 : 200,
          width: collapsed ? 100 : 200,
        }}
      >
        <div className="ant-layout-sider-children">
          <div className="MainLayout_menuWrapper__1Lz7a">
            <div className="MainLayout_sidebar__2dc69">
              <ul
                className="ant-menu ant-menu-root  ant-menu-light"
                role="menu"
                tabIndex={0}
                data-menu-list="true"
              >
                <SiderBarMenus collapsed={collapsed} />
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;

const SiderBarMenus = ({ collapsed }) => {
  return (
    <>
      <SideBarDropdown collapsed={collapsed} />
      {/* </li> */}
    </>
  );
};

const SideBarDropdown = ({ collapsed }) => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(
      <Link to="/" style={{ color: "#fff" }}>
        Home
      </Link>,
      "1",
      <HomeOutlined style={{ color: "#fff" }} />
    ),
    getItem(
      "Crypto Factory",
      "2",
      <RocketOutlined style={{ color: "#fff" }} />,
      [
        getItem(
          <Link to="launchpad/create" style={{ color: "#fff" }}>
            Create Crypto Factory
          </Link>,
          "3"
        ),
        // getItem(<Link to="fairlaunch/create">Create fair launch</Link>, "4"),
        // getItem(<Link to="dutch-auction/create">Create dutch auction</Link>, "5"),

        getItem(
          <Link to="launchpad/token/create" style={{ color: "#fff" }}>
            Create Token
          </Link>,
          "7"
        ),
        getItem(
          <Link to="launchpads" style={{ color: "#fff" }}>
            Crypto Factory List
          </Link>,
          "8"
        ),
      ]
    ),
    getItem(
      "Private Sale",
      "9",
      <SafetyCertificateOutlined style={{ color: "#fff" }} />,
      [
        getItem(
          <Link to="private-sale/create" style={{ color: "#fff" }}>
            Create Private Sale
          </Link>,
          "10"
        ),
        getItem(
          <Link to="private-sale" style={{ color: "#fff" }}>
            Private Sale List
          </Link>,
          "11"
        ),
      ]
    ),
    getItem("Airdrop", "16", <GiAirBalloon style={{ color: "#fff" }} />, [
      getItem(
        <Link to="airdrop/create" style={{ color: "#fff" }}>
          Create Airdrop
        </Link>,
        "17"
      ),
      getItem(
        <Link to="airdrops" style={{ color: "#fff" }}>
          Airdrop List
        </Link>,
        "18"
      ),
    ]),
    getItem("Staking", "12", <GiAirBalloon style={{ color: "#fff" }} />, [
      getItem(
        <Link to="staking/create" style={{ color: "#fff" }}>
          Create Staking
        </Link>,
        "13"
      ),
      getItem(
        <Link to="stakings" style={{ color: "#fff" }}>
          Staking
        </Link>,
        "14"
      ),
    ]),

    // getItem(
    //   <Link to="antibot">Anti-Bot</Link>,
    //   "20",
    //   <SafetyCertificateOutlined />
    // ),
    getItem(
      <Link to="multisender" style={{ color: "#fff" }}>
        Multi-Sender
      </Link>,
      "21",
      <RiSendPlane2Line />
    ),
    // getItem(
    //   <a href="www.google.l.com" target="_blank" style={{ color: "#fff" }}>
    //     Pools Alert
    //   </a>,
    //   "22",
    //   <FaRobot />
    // ),
    // getItem(
    //   <a href="www.google.l.com" target="_blank" style={{ color: "#fff" }}>
    //     KYC {"&"} Audit
    //   </a>,
    //   "23",
    //   <SafetyCertificateOutlined />
    // ),
    // getItem(
    //   <a href="www.google.l.com" target="_blank" style={{ color: "#fff" }}>
    //     Docs
    //   </a>,
    //   "24",
    //   <LockOutlined />
    // ),
    // getItem(
    //   <a
    //     href="https://t.me/Launch_core"
    //     target="_blank"
    //     style={{ color: "#fff" }}
    //   >
    //     Telegram
    //   </a>,
    //   "25",
    //   <FaTelegramPlane />
    // ),
    // getItem(
    //   <a
    //     href={"https://twitter.com/CoreLaunch?t=bvQ0HNKmSnCJikENwxl64A&s=09"}
    //     target="_blank"
    //     style={{ color: "#fff" }}
    //   >
    //     Twitter
    //   </a>,
    //   "26",
    //   <FaTwitter />
    // ),
  ];
  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      inlineCollapsed={collapsed}
      mode="inline"
      items={items}
      style={{ color: "white" }}
    />
  );
};

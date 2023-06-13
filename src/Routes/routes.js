import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../views/Home";
import Launchpad from "../views/Launchpad/Launchpad";
import PrivateSale from "../views/PrivateSale/PrivateSale";
import Antibot from "../views/Antibot";
import Leaderboard from "../views/Leaderboard";
import Airdrop from "../views/Airdrop/Airdrop";
import AirdropList from "../views/Airdrop/AirdropList";
import Multisender from "../views/Multisender";
import SubscriptionPool from "../views/Launchpad/SubscriptionPool";
import TokenCreate from "../views/Launchpad/TokenCreate";
import Launchpads from "../views/Launchpad/Launchpads";
import PrivateSaleList from "../views/PrivateSale/PrivateSaleList";
import LaunchpadPage from "../views/Launchpad/LaunchpadPage";
import AirdropPage from "../views/Airdrop/AirdropPage";
import Staking from "../views/Staking/Staking";
import StakingPage from "../views/Staking/StakingPage";
import StakingList from "../views/Staking/StakingList";
import PrivateSalePage from "../views/PrivateSale/PrivateSalePage";

const RouteList = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            {/* //Launchpad Section  */}
            <Route path="launchpad/create" element={<Launchpad />} />{" "}
            <Route path="launchpad/:address" element={<LaunchpadPage />} />
            <Route
              path="subscription-pool/create"
              element={<SubscriptionPool />}
            />{" "}
            <Route path="launchpad/token/create" element={<TokenCreate />} />{" "}
            <Route path="launchpads" element={<Launchpads />} />
            {/* //Private Sale */}
            <Route path="private-sale/create" element={<PrivateSale />} />
            <Route path="private-sale" element={<PrivateSaleList />} />
            <Route path="private-sale/:address" element={<PrivateSalePage />} />
            <Route path="airdrop/create" element={<Airdrop />} />
            <Route path="airdrop/:address" element={<AirdropPage />} />
            <Route path="airdrops" element={<AirdropList />} />
            <Route path="staking/create" element={<Staking />} />
            <Route path="staking/:address" element={<StakingPage />} />
            <Route path="stakings" element={<StakingList />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="antibot" element={<Antibot />} />
            <Route path="multisender" element={<Multisender />} />
            {/* <Route path="pools-alert" element={<Poolsalert />} />
            <Route path="kyc" element={<KYC />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteList;

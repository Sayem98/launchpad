import { Input, Tabs, Select, Typography, List } from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import LaunchpadCard from "../../components/Cards/LaunchpadCard";
import { useWeb3React } from "@web3-react/core";
import { useTokenContract } from "../../hooks/useContract";
import Loading from "../../components/Loading/Loading";

function Launchpads() {
  const [ICODetails, setICODetails] = useState([]);
  const { account, active, chainId, library } = useWeb3React();
  const { getAllIcoDetails } = useTokenContract();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // if (active) {
    setLoading(true);
    getAllIcoDetails()
      .then((res) => {
        setLoading(false);
        console.log(res);
        setICODetails(res);
      })
      .catch((err) => console.log(err));
    // }
  }, [active, chainId]);

  const items = [
    {
      label: "All Crypto Factory",
      key: "item-1",
      children: (
        <>
          <div className="flex mb-5" style={{ alignItems: "end" }}></div>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={ICODetails}
            renderItem={(item) => (
              <List.Item>
                <LaunchpadCard item={item} />
              </List.Item>
            )}
          />
        </>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="launchpad-title">
          <h1 className="pb-6">Current Presales</h1>
        </div>
        <Tabs items={items} />
        <div></div>
      </div>
    );
  }
}

export default Launchpads;

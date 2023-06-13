import { useWeb3React } from "@web3-react/core";
import { Card, Tabs, Select, Typography, Input, List } from "antd";
import React, { useEffect, useState } from "react";
import { useStakingContract } from "../../hooks/useContract";
import AirdropCard from "../../components/Cards/AirdropCard";
import StakingCard from "../../components/Cards/StakingCard";
import Loading from "../../components/Loading/Loading";

function StakingList() {
  const { Option } = Select;
  const { Text } = Typography;
  const { active } = useWeb3React();
  const [counter, setCounter] = useState(0);
  const [stakings, setStakings] = useState([]);
  const { stakingCounter, getAllStakings } = useStakingContract();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    await stakingCounter()
      .then((res) => {
        setCounter(res);
      })
      .catch((err) => console.log(err));
    getData();
  }, []);

  const getData = async () => {
    await getAllStakings().then((res) => {
      const items = [];
      res.map((item, key) => {
        const data = {
          tokenName: item[0],
          tokenSymbol: item[1],
          stakingTitle: item[2],
          stakingLogo: item[3],
          stakingWebsite: item[4],
          stakingFacebook: item[5],
          stakingTwitter: item[6],
          stakingGithub: item[7],
          stakingTelegram: item[8],
          stakingInstagram: item[9],
          stakingDiscord: item[10],
          stakingReddit: item[11],
          stakingDescription: item[12],
          stakingOwner: item[16],
          stakingAddress: item[17],
        };
        items.push(data);
      });
      console.log(res);
      setStakings(items);
      console.log(items);
      setLoading(false);
    });
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="launchpad-title">
          <h1 className="pb-6">Staking</h1>
        </div>
        <Card bordered={false}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div>
              <p className="heading">Staking Launched</p>
              <p className="title">{counter}</p>
            </div>
          </div>
        </Card>
        <br />

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
          dataSource={stakings}
          renderItem={(item) => (
            <List.Item>
              <StakingCard staking={item} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default StakingList;

import { useWeb3React } from "@web3-react/core";
import { Card, Tabs, Select, Typography, Input, List } from "antd";
import React, { useEffect, useState } from "react";
import { useAirdropContract } from "../../hooks/useContract";
import AirdropCard from "../../components/Cards/AirdropCard";
import Loading from "../../components/Loading/Loading";

function AirdropList() {
  const { Option } = Select;
  const { Text } = Typography;
  const { active } = useWeb3React();
  const [counter, setCounter] = useState(0);
  const [airdrops, setAirdrops] = useState([]);
  const { airdropCounter, getAllAirdrops } = useAirdropContract();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    await airdropCounter()
      .then((res) => {
        setCounter(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
    getData();
  }, []);

  const getData = async () => {
    await getAllAirdrops().then((res) => {
      console.log(res);
      const items = [];
      res.map((item, key) => {
        const data = {
          tokenName: item[0],
          tokenSymbol: item[1],
          airdropTitle: item[2],
          airdropLogo: item[3],
          airdropWebsite: item[4],
          airdropFacebook: item[5],
          airdropTwitter: item[6],
          airdropGithub: item[7],
          airdropTelegram: item[8],
          airdropInstagram: item[9],
          airdropDiscord: item[10],
          airdropReddit: item[11],
          airdropDescription: item[12],
          airdropAddress: item[19],
        };
        items.push(data);
      });
      setAirdrops(items);
      setLoading(false);
    });
  };

  // const items = [
  //   {
  //     label: "All Airdrops",
  //     key: "item-1",
  //     children: (
  //       <>
  //         <div className="columns is-multiline" style={{ columnGap: "2rem" }}>
  //           {airdrops.length !== 0 &&
  //             airdrops.map((item, index) => (
  //               <div className="AirdropItem_root__1zaIn">
  //                 <AirdropCard airdrop={item} />
  //               </div>
  //             ))}
  //         </div>
  //       </>
  //     ),
  //   },
  // ];
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="launchpad-title">
          <h1 className="pb-6">Airdrop</h1>
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
              <p className="heading">Airdrop Launched</p>
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
          dataSource={airdrops}
          renderItem={(item) => (
            <List.Item>
              <AirdropCard item={item} />
            </List.Item>
          )}
        />
        {/* <Tabs items={items} /> */}
      </div>
    );
  }
}

export default AirdropList;

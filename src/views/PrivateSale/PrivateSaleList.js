import { Input, Tabs, Select, Typography, List } from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import PrivateSaleCard from "../../components/Cards/PrivateSaleCard";
import { useWeb3React } from "@web3-react/core";
import { usePrivateSaleContract } from "../../hooks/useContract";
import Loading from "../../components/Loading/Loading";
import { fromWeiConverter } from "../../utils";
const { Option } = Select;
const { Text } = Typography;

function PrivateSaleList() {
  const [privateSales, setPrivateSales] = useState([]);
  const { account, active, chainId } = useWeb3React();
  const { getAllPrivateSale } = usePrivateSaleContract();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    await getAllPrivateSale().then((res) => {
      // console.log(res[0][0]);
      const items = [];
      res.map((item, key) => {
        const data = {
          tokenName: item[0],
          tokenSymbol: item[1],
          saleTitle: item[2],
          saleLogo: item[3],
          saleWebsite: item[4],
          saleFacebook: item[5],
          saleTwitter: item[6],
          saleGithub: item[7],
          saleTelegram: item[8],
          saleInstagram: item[9],
          saleDiscord: item[10],
          saleReddit: item[11],
          saleDescription: item[12],
          saleStartTime: fromWeiConverter(item[13]),
          saleEndTime: fromWeiConverter(item[14]),
          saleSoftcap: item[15],
          saleHardCap: item[16],
          saleMinBuy: item[17],
          saleMaxBuy: item[18],
          saleContract: item[26],
        };
        items.push(data);
      });
      setPrivateSales(items);
      setLoading(false);
    });
  };
  const items = [
    {
      label: "All Private Sales",
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
            dataSource={privateSales}
            renderItem={(item) => (
              <List.Item>
                <PrivateSaleCard item={item} />
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
          <h1 className="pb-6">Private Sales</h1>
        </div>
        <Tabs items={items} />
        <div></div>
      </div>
    );
  }
}

export default PrivateSaleList;

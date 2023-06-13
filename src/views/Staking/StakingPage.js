import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Form, InputNumber, message } from "antd";
import { useStakingContract, useTokenContract } from "../../hooks/useContract";
import {
  decimalConverter,
  DivideBy18,
  fromWeiConverter,
  socialIcons,
} from "../../utils";
import Loading from "../../components/Loading/Loading";

export default function StakingPage() {
  const { library, active, account } = useWeb3React();
  const { address } = useParams();
  const { getApproveTokenContract, getTokenBalance } = useTokenContract();
  const {
    getStakingDetails,
    poolStake,
    getAlreadyStaked,
    startUnstake,
    isAlreadyStaked,
    stakersDataset,
  } = useStakingContract();
  const [stakingTokonomics, setStakingTokonomics] = useState({});
  const [duration, setDuration] = useState(1);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stakerData, setStakerData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (active) {
      getStakerData();
    }
  }, [active]);

  const getData = () => {
    getStakingDetails(address)
      .call()
      .then((res) => {
        // setAirdropTokonomics({ ...stakingTokonomics, tokenAddress: res });
        const data = {
          tokenName: res[0],
          tokenSymbol: res[1],
          stakingTitle: res[2],
          stakingLogo: res[3],
          stakingWebsite: res[4],
          stakingFacebook: res[5],
          stakingTwitter: res[6],
          stakingGithub: res[7],
          stakingTelegram: res[8],
          stakingInstagram: res[9],
          stakingDiscord: res[10],
          stakingReddit: res[11],
          stakingDescription: res[12],
          stakingTokenContract: res[15],
        };
        console.log(data);
        setStakingTokonomics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStakerData = () => {
    stakersDataset(address)
      .then((res) => {
        const data = {
          stakedAmount: fromWeiConverter(res[1]),
        };
        setStakerData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stake = async () => {
    if (active) {
      setLoading(true);
      let isStacked = await getAlreadyStaked(address);
      console.log(await checkUserBalance());
      if (await checkUserBalance()) {
        if (!isStacked) {
          await getApproveTokenContract(
            stakingTokonomics?.stakingTokenContract,
            address,
            amount
          )
            .send({
              from: account,
            })
            .then(async (res) => {
              await poolStake(address, decimalConverter(amount), duration)
                .send({ from: account })
                .then((res) => {
                  setLoading(false);
                  getData()
                  message.success("Staking done successfully.");
                });
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        } else {
          setLoading(false);
          message.error("You have already stacked");
        }
      } else {
        setLoading(false);
        message.error("You have staking token");
      }
    } else {
      setLoading(false);
      message.error("Wallet Not Connected");
    }
  };

  const unstakeTokens = () => {
    if (active) {
      setLoading(true);
      isAlreadyStaked(address)
        .then((res) => {
          if (res === true) {
            startUnstake(address)
              .send({ from: account })
              .then(() => {
                setLoading(false);
                message.success("Sucessfully unstaked");
              })
              .catch((err) => {
                message.error(err);
                setLoading(false);
              });
          } else {
            setLoading(false);
            message.error("You have to stake first!!");
          }
        })
        .catch((err) => {
          setLoading(false);
          message.error(err);
        });
    }
  };

  const checkUserBalance = async () => {
    return await getTokenBalance(stakingTokonomics.stakingTokenContract).then(
      (res) => {
        var balance = parseInt(res);
        if (balance >= parseInt(decimalConverter(amount))) {
          console.log(true);
          return true;
        } else {
          console.log(false);
          return false;
        }
      }
    );
  };

  const TableInfo = () => {
    return (
      <div className="table-container mt-0">
        <table>
          <tbody>
            <tr>
              <td>Staking Address</td>
              <td className="has-text-right">{address}</td>
            </tr>
            <tr>
              <td>Token Address</td>
              <td className="has-text-right">
                {stakingTokonomics?.stakingTokenContract}
              </td>
            </tr>
            <tr>
              <td>Token Name</td>
              <td className="has-text-right">{stakingTokonomics?.tokenName}</td>
            </tr>
            <tr>
              <td>Token Symbol</td>
              <td className="has-text-right">
                {stakingTokonomics?.tokenSymbol}
              </td>
            </tr>
            <tr>
              <td>Token decimals</td>
              <td className="has-text-right">18</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="flex">
          <div className="column is-flex-grow-2">
            <Card bordered={false}>
              <LaunchpadHeading stakingTokonomics={stakingTokonomics} />
              <TableInfo />
            </Card>
          </div>
          <div className="column is-flex-grow-1">
            <Card
              title="Staking Zone"
              bordered={false}
              style={{ width: "max-content" }}
            >
              <div>
                <div>
                  <Button
                    onClick={() => setDuration(1)}
                    type={duration === 1 ? "primary" : "secondary"}
                    style={{ marginRight: "1rem" }}
                  >
                    15 Days
                  </Button>
                  <Button
                    onClick={() => setDuration(2)}
                    type={duration === 2 ? "primary" : "secondary"}
                    style={{ marginRight: "1rem" }}
                  >
                    30 Days
                  </Button>
                  <Button
                    onClick={() => setDuration(3)}
                    type={duration === 3 ? "primary" : "secondary"}
                    style={{ marginRight: "1rem" }}
                  >
                    90 Days
                  </Button>
                  <Button
                    onClick={() => setDuration(4)}
                    type={duration === 4 ? "primary" : "secondary"}
                  >
                    180 Days
                  </Button>
                </div>
                <Form
                  layout="vertical"
                  onFinish={null}
                  style={{ marginTop: "1.5rem" }}
                >
                  <Form.Item name="stakeAmount" label={"Stake Amount"}>
                    <InputNumber
                      placeholder="0.00"
                      onChange={(e) => setAmount(e)}
                      bordered={false}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => stake()}
                      disabled={!active}
                      style={{ width: "100%" }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Card>
            <div style={{ height: "24px" }}></div>
            <Card title="Owner Zone" bordered={false}>
              <div className="table-container mt-0">
                <table>
                  <tbody>
                    <tr>
                      <td>Your Staked Amount</td>
                      <td className="has-text-right">
                        {stakerData?.stakedAmount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Button
                onClick={unstakeTokens}
                disabled={!active}
                style={{ width: "100%" }}
              >
                Unstake
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const LaunchpadHeading = ({ stakingTokonomics }) => {
  return (
    <>
      <article className="media pool-detail" style={{ position: "relative" }}>
        <div className="media-left">
          <p className="image is-48x48">
            <img
              src={stakingTokonomics?.stakingLogo}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = process.env.PUBLIC_URL + "/assets/logo.png";
              }}
              alt=""
              style={{ filter: "grayscale(0)" }}
            />
          </p>
        </div>
        <div className="media-content">
          <div className="content">
            <div className="is-flex is-align-items-center">
              <div className="is-flex-grow-1 is-flex single-title">
                <h1 className="title mr-2">
                  {stakingTokonomics?.stakingTitle}
                </h1>
              </div>
            </div>
            <div className="is-flex mt-1 mb-2">
              {socialIcons(
                stakingTokonomics?.stakingWebsite,
                stakingTokonomics?.stakingFacebook,
                stakingTokonomics?.stakingTwitter,
                stakingTokonomics?.stakingGithub,
                stakingTokonomics?.stakingInstagram
              )}
            </div>
            <div className="ant-typography" />
          </div>
          <div className="ant-typography" />
        </div>
      </article>
    </>
  );
};

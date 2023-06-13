import {useWeb3React} from "@web3-react/core";
import {Button, Card, Form, InputNumber, message, Progress} from "antd";
import moment from "moment";
import React, {useState, useEffect} from "react";
import {FaKey} from "react-icons/fa";
import {useParams} from "react-router-dom";
import Web3 from "web3";
import CounterComponent from "../../components/CounterComponent";
import Loading from "../../components/Loading/Loading";
import {ChainsInfo} from "../../config/config.chain";
import {DEFAULT_NETWORK} from "../../config/constant/constant";
import {useTokenContract} from "../../hooks/useContract";
import {
  decimalConverter,
  DivideBy18,
  fromWeiConverter,
  RaisedAmountPercentage,
  saleStatus,
  socialIcons,
  countDown,
} from "../../utils";

function LaunchpadPage() {
  const {active, account, chainId} = useWeb3React();
  const {address} = useParams();
  const {
    getTokenDecimal,
    getTokenomics,
    getTokenSymbol,
    getSocialMediaData,
    getApproveTokenContract,
    setInvestInIco,
    getInvestDataTrack,
    getAllTradeInfo,
    getIsSaleEnded,
    setClaimToken,
    getClaimableToken,
    getTokenContractBalance,
    getIDOSaleStatus,
    getUserInvestmentLimitLeft,
    isHardCapReach,
    checkOwner,
    loadFundStatus,
    sendFund,
    getTokenBalance,
  } = useTokenContract();

  const [Tokonomics, setTokonomics] = useState({});
  const [TokenDetails, setTokenDetails] = useState({});
  const [InvestDataTrack, setInvestData] = useState([]);
  const [totalInvestor, setTotalInvestor] = useState({});
  const [decimal, setDecimal] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const [isApproved, setApproved] = useState(false);
  const [isSaleStatus, setSaleStatus] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [payoutTokenSymbol, setPayoutTokenSymbol] = useState("");
  const [hardCapReached, setHardCapReached] = useState(false);
  const [loadFund, setLoadFund] = useState(false);

  useEffect(() => {
    // if (active) {

    getSocialMediaData(address)
      .then((res) => {
        console.log(res);
        setTokenDetails(res);
      })
      .catch((err) => setisLoading(false));
    // }
    checkHardcapReached();
    getTokenDetails();
  }, [active]);
  useEffect(() => {
    if (active) {
      checkIsOwner();
      getInvestDataTrack(address).then((res) => {
        console.log(res);
        setInvestData(res);
      });
      checkLoadFundStatus();
    }
  }, [active, account]);

  const getTokenDetails = () => {
    getTokenomics(address).then(async (res) => {
      console.log(res);
      setTokonomics(res);
      await getTokenDecimal(res[10]).then((res) => {
        console.log(res);
        setDecimal(res);
      });

      await getTokenSymbol(res[10]).then((res) => {
        console.log(res);
        setPayoutTokenSymbol(res);
      });
      // await getAllTradeInfo(address).then((res) => {
      //   console.log(res);
      //   setTotalInvestor(res);
      // });

      await getIsSaleEnded(address)
        .then((res) => {
          console.log(res);
          setSaleStatus(res);
          setisLoading(false);
        })
        .catch((err) => setisLoading(false));
    });
  };

  const checkIsOwner = () => {
    checkOwner(address).then((res) => {
      if (res.toLowerCase() === account.toLowerCase()) {
        setIsOwner(true);
        console.log(true);
      } else {
        setIsOwner(false);
        console.log(false);
      }
    });
  };

  const checkLoadFundStatus = () => {
    loadFundStatus(address).then((res) => {
      setLoadFund(res);
    });
  };

  const checkHardcapReached = () => {
    isHardCapReach(address).then((res) => {
      setHardCapReached(res);
    });
  };

  const transferFund = () => {
    const presaleRate = fromWeiConverter(Tokonomics[0]);
    const hardCap = fromWeiConverter(Tokonomics[2]);
    const amount = presaleRate * hardCap * 0.1;
    const finalAmount = amount + presaleRate * hardCap;

    setisLoading(true);
    getTokenBalance(Tokonomics[11]).then((res) => {
      const userAmount = fromWeiConverter(res);
      const raisedAmount = fromWeiConverter(Tokonomics[8]);
      const presaleRate = fromWeiConverter(Tokonomics[0]);
      if (userAmount >= raisedAmount * presaleRate) {
        getApproveTokenContract(
          Tokonomics[11],
          address,
          // finalAmount
          100000000000000
        )
          .send({
            from: account,
          })
          .then(() =>
            sendFund(address, Tokonomics[11])
              .send({from: account})
              .then((res) => {
                getTokenDetails();
                checkHardcapReached();
                checkLoadFundStatus();
                setisLoading(false);
              })
          )
          .catch((err) => {
            setisLoading(false);
            console.log(err);
          });
      } else {
        setisLoading(false);
        message.error("Admin does not have fund");
      }
    });
    // console.log(finalAmount, decimalConverter(finalAmount));
  };

  const handleSubmitTransaction = async (values) => {
    const hardCap = Tokonomics[2];
    const raisedAmount = Tokonomics[8];
    let minimumInvestment = Tokonomics[5];

    let minValidation;
    if (hardCap - raisedAmount < minimumInvestment) {
      minimumInvestment = hardCap - raisedAmount < minimumInvestment;
    } else {
      console.log(false);
    }
    if (active) {
      setisLoading(true);
      console.log(values);
      let investAmount = parseInt(values.investAmount);
      getTokenBalance(
        ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN
      ).then(async (res) => {
        if (res >= decimalConverter(investAmount)) {
          if (new Date().getTime() / 1000 > Tokonomics?.[3]) {
            if ((await isHardCapReach(address)) === false) {
              if (new Date().getTime() / 1000 < Tokonomics?.[4]) {
                if (decimalConverter(investAmount) >= minimumInvestment) {
                  if (
                    parseInt(Tokonomics?.[8]) / Math.pow(10, 18) +
                    investAmount <=
                    parseInt(Tokonomics?.[2]) / Math.pow(10, 18)
                  ) {
                    getApproveTokenContract(
                      Tokonomics?.[10],
                      address,
                      investAmount
                    )
                      .send({
                        from: account,
                      })
                      .then(async (res) => {
                        setInvestInIco(
                          address,
                          new Web3().utils.toWei(
                            investAmount.toString(),
                            "ether"
                          )
                        )
                          .send({
                            from: account,
                          })
                          .then((res) => {
                            getTokenDetails();
                            checkHardcapReached();
                            setApproved(false);
                            setisLoading(false);
                            message.success(
                              "Transaction successfully completed!"
                            );
                          })
                          .catch((err) => {
                            setisLoading(false);
                            message.error("Transaction buy token failed");
                          });
                      })
                      .catch((err) => {
                        setisLoading(false);
                        message.error("Transaction Approve failed");
                      });
                  } else {
                    setisLoading(false);
                    message.error("This Transaction may exceed IDO HardCap");
                  }
                } else {
                  setisLoading(false);
                  message.error("Must match minimumInvestment");
                }
              } else {
                setisLoading(false);
                message.error("The ICO is ended");
              }
            } else {
              setisLoading(false);
              message.error("ICO hardcap has reached");
            }
          } else {
            setisLoading(false);
            message.error("ICO is not started");
          }
        } else {
          setisLoading(false);
          message.error(`Not Enough ${ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN
            }
          Balance`);
        }
      });
    } else {
      setisLoading(false);
      message.error("Wallet is not connected");
    }
  };

  const handelClaimToken = async () => {
    if (active) {
      setisLoading(true);
      const investedAmount = decimalConverter(InvestDataTrack.amount);
      console.log(await getTokenContractBalance(Tokonomics?.[11], address));
      if (isSaleStatus) {
        if ((await getClaimableToken(address)) > 0) {
          if (!InvestDataTrack.isIDOTokenReceived) {
            if (
              (await getClaimableToken(address)) <=
              (await getTokenContractBalance(Tokonomics?.[11], address))
            ) {
              setClaimToken(address)
                .send({
                  from: account,
                })
                .then(() => {
                  setisLoading(false);
                  getTokenDetails();
                })
                .catch((err) => {
                  message.error(err);
                  setisLoading(false);
                });
            } else {
              setisLoading(false);
              message.error("IDO does not have token supply");
            }
          } else {
            setisLoading(false);
            message.error("User Already Got thier Token");
          }
        } else {
          setisLoading(false);
          message.error("You don't have amount to claim");
        }
      } else {
        setisLoading(false);
        message.error("Sale is not ended");
      }
    } else {
      setisLoading(false);
      message.error("Wallet is not connect");
    }
  };

  const LaunchpadHeading = ({isOwner, hardCapReached}) => {
    return (
      <>
        <article className="media pool-detail" style={{position: "relative"}}>
          <div className="media-left">
            <p className="image is-48x48">
              <img
                src={TokenDetails?.[2]}
                onError={({currentTarget}) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    process.env.PUBLIC_URL + "/assets/logo.png";
                }}
                alt=""
                style={{filter: "grayscale(0)"}}
              />
            </p>
          </div>
          <div className="media-content">
            <div className="content">
              <div className="is-flex is-align-items-center">
                <div className="is-flex-grow-1 is-flex single-title">
                  <h1 className="title mr-2">
                    {TokenDetails?.[0]}{" "}
                    {isOwner && (
                      <span style={{marginLeft: "10px"}}>
                        <FaKey color="#ffa701" size={20} />
                      </span>
                    )}
                  </h1>
                  <div className="flex status-wrapper">
                    <div className="flex" />
                    <div className="status-space" />
                    <div className="flex">
                      <div>
                        {!hardCapReached ? (
                          saleStatus(
                            Tokonomics?.[3],
                            Tokonomics?.[4],
                            hardCapReached
                          )
                        ) : (
                          <>
                            <span className="is-flex status-dot ended">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth={0}
                                viewBox="0 0 16 16"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx={8} cy={8} r={8} />
                              </svg>
                              <span style={{whiteSpace: "nowrap"}}>
                                Ended
                                {/* Sale Ended */}
                              </span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="is-flex mt-1 mb-2">
                {socialIcons(
                  TokenDetails?.[5], // weebsiet
                  TokenDetails?.[3], //facebook
                  TokenDetails?.[4], //twitter
                  "",
                  ""
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
  const TableInfo = () => {
    return (
      <>
        <div className="table-container mt-0">
          <table>
            <tbody>
              <tr>
                <td>Presale Address</td>
                <td className="has-text-right">
                  <a
                    href="https://testnet.bscscan.com/address/0x6a68a588f3C812A1434bCbeA7AF912E7003d6714"
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    {address}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Token Name</td>
                <td className="has-text-right">{TokenDetails?.[0]}</td>
              </tr>
              <tr>
                <td>Token Symbol</td>
                <td className="has-text-right">{TokenDetails?.[1]}</td>
              </tr>
              <tr>
                <td>Token Decimals</td>
                <td className="has-text-right">{decimal}</td>
              </tr>
              <tr>
                <td>Token Address</td>
                <td className="has-text-right">
                  <a
                    className="mr-1"
                    href="https://testnet.bscscan.com/address/0xf66ffA867264e2D6eA4194d365cfb7E728625356"
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    {Tokonomics?.[11]}
                  </a>
                  <br />
                </td>
              </tr>

              <tr>
                <td>Presale Rate</td>
                <td className="has-text-right">
                  {"1 " + payoutTokenSymbol + " = "}
                  {DivideBy18(Tokonomics?.[0])}{" "}
                  <a style={{cursor: "none"}}>{TokenDetails?.[1]}</a>
                </td>
              </tr>

              <tr>
                <td>Soft Cap</td>
                <td className="has-text-right">
                  {DivideBy18(Tokonomics?.[1])}{" "}
                  <a style={{cursor: "none"}}>{TokenDetails?.[1]}</a>
                </td>
              </tr>
              <tr>
                <td>Hard Cap</td>
                <td className="has-text-right">
                  {DivideBy18(Tokonomics?.[2])}{" "}
                  <a style={{cursor: "none"}}>{TokenDetails?.[1]}</a>
                </td>
              </tr>

              <tr>
                <td>Presale Start Time</td>
                <td className="has-text-right">
                  {" "}
                  {moment(Tokonomics?.[3] * 1000).format(
                    "MMM Do YYYY hh:mm:ss a"
                  )}
                </td>
              </tr>
              <tr>
                <td>Presale End Time</td>
                <td className="has-text-right">
                  {" "}
                  {moment(Tokonomics?.[4] * 1000).format(
                    "MMM Do YYYYn hh:mm:ss a"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };
  const LaunchpadInfo = () => {
    return (
      <>
        <div className="column is-flex-grow-1">
          {" "}
          <Card bordered={false}>
            <div
              data-show="true"
              className="ant-alert ant-alert-warning ant-alert-no-icon"
              role="alert"
              style={{marginBottom: 10}}
            >
              <div className="ant-alert-content">
                <div className="ant-alert-message">
                  Make sure the website is lpadsale.finance!
                </div>
                <div className="ant-alert-description" />
              </div>
            </div>

            <div className="pb-4">
              <Progress
                percent={RaisedAmountPercentage(
                  Tokonomics?.[8],
                  Tokonomics?.[2]
                )}
                showInfo={true}
                size="small"
              />
              <div className="is-flex is-align-items-center is-size-7">
                <div className="is-flex-grow-1">
                  {DivideBy18(Tokonomics?.[8])}{" "}
                  <a style={{cursor: "none"}}>{payoutTokenSymbol}</a>
                </div>
                <div className="is-flex-grow-1 has-text-right">
                  {DivideBy18(Tokonomics?.[2])}{" "}
                  {<a style={{cursor: "none"}}>{payoutTokenSymbol}</a>}
                </div>
              </div>
            </div>
            {/* <div className="has-text-centered">This pool has ended</div> */}
            <div style={{textAlign: "center"}}>
              {countDown(Tokonomics?.[3], Tokonomics?.[4], isSaleStatus)}
              {!isSaleStatus && (
                <Form layout="vertical" onFinish={handleSubmitTransaction}>
                  <Form.Item
                    name="investAmount"
                    label={"Amount (max: " + DivideBy18(Tokonomics?.[6]) + ")"}
                  >
                    <InputNumber placeholder="0.00" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={!active}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              )}
              {isSaleStatus && (
                <Button
                  type="primary"
                  onClick={handelClaimToken}
                  disabled={!active}
                >
                  Claim Token
                </Button>
              )}
            </div>
          </Card>
          <div style={{height: "24px"}}></div>
          <Card bordered={false}>
            <div className="table-container">
              <table>
                <tbody>
                  <tr>
                    <td>Minimum Buy</td>
                    <td className="has-text-right">
                      {DivideBy18(Tokonomics?.[5])}{" "}
                      <a style={{cursor: "none"}}>{TokenDetails?.[1]}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Maximum Buy</td>
                    <td className="has-text-right">
                      {DivideBy18(Tokonomics?.[6])}{" "}
                      <a style={{cursor: "none"}}>{TokenDetails?.[1]}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Total Contributors</td>
                    <td className="has-text-right">
                      {totalInvestor?.[0]?.length}
                    </td>
                  </tr>
                  <tr>
                    <td>You purchased</td>
                    <td className="has-text-right">
                      {DivideBy18(InvestDataTrack?.[0])}{" "}
                      <a style={{cursor: "none"}}>{TokenDetails?.[1]}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          <div style={{height: "24px"}}></div>
          {isOwner && (
            <Card title={"Owner Zone"} bordered={false} color={"white"}>
              <Button
                type="primary"
                onClick={transferFund}
                disabled={!active || loadFund}
              >
                Transfer fund
              </Button>
            </Card>
          )}
        </div>
      </>
    );
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="flex">
        <div className="column is-flex-grow-2">
          <Card bordered={false}>
            <LaunchpadHeading
              isOwner={isOwner}
              hardCapReached={hardCapReached}
            />
            <TableInfo />
          </Card>
        </div>

        <LaunchpadInfo isOwner={isOwner} isSaleStatus={isSaleStatus} />
      </div>
    </div>
  );
}

export default LaunchpadPage;

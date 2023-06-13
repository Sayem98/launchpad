import { useWeb3React } from "@web3-react/core";
import { Button, Card, Form, InputNumber, message, Progress } from "antd";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import { FaKey } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import CounterComponent from "../../components/CounterComponent";
import Loading from "../../components/Loading/Loading";
import {
  usePrivateSaleContract,
  useTokenContract,
} from "../../hooks/useContract";
import {
  DivideBy18,
  fromWeiConverter,
  RaisedAmountPercentage,
  saleStatus,
  decimalConverter,
  socialIcons,
  countDown,
} from "../../utils";

const PrivateSalePage = () => {
  const { active, account } = useWeb3React();
  const { address } = useParams();
  const {
    getPrivateSaleDetails,
    buyPrivateSale,
    getPrivateSaleTokenomics,
    checkHardcapReached,
    claimPrivateSaleToken,
    checkSaleEnded,
    finalizeSale,
    getPrivateSaleTokenomics256,
  } = usePrivateSaleContract();
  const { getApproveTokenContract, getTokenBalance } = useTokenContract();

  const [tokenomics, setTokenomics] = useState({});
  const [isHardCapReached, setHardcapReached] = useState(false);
  const [tokenomics256, setTokenomics256] = useState({});
  const [TokenDetails, setTokenDetails] = useState({});
  const [InvestDataTrack, setInvestData] = useState([]);
  const [totalInvestor, setTotalInvestor] = useState({});
  const [decimal, setDecimal] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const [isApproved, setApproved] = useState(false);
  const [isSaleStatus, setSaleStatus] = useState(false);
  const [payoutTokenSymbol, setPayoutTokenSymbol] = useState("");
  const [saleData, setSaleData] = useState({});
  const [submitAmount, setSubmitAmount] = useState(null);
  const [saleEnded, setSaleEnded] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { checkOwner } = usePrivateSaleContract();
  const formRef = useRef();

  useEffect(() => {
    getTokenomics();
    getTokenomics256();
    checkPrivateSaleEnded();
    hardCapReached();
    getData();
  }, []);

  useEffect(() => {
    if (active) {
      checkIsOwner();
    }
  }, [active, account]);

  // read functions
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

  const getData = () => {
    getPrivateSaleDetails(address)
      .call()
      .then((res) => {
        console.log(res);
        const data = {
          tokenName: res[0],
          tokenSymbol: res[1],
          tokenAddress: res[23],
          saleTitle: res[2],
          saleLogo: res[3],
          saleWebsite: res[4],
          saleFacebook: res[5],
          saleTwitter: res[6],
          saleGithub: res[7],
          saleInstagram: res[9],
          saleTelegram: res[8],
          saleDiscord: res[10],
          saleReddit: res[11],
          saleDescription: res[12],
          saleStartTime: fromWeiConverter(res[13]),
          saleEndTime: fromWeiConverter(res[14]),
          saleSoftcap: res[15],
          saleHardCap: res[16],
          saleMinBuy: res[17],
          saleMaxBuy: res[18],
          saleContract: res[26],
        };
        setSaleData(data);
        setisLoading(false);
        console.log(data);
      })
      .catch((err) => {});
  };

  const getTokenomics256 = () => {
    getPrivateSaleTokenomics256(address).then((res) => {
      const data = {
        raisedFund: res[2],
        hardCap: res[4],
      };
      setTokenomics256(data);
    });
  };

  const getTokenomics = () => {
    getPrivateSaleTokenomics(address).then((res) => {
      const data = {
        isSaleFinalized: res[6],
      };
      setTokenomics(data);
    });
  };

  const checkPrivateSaleEnded = () => {
    checkSaleEnded(address).then((res) => {
      console.log(res);
      setSaleEnded(res);
    });
  };

  const hardCapReached = () => {
    checkHardcapReached(address).then((res) => {
      setHardcapReached(res);
    });
  };
  // write functions
  const submit = () => {
    setisLoading(true);
    const amount = formRef.current.getFieldValue("investAmount");
    getTokenBalance(saleData.tokenAddress).then((res) => {
      const userAmount = fromWeiConverter(res);
      if (userAmount >= amount) {
        getApproveTokenContract(
          saleData?.tokenAddress,
          address,
          "10000000000000000000000000000000000000"
        )
          .send({ from: account })
          .then((res) => {
            buyPrivateSale(decimalConverter(amount), address)
              .send({ from: account })
              .then((res) => {
                getTokenomics256();
                getData();
                checkPrivateSaleEnded();
                hardCapReached();
                console.log(res);
              })
              .catch((err) => {
                setisLoading(false);
                console.log(err);
              });
          });
      } else {
        setisLoading(false);
        message.error("You dont have enough WMATIC");
      }
    });
  };

  const claimPrivateSaleFunction = () => {
    setisLoading(true);
    claimPrivateSaleToken(address)
      .send({ from: account })
      .then((res) => {
        getTokenomics();
        getData();
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  const claimPrivateSale = () => {
    setisLoading(true);
    if (!tokenomics.isSaleFinalized) {
      finalizeSale(address)
        .send({
          from: account,
        })
        .then((res) => {
          console.log(false);
          setisLoading(false);
          getTokenomics();
        })
        .catch(() => {
          setisLoading(false);
          message.error("Denied Transaction");
        });
    } else {
      claimPrivateSaleFunction();
    }
  };

  //Page components
  const LaunchpadHeading = ({ saleEnded }) => {
    return (
      <>
        <article className="media pool-detail" style={{ position: "relative" }}>
          <div className="media-left">
            <p className="image is-48x48">
              <img
                src={saleData.saleLogo}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    process.env.PUBLIC_URL + "/assets/logo.png";
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
                    {saleData?.saleTitle}{" "}
                    {isOwner && (
                      <span style={{ marginLeft: "10px" }}>
                        <FaKey color="#ffa701" size={20} />
                      </span>
                    )}
                  </h1>
                  <div className="flex status-wrapper">
                    <div className="flex" />
                    <div className="status-space" />
                    <div className="flex">
                      <div>
                        {!saleEnded ? (
                          saleStatus(
                            saleData?.saleStartTime,
                            saleData?.saleEndTime
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
                              <span style={{ whiteSpace: "nowrap" }}>
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
                  saleData?.saleWebsite,
                  saleData?.saleFacebook,
                  saleData?.saleTwitter,
                  saleData?.saleGithub,
                  saleData?.saleInstagram
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
                <td>Soft Cap</td>
                <td className="has-text-right">
                  {fromWeiConverter(saleData?.saleSoftcap)}{" "}
                  <a style={{ cursor: "none" }}>{TokenDetails?.[1]}</a>
                </td>
              </tr>
              <tr>
                <td>Hard Cap</td>
                <td className="has-text-right">
                  {fromWeiConverter(saleData?.saleHardCap)}{" "}
                  <a style={{ cursor: "none" }}>{TokenDetails?.[1]}</a>
                </td>
              </tr>
              <tr>
                <td>Private Sale Start Time</td>
                <td className="has-text-right">
                  {" "}
                  {moment(saleData?.saleStartTime * 1000).format(
                    "MMM Do YYYY hh:mm:ss a"
                  )}
                </td>
              </tr>
              <tr>
                <td>Private Sale End Time</td>
                <td className="has-text-right">
                  {" "}
                  {moment(saleData?.saleEndTime * 1000).format(
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
  const LaunchpadInfo = ({ isSaleFinalized }) => {
    return (
      <>
        <div className="column is-flex-grow-1">
          {" "}
          <Card bordered={false}>
            <div
              data-show="true"
              className="ant-alert ant-alert-warning ant-alert-no-icon"
              role="alert"
              style={{ marginBottom: 10 }}
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
                  tokenomics256?.raisedFund,
                  tokenomics256?.hardCap
                )}
                showInfo={true}
                size="small"
              />
              {/* <div className="is-flex is-align-items-center is-size-7">
                <div className="is-flex-grow-1">
                  {DivideBy18(Tokonomics?.[8])}
                  <a style={{ cursor: "none" }}>{TokenDetails?.[1]}</a>
                </div>
                <div className="is-flex-grow-1 has-text-right">
                  {DivideBy18(Tokonomics?.[2])}
                  {<a style={{ cursor: "none" }}>{TokenDetails?.[1]}</a>}
                </div>
              </div> */}
            </div>
            {/* <div className="has-text-centered">This pool has ended</div> */}

            <div style={{ textAlign: "center" }}>
              {!saleEnded || !isHardCapReached ? (
                <>
                  {countDown(
                    saleData?.saleStartTime,
                    saleData?.saleStartTime,
                    saleEnded
                  )}
                  <Form layout="vertical" onFinish={null} ref={formRef}>
                    <Form.Item
                      name="investAmount"
                      label={
                        "Amount (max: " +
                        fromWeiConverter(saleData?.saleMaxBuy) +
                        ")"
                      }
                    >
                      <InputNumber placeholder="0.00" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={submit}
                        disabled={!active}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              ) : null}
              {saleEnded && <div>This pool has ended</div>}
              {isHardCapReached && (
                <Button
                  type="primary"
                  onClick={claimPrivateSale}
                  disabled={!active || !isOwner}
                >
                  {isSaleFinalized ? "Claim Token" : "Finalize Sale"}
                </Button>
              )}
            </div>
          </Card>
          <div style={{ height: "24px" }}></div>
          <Card bordered={false}>
            <div className="table-container">
              <table>
                <tbody>
                  {/* <tr>
                    <td>Unsold token</td>
                    <td className="has-text-right">0 {TokenDetails?.[1]}</td>
                  </tr> */}
                  {/* <tr>
                    <td>Sale type</td>
                    <td className="has-text-right has-text-primary">Public</td>
                  </tr> */}
                  <tr>
                    <td>Minimum Buy</td>
                    <td className="has-text-right">
                      {fromWeiConverter(saleData?.saleMinBuy)}
                    </td>
                  </tr>
                  <tr>
                    <td>Maximum Buy</td>
                    <td className="has-text-right">
                      {fromWeiConverter(saleData?.saleMaxBuy)}
                    </td>
                  </tr>
                  {/* <tr>
                    <td>You purchased</td>
                    <td className="has-text-right">
                      {DivideBy18(InvestDataTrack?.[0])}
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </Card>
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
            <LaunchpadHeading saleEnded={saleEnded} />
            <TableInfo />
          </Card>
        </div>

        <LaunchpadInfo isSaleFinalized={tokenomics?.isSaleFinalized} />
      </div>
    </div>
  );
};

export default PrivateSalePage;

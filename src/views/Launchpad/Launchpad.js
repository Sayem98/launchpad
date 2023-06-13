import React, { useState, useEffect } from "react";
import StepsBar from "../../components/StepsBar";
import { Card } from "antd";
import Step1 from "../../components/LaunchpadSteps/Step1";
import Step2 from "../../components/LaunchpadSteps/Step2";
import Step3 from "../../components/LaunchpadSteps/Step3";
import Step4 from "../../components/LaunchpadSteps/Step4";
import { web3DeployContract } from "../../utils/contractHelper";
import { useWeb3React } from "@web3-react/core";
import ICOABI from "../../config/abi/Launchpad/ico.abi.json";
import { ICOByteCode } from "../../config/abi/Launchpad/ico.bytecode";
import Web3 from "web3";
import { DEFAULT_NETWORK } from "../../config/constant/constant";
import { useTokenContract } from "../../hooks/useContract";
import Loading from "../../components/Loading/Loading";
import Success from "../StatusPage/Success";
import Error from "../StatusPage/Error";
import { ChainsInfo } from "../../config/config.chain";

function Launchpad() {
  const { library, account, active } = useWeb3React();
  const { getTokenName, getTokenSymbol } = useTokenContract();
  const onClose = (e) => {
    console.log(e, "I was closed.");
  };
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [refundType, setRefundType] = useState("refund");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  const next = () => {
    setCurrent(current + 1);
  };
  const { chainId } = useWeb3React();

  const prev = () => {
    setCurrent(current - 1);
  };

  const stepsInfo = [
    {
      title: "Verify Token",
      description: "Enter the token address and verify",
    },
    {
      title: "Crypto Factory Info",
      description:
        "Enter the Crypto Factory information that you want to raise , that should be enter all details about your presale",
    },
    {
      title: "Add Additional Info",
      description: "Let people know who you are",
    },
    {
      title: "Finish",
      description: "Review your information",
    },
  ];
  const handleSubmit = (values) => {
    setData({ ...data, ...values });
    next();
    console.log(data);
  };
  const handleSubmitFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  const handleRefundType = (type) => {
    setRefundType(type);
  };

  const decimalConverter = (value) =>
    new Web3().utils.toWei(value.toString(), "ether");

  const confirmSubmit = async () => {
    console.log("ran");
    console.log(
      data?.tokenName,
      data?.tokenSymbol,
      data?.logoUrl,
      data?.websiteUrl || "",
      data?.twitterUrl || "",
      data?.instagramUrl || "",
      data?.description || ""
    );
    console.log(data);
    console.log(data?.startDate);
    console.log(data?.payoutToken);

    const startDate = parseInt(new Date(data?.startDate).getTime() / 1000);
    const endDate = parseInt(new Date(data?.endDate).getTime() / 1000);

    let _stringsList = [
      await getTokenName(data?.tokenAddress),
      await getTokenSymbol(data?.tokenAddress),
      data?.logoUrl || "",
      data?.websiteUrl || "",
      data?.twitterUrl || "",
      data?.instagramUrl || "",
      data?.description || "",
    ];
    // let _numericsList = ["5000000000000000000", "5000000000000000000", "10000000000000000000", "1648616285000000000000000000", "16496162085000000000000000000", "1000000000000000000", "10000000000000000000"];
    let _numericsList = [
      decimalConverter(data?.presaleRate),
      decimalConverter(data?.softCap),
      decimalConverter(data?.hardCap),
      decimalConverter(startDate),
      decimalConverter(endDate),
      decimalConverter(data?.minBuy),
      decimalConverter(data?.maxBuy),
    ];

    let _factotyContract =
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].LAUNCHPAD_FC_ADDRESS;
    let _payoutContractAddress =
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN;
    let _idoTokenContractAddress = data?.tokenAddress;
    let _isStakingRequired = false;
    console.log(_numericsList, _stringsList);
    if (active) {
      setLoading(true);
      await web3DeployContract(library.provider, ICOABI)
        .deploy({
          data: ICOByteCode,
          arguments: [
            _stringsList,
            _numericsList,
            _factotyContract,
            _payoutContractAddress,
            _idoTokenContractAddress,
            _isStakingRequired,
          ],
        })
        .send({
          from: account,
        })
        .then((res) => {
          setLoading(false);
          setSuccess(true);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    }
  };
  if (success) {
    return <Success to={"/launchpads"} />;
  } else if (error) {
    return <Error />;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <StepsBar current={current} stepsInfo={stepsInfo} />
        <br />
        <div>
          {" "}
          {current === 0 && (
            <Card style={{ background: "white" }} bordered={false}>
              <Step1
                handleSubmit={handleSubmit}
                handleRefundType={handleRefundType}
                data={data}
                prev={prev}
                handleSubmitFailed={handleSubmitFailed}
              />
            </Card>
          )}
          {current === 1 && (
            <Card style={{ background: "white" }} bordered={false}>
              <Step2
                handleSubmit={handleSubmit}
                handleRefundType={handleRefundType}
                data={data}
                prev={prev}
              />
            </Card>
          )}
          {current === 2 && (
            <Card style={{ background: "white" }} bordered={false}>
              <Step3
                handleSubmit={handleSubmit}
                handleRefundType={handleRefundType}
                data={data}
                prev={prev}
              />
            </Card>
          )}
          {current === 3 && (
            <Card style={{ background: "white" }} bordered={false}>
              <Step4
                handleSubmit={confirmSubmit}
                handleRefundType={handleRefundType}
                data={data}
                prev={prev}
              />
            </Card>
          )}
        </div>
      </div>
    );
  }
}

export default Launchpad;

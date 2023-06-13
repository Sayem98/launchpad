import React, { useEffect, useState } from "react";
import StepsBar from "../../components/StepsBar";
import {
  Card,
  Alert,
  Button,
  Space,
  Radio,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import Step1 from "../../components/PrivateSaleSteps/Step1";
import Step2 from "../../components/PrivateSaleSteps/Step2";
import Step3 from "../../components/PrivateSaleSteps/Step3";
import Step4 from "../../components/PrivateSaleSteps/Step4";
import { web3DeployContract } from "../../utils/contractHelper";
import { useWeb3React } from "@web3-react/core";
import { PRIVATE_SALE_BYTECODE } from "../../config/abi/PrivateSale/privateSale.bytecode";
import PrivateSaleABI from "../../config/abi/PrivateSale/privateSale.abi.json";
import { DEFAULT_NETWORK } from "../../config/constant/constant";
import Loading from "../../components/Loading/Loading";
import Success from "../StatusPage/Success";
import Error from "../StatusPage/Error";
import { decimalConverter } from "../../utils";
import { useTokenContract } from "../../hooks/useContract";
import { ChainsInfo } from "../../config/config.chain";

function PrivateSale() {
  const { library, account, active, chainId } = useWeb3React();
  const onClose = (e) => {
    console.log(e, "I was closed.");
  };
  const [data, setData] = useState({});
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refundType, setRefundType] = useState("refund");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { getTokenName, getTokenSymbol } = useTokenContract();
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const stepsInfo = [
    {
      title: "Verify Token",
      description: "Enter the token address and verify",
    },
    {
      title: "Private Sale Info",
      description:
        "Enter the private sale information that you want to raise , that should be enter all details about your private sale",
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
  const handleRefundType = (type) => {
    setRefundType(type);
  };

  const confirmSubmit = async () => {
    console.log(data);

    //Params 1
    let _tokenName = await getTokenName(
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN
    );
    let _tokenSymbol = await getTokenSymbol(
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN
    );
    let _saleTitle = data?.saleTitle;
    let _logoUrl = data?.logoUrl;
    let _website = data?.websiteUrl;
    let _facebook = data?.facebookUrl || "";
    let _twitter = data?.twitterUrl || "";
    let _github = data?.githubUrl || "";
    let _telegram = data?.telegramUrl || "";
    let _instagram = data?.instagramUrl || "";
    let _discord = data?.discordUrl || "";
    let _reddit = data?.redditUrl || "";
    let _description = data?.description || "";

    // Params 2
    let _softCap = decimalConverter(parseFloat(data?.softCap));
    let _hardCap = decimalConverter(parseFloat(data?.hardCap));
    let _minimumInvestment = decimalConverter(parseFloat(data?.minBuy));
    let _maxInvestment = decimalConverter(parseFloat(data?.maxBuy));
    let _startTime = decimalConverter(
      parseInt(new Date(data?.startDate).getTime() / 1000)
    );
    let _endTime = decimalConverter(
      parseInt(new Date(data?.endDate).getTime() / 1000)
    );
    let _tgeValue = decimalConverter(parseFloat(data?.initialRelease));
    let _vestingCycle = decimalConverter(parseFloat(data?.vestingCycle) * 60);
    console.log(_vestingCycle);
    let _vestingCylePer = decimalConverter(parseFloat(data?.fundRelease));
    // let _whiteListEnable = data?.isWhiteList;
    let _whiteListEnable = false;
    let _tokenAddress = ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN;
    let _owner = account;
    let _factoryContract =
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK]
        .PRIVATE_SALE_FACTORY_CONTRACT;

    const params1 = [
      _tokenName,
      _tokenSymbol,
      _saleTitle,
      _logoUrl,
      _website,
      _facebook,
      _twitter,
      _github,
      _telegram,
      _instagram,
      _discord,
      _reddit,
      _description,
    ];

    const params2 = [
      _startTime,
      _endTime,
      _softCap,
      _hardCap,
      _minimumInvestment,
      _maxInvestment,
      _tgeValue,
      _vestingCycle,
      _vestingCylePer,
      _factoryContract,
      _tokenAddress,
      _owner,
      _whiteListEnable,
    ];
    console.log(params1);
    console.log(params2);

    if (active) {
      setLoading(true);
      await web3DeployContract(library.provider, PrivateSaleABI)
        .deploy({
          data: PRIVATE_SALE_BYTECODE,
          arguments: [params1, params2],
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
    return <Success to={"/private-sale"} />;
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

export default PrivateSale;

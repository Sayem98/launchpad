import { Card, Form, Input, Button, message } from "antd";
import React, { useState } from "react";
import Step1 from "../../components/AirdropSteps/Step1";
import Step2 from "../../components/AirdropSteps/Step2";
import { useWeb3React } from "@web3-react/core";
import { web3DeployContract } from "../../utils/contractHelper";
import AirdropABI from "../../config/abi/Airdrop/airdrop.abi.json";
import { AirdropBytecode } from "../../config/abi/Airdrop/airdrop.bytecode";
import { AIRDROP_FACTORY_CONTRACT, DEFAULT_NETWORK } from "../../config/constant/constant";
import Success from "../StatusPage/Success";
import Error from "../StatusPage/Error";
import Loading from "../../components/Loading/Loading";
import { decimalConverter } from "../../utils";
import { ChainsInfo } from "../../config/config.chain";

function Airdrop() {
  const [data, setData] = useState({});
  const { library, active, account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onClose = (e) => {
    console.log(e, "I was closed.");
  };
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = (values) => {
    setData({ ...data, ...values });
    next();
    console.log(data);
  };
  const {chainId} = useWeb3React()

  const handleFinish = (values) => {
    const startTime = Date.now();
    setData({ ...data, ...values });
    const finalData = { ...data, ...values };
    const contractParams = [
      "Static",
      "STA",
      finalData.airdropTitle || "",
      finalData.logoUrl || "",
      finalData.websiteUrl || "",
      finalData.facebookUrl || "",
      finalData.twitterUrl || "",
      finalData.githubUrl || "",
      finalData.telegramUrl || "",
      finalData.instagramUrl || "",
      finalData.discordUrl || "",
      finalData.redditUrl || "",
      finalData.description || "",
      // "100000000000",
      decimalConverter(startTime),
      "10000000000000000000",
      "100000000000000000000",
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].AIRDROP_FACTORY_CONTRACT,
      finalData.tokenAddress,
      account,
    ];
    console.log(contractParams);
    if (active) {
      setLoading(true);
      web3DeployContract(library.provider, AirdropABI)
        .deploy({
          data: AirdropBytecode,
          arguments: [contractParams],
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
    } else {
      message.error("Wallet not active");
    }
  };
  if (success) {
    return <Success to={"/airdrops"} />;
  } else if (error) {
    return <Error />;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="launchpad-title">
          <h1 className="pb-6">Create New Airdrop</h1>
        </div>
        <Card style={{ background: "white" }} bordered={false}>
          {current === 0 && <Step1 handleSubmit={handleSubmit} data={data} />}
          {current === 1 && (
            <Step2 handleSubmit={handleFinish} prev={prev} data={data} />
          )}
        </Card>
      </div>
    );
  }
}

export default Airdrop;

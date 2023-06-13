import { Card, Form, Input, Button, message } from "antd";
import React, { useState } from "react";
import Step1 from "../../components/StakingSteps/Step1";
import Step2 from "../../components/StakingSteps/Step2";
import { useWeb3React } from "@web3-react/core";
import { web3DeployContract } from "../../utils/contractHelper";
import StakingABI from "../../config/abi/Staking/staking.abi.json";
import { StakingBytecode } from "../../config/abi/Staking/staking.bytecode";
import {
  DEFAULT_NETWORK,
  STAKING_FACTORY_CONTRACT,
} from "../../config/constant/constant";
import Success from "../StatusPage/Success";
import Error from "../StatusPage/Error";
import Loading from "../../components/Loading/Loading";
import { ChainsInfo } from "../../config/config.chain";
import { useTokenContract } from "../../hooks/useContract";

function Staking() {
  const { getTokenName, getTokenSymbol } = useTokenContract();
  const [data, setData] = useState({});
  const { library, active, account, chainId } = useWeb3React();
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

  const handleFinish = async (values) => {
    setData({ ...data, ...values });
    const finalData = { ...data, ...values };
    console.log(finalData);
    let _tokenName = await getTokenName(finalData.tokenAddress);
    let _tokenSymbol = await getTokenSymbol(finalData.tokenAddress);

    const contractParams = [
      _tokenName,
      _tokenSymbol,
      finalData.stakingTitle || "",
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
      "100000000000",
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].STAKING_FACTORY_CONTRACT,
      finalData.tokenAddress,
      account,
    ];
    if (active) {
      setLoading(true);
      const contract = web3DeployContract(library.provider, StakingABI)
        .deploy({
          data: StakingBytecode,
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
    return <Success to={"/stakings"} />;
  } else if (error) {
    return <Error />;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="launchpad-title">
          <h1 className="pb-6">Create Staking</h1>
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

export default Staking;

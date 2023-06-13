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
import moment from "moment";
import { useTokenContract } from "../../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { ChainsInfo } from "../../config/config.chain";
import { DEFAULT_NETWORK } from "../../config/constant/constant";

export default function Step4({ handleSubmit, prev, data }) {
  const { getTokenSymbol, getTokenName, getTokenBalance, getTokenDecimal } =
    useTokenContract();
  const { active, chainId } = useWeb3React();
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenDecimal, setTokenDecimal] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");

  useEffect(() => {
    // if (active) {
    getTokenSymbol(ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN).then(
      (res) => {
        setTokenSymbol(res);
      }
    );
    getTokenName(ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN).then(
      (res) => {
        setTokenName(res);
      }
    );
    getTokenBalance(ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN).then(
      (res) => {
        setTokenBalance(res);
      }
    );
    getTokenDecimal(ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN).then(
      (res) => {
        setTokenDecimal(res);
      }
    );
    // }
  }, [active]);

  return (
    <div className="table-container mt-0">
      <table>
        <tbody>
          <tr>
            <td>Token Address</td>
            <td className="has-text-right">{data?.tokenAddress}</td>
          </tr>
          <tr>
            <td>Token Name</td>
            <td className="has-text-right">{tokenName}</td>
          </tr>
          <tr>
            <td>Token Symbol</td>
            <td className="has-text-right">{tokenSymbol}</td>
          </tr>
          <tr>
            <td>Token decimals</td>
            <td className="has-text-right">{tokenDecimal}</td>
          </tr>
          <tr>
            <td>Presale rate</td>
            <td className="has-text-right">
              {data?.presaleRate} {tokenSymbol}
            </td>
          </tr>
          <tr>
            <td>Softcap</td>
            <td className="has-text-right">
              {data?.hardCap} {tokenSymbol}
            </td>
          </tr>
          <tr>
            <td>Hardcap</td>
            <td className="has-text-right">
              {data?.softCap} {tokenSymbol}
            </td>
          </tr>
          <tr>
            <td>Minimum buy</td>
            <td className="has-text-right">
              {data?.minBuy} {tokenSymbol}
            </td>
          </tr>
          <tr>
            <td>Maximum buy</td>
            <td className="has-text-right">
              {data?.maxBuy} {tokenSymbol}
            </td>
          </tr>
          <tr>
            <td>Start time</td>
            <td className="has-text-right">
              {moment(data?.startDate).format("DD/MM/YYYY")}
            </td>
          </tr>
          <tr>
            <td>End time</td>
            <td className="has-text-right">
              {moment(data?.endDate).format("DD/MM/YYYY")}
            </td>
          </tr>
          <tr>
            <td>Logo</td>
            <td className="has-text-right">{data?.logoUrl}</td>
          </tr>
          <tr>
            <td>Website</td>
            <td className="has-text-right">{data?.websiteUrl}</td>
          </tr>
          {data?.facebookUrl && (
            <tr>
              <td>Facebook</td>
              <td className="has-text-right">{data?.facebookUrl}</td>
            </tr>
          )}
          {data?.twitterUrl && (
            <tr>
              <td>Twitter</td>
              <td className="has-text-right">{data?.twitterUrl}</td>
            </tr>
          )}
          {data?.telegramUrl && (
            <tr>
              <td>Telegram</td>
              <td className="has-text-right">{data?.telegramUrl}</td>
            </tr>
          )}{" "}
          {data?.githubUrl && (
            <tr>
              <td>Github</td>
              <td className="has-text-right">{data?.githubUrl}</td>
            </tr>
          )}{" "}
          {data?.instagramUrl && (
            <tr>
              <td>Instagram</td>
              <td className="has-text-right">{data?.instagramUrl}</td>
            </tr>
          )}{" "}
          {data?.discordUrl && (
            <tr>
              <td>Discord</td>
              <td className="has-text-right">{data?.discordUrl}</td>
            </tr>
          )}{" "}
          {data?.redditUrl && (
            <tr>
              <td>Reddit</td>
              <td className="has-text-right">{data?.redditUrl}</td>
            </tr>
          )}{" "}
          {data?.description && (
            <tr>
              <td>Description</td>
              <td className="has-text-right">{data?.description}</td>
            </tr>
          )}{" "}
        </tbody>
      </table>
      <div className="has-text-centered">
        <Button onClick={prev}>Previous</Button>
        <Button type="primary" onClick={handleSubmit} disabled={!active}>
          Confirm
        </Button>
      </div>
    </div>
  );
}

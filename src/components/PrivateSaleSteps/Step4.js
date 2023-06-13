import React from "react";

import { Button } from "antd";
import moment from "moment";
import { useWeb3React } from "@web3-react/core";
import { ChainsInfo } from "../../config/config.chain";
import { DEFAULT_NETWORK } from "../../config/constant/constant";

export default function Step4({ handleSubmit, prev, data }) {
  const { active, chainId } = useWeb3React();

  return (
    <div className="table-container mt-0">
      <table>
        <tbody>
          <tr>
            <td>Softcap</td>
            <td className="has-text-right">
              {data?.hardCap}{" "}
              {ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN}
            </td>
          </tr>
          <tr>
            <td>Hardcap</td>
            <td className="has-text-right">
              {data?.softCap}{" "}
              {ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN}
            </td>
          </tr>
          <tr>
            <td>Minimum buy</td>
            <td className="has-text-right">
              {data?.minBuy}{" "}
              {ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN}
            </td>
          </tr>
          <tr>
            <td>Maximum buy</td>
            <td className="has-text-right">
              {data?.maxBuy}{" "}
              {ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN}
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
            <td>Liquidity lockup time</td>
            <td className="has-text-right">18</td>
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

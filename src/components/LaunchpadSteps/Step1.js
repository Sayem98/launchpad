import React, { useEffect, useState } from "react";
import StepsBar from "../../components/StepsBar";
import { Button, Space, Radio, Form, Input } from "antd";
import Web3 from "web3";
import { checkTokenAddress } from "../../hooks/useValidation";
import { DEFAULT_NETWORK } from "../../config/constant/constant";
import { ChainsInfo } from "../../config/config.chain";
import { useWeb3React } from "@web3-react/core";

export default function Step1({
  handleSubmit,
  data,
  setPayoutToken,
  handleSubmitFailed,
}) {
  const { chainId, active } = useWeb3React();

  const radioOption = [
    {
      label: "BUSD",
      value: ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].BUSD_TOKEN,
    },
    {
      label: "USDT",
      value: ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].USDT_TOKEN,
    },
  ];

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      onFinishFailed={handleSubmitFailed}
    >
      {" "}
      <Form.Item
        name="tokenAddress"
        label="Token address"
        initialValue={data?.tokenAddress}
        rules={[
          {
            validator: (_, address) => checkTokenAddress(address),
          },
        ]}
      >
        <Input placeholder="Ex: LpadMoon" bordered={false} />
      </Form.Item>
      {/* Currency */}
      {/* <Form.Item
        label="Currency"
        name="currency"
        initialValue={data?.currency}
        rules={[
          {
            required: true,
            message: "Please enter correct data!",
          },
        ]}
      >
        <Radio.Group options={radioOption} onChange={setPayoutToken} />
      </Form.Item> */}
      <Form.Item>
        <div className="has-text-centered">
          <Button
            type="primary"
            htmlType="submit"
            disabled={!active}
            // disabled={
            //   !form.isFieldsTouched(true) ||
            //   !!form
            //     .getFieldsError()
            //     .filter(({ errors }) => errors.length).length
            // }
          >
            Next
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

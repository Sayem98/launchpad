import React from "react";
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
import { DEFAULT_NETWORK } from "../../config/constant/constant";
import { ChainsInfo } from "../../config/config.chain";
import { useWeb3React } from "@web3-react/core";

export default function Step1({ handleSubmit, data }) {
  const { chainId, active } = useWeb3React();

  const radioOption = [
    {
      label: "BUSD",
      value: ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN,
    },
    {
      label: "USDT",
      value: ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].TOKEN,
    },
  ];

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      // form={form}
    >
      {" "}
      <Form.Item
        name="saleTitle"
        label="Title"
        initialValue={data?.saleTitle}
        rules={[
          {
            required: true,
            message: "Please enter title!",
          },
        ]}
      >
        <Input placeholder="Ex: This is my private sale" />
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
        <Radio.Group options={radioOption} />
      </Form.Item> */}
      <Form.Item>
        <div className="has-text-centered">
          <Button type="primary" htmlType="submit" disabled={!active}>
            Next
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

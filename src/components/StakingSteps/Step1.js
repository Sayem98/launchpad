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
import Web3 from "web3";
import { checkTokenAddress } from "../../hooks/useValidation";
import { useWeb3React } from "@web3-react/core";

export default function Step1({ handleSubmit, data }) {
  const {chainId, active} = useWeb3React()

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      {" "}
      <Form.Item
        name="tokenAddress"
        label="Token address"
        initialValue={data?.tokenAddress}
        rules={[
          {
            validator: (_, tokenAddress) => checkTokenAddress(tokenAddress),
          },
        ]}
      >
        <Input placeholder="Ex: LPadMoon" />
      </Form.Item>
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

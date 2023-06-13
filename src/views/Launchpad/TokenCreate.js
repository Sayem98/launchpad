/* eslint-disable no-undef */
import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Space,
  Row,
  Col,
  InputNumber,
  Typography,
  message,
} from "antd";

import { STANDARD_TOKEN_BYTECODE } from "../../config/abi/Token/standard/bytecode";

import { useTokenContract } from "../../hooks/useContract";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { BNB_FEES, FEE_RECIVE } from "../../config/constant/constant";
import Loading from "../../components/Loading/Loading";

function TokenCreate() {
  const { getStandartTokenContract } = useTokenContract();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { account, active } = useWeb3React();
  const [tokenType, setTokenType] = useState("standard");

  const handleTokenType = (type) => {
    setTokenType(type);
  };

  const handleSubmitToken = (values) => {
    if (!active) {
      message.error("Wallet is not connect!");
    } else {
      //Basic Token Deatils
      var name_ = values.name;
      var symbol_ = values.symbol;
      var decimals_ = values.decimals;
      var totalSupply_ = new Web3().utils.toWei(
        values.totalsupply.toString(),
        "ether"
      );

      //Service Provider fees
      var serviceFeeReceiver_ = FEE_RECIVE;
      var serviceFee_ = BNB_FEES;

      setIsLoading(true);
      switch (tokenType) {
        case "standard":
          getStandartTokenContract()
            .deploy({
              data: STANDARD_TOKEN_BYTECODE,
              arguments: [
                name_,
                symbol_,
                decimals_,
                totalSupply_,
                serviceFeeReceiver_,
                serviceFee_,
              ],
            })
            .send({
              from: account,
              value: "10000000000000000",
            })
            .then((res) => {
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
            });

          break;
        default:
          console.log("das");
      }
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Card style={{ background: "white" }} bordered={false}>
        <Form
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={handleSubmitToken}
          form={form}
        >
          <p className="has-text-primary is-size-7">(*) is required field.</p>
          <Form.Item label="Token Type" required>
            <Select defaultValue="standard" onChange={handleTokenType}>
              <Select.Option value="standard">Standard Token </Select.Option>
            </Select>
            <p className="help is-info">0.01 BNB</p>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Token name cannot be blank" }]}
          >
            <Input placeholder="Ex: Ethereum" bordered={false} />
          </Form.Item>
          <Form.Item
            name="symbol"
            label="Symbol"
            rules={[
              { required: true, message: "Token Symbol is a required field" },
            ]}
          >
            <Input placeholder="Ex: ETH" bordered={false} />
          </Form.Item>
          {tokenType === "standard" && (
            <Form.Item
              name="decimals"
              label="Decimals"
              rules={[{ required: true, message: "Invalid decimals" }]}
            >
              <InputNumber
                htmlType="number"
                placeholder="Ex: 18"
                min={1}
                max={18}
                width="100%"
                bordered={false}
              />
            </Form.Item>
          )}
          <Form.Item
            name="totalsupply"
            label="Total supply"
            rules={[
              {
                required: true,
                message: "totalSupply is a required field",
              },
            ]}
          >
            <InputNumber
              placeholder="Ex: 10000000000"
              min={1}
              width="100%"
              bordered={false}
            />
          </Form.Item>
          {tokenType !== "standard" && (
            <Form.Item label="Router" name="router" required>
              <Select
                // defaultValue="0xD99D1c33F9fC3444f8101754aBC46c52416550D1"
                placeholder="Select a router"
                onChange={setRouterType}
              >
                <Select.Option value="0xD99D1c33F9fC3444f8101754aBC46c52416550D1">
                  PancakeSwap(UPDATE CONTRACT IN OTHER NETWORK)
                </Select.Option>
                <Select.Option value="0xBBe737384C2A26B15E23a181BDfBd9Ec49E00248">
                  LPadSale(UPDATE CONTRACT IN OTHER NETWORK)
                </Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item
            shouldUpdate
            style={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
            }}
            wrapperCol={{ span: 16 }}
          >
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                className="create-token-btn"
                style={{ margin: "auto" }}
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Create Token
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default TokenCreate;

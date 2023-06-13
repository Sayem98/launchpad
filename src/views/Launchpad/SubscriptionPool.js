import React, { useState } from "react";
import StepsBar from "../../components/StepsBar";
import { Card, Button, Space, Radio, Form, Input } from "antd";

function SubscriptionPool() {
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

  const stepsInfo = [
    {
      title: "Verify Token",
      description: "Enter the token address and verify",
    },
    {
      title: "DeFi Fairlaunch Info",
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
  return (
    <div>
      <StepsBar current={current} stepsInfo={stepsInfo} />
      <br />
      <div>
        {" "}
        <Card style={{ background: "white" }}>
          <Form initialValues={{ remember: true }} layout="vertical">
            <Form.Item name="tokenAddress" label="Token address" required>
              <Input placeholder="Ex: 0x00000" />
              <p className="help is-info">Pool creation fee: 0.01 BNB</p>
            </Form.Item>
            <Form.Item label="Currency">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="bnb"> BNB </Radio>
                  <Radio value="busd"> BUSD </Radio>
                  <Radio value="usdt"> USDT </Radio>
                  <Radio value="usdc"> USDC </Radio>
                </Space>
              </Radio.Group>
              <p className="help is-info">
                Users will pay with BNB for your token
              </p>
            </Form.Item>
            <Form.Item label="Fee Options">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="5%"> 5% BUSD raised only </Radio>
                  <Radio value=""> 2% BUSD raised + 2% token sold</Radio>
                </Space>
              </Radio.Group>
              <p className="help is-info">
                Users will pay with BNB for your token
              </p>
            </Form.Item>

            <br />
            <div className="has-text-centered">
              {current < stepsInfo.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === stepsInfo.length - 1 && (
                <Button
                  type="primary"
                  // onClick={() => message.success("Processing complete!")}
                >
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  Previous
                </Button>
              )}
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default SubscriptionPool;

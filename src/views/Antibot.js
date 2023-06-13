import { Button, Card, Form, Input } from "antd";
import React, { useState } from "react";

function Antibot() {
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
  return (
    <div>
      {" "}
      <Card style={{ background: "white" }}>
        <Form initialValues={{ remember: true }} layout="vertical">
          <Form.Item name="tokenAddress" label="Token address" required>
            <Input placeholder="Ex: LPadMoon" />
            <div className="help is-info s-size-8">
              Choose a token to integrate with LPad Anti-Bot.
              <br /> Check out the guide how to integrate LPad Anti-Bot for
              custom contract here:{" "}
              
            </div>
          </Form.Item>
          <br />
          <div className="has-text-centered">
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Antibot;

import React, { useState } from "react";
import { Steps } from "antd";

function StepsBar({ current, stepsInfo }) {
  const { Step } = Steps;

  return (
    <div>
      {" "}
      <Steps current={current}>
        {stepsInfo.map((item, key) => (
          <Step title={item.title} description={item.description} key={key} />
        ))}
      </Steps>
    </div>
  );
}

export default StepsBar;

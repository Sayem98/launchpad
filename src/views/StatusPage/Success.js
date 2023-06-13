import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const Success = ({ to }) => (
  <Result
    status="success"
    title="Transaction is successfull"
    // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={
      <Link to={to}>
        <Button type="primary" key="console">
          Go Console
        </Button>
      </Link>
    }
  />
);
export default Success;

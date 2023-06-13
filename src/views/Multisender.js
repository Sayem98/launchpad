import React, { useState } from "react";
import { Form, Input, Card, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { useTokenContract } from "../hooks/useContract";
import StepsBar from "../components/StepsBar";
import Web3 from "web3";
import { DEFAULT_NETWORK } from "../config/constant/constant";
import { checkTokenAddress } from "../hooks/useValidation";
import Loading from "../components/Loading/Loading";
import Success from "./StatusPage/Success";
import Error from "./StatusPage/Error";
import { ChainsInfo } from "../config/config.chain";
const { TextArea } = Input;

const decimalConverter = (value) =>
  new Web3().utils.toWei(value.toString(), "ether");

function Multisender() {
  const [current, setCurrent] = useState(0);
  const { active, account, chainId } = useWeb3React();
  const [tokenAddress, setTokenAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [tokenDetails, setTokenDetails] = useState({
    address: 0,
    sum: 0,
  });
  const {
    getApproveTokenContract,
    getTokenSymbol,
    getTokenBalance,
    setMultiSender,
  } = useTokenContract();

  const handleSendToken = async (values) => {
    setTokenDetails({
      address: 0,
      sum: 0,
    });
    setTokenAddress(values.tokenAddress);
    let ammount = [];
    let address = [];

    let multiaddress = values?.allocation.split("\n");

    for (var i = 0; i < multiaddress.length; i++) {
      let data = multiaddress[i].split(" ");
      if (new Web3().utils.isAddress(data[0]) && !isNaN(data[1])) {
        address.push(data[0]);
        ammount.push(decimalConverter(data[1].toString()));
        // setSumAmmount(parseFloat(sumAmmount) + parseFloat(data[1]));
      }
    }
    if (!active) {
      message.error("Wallet is not connect!");
    } else {
      switch (current) {
        case 0:
        // next();
        // break;
        case 1:
          let sum = 0;
          for (let index = 0; index < ammount.length; index++) {
            sum += ammount[index];
          }
          console.log(sum);

          const check = new Web3().utils.isAddress(values.tokenAddress);
          console.log(check);
          if (check) {
            setLoading(true);
            await getApproveTokenContract(
              values.tokenAddress,
              ChainsInfo[chainId ? chainId : DEFAULT_NETWORK]
                .MULTISENDER_ADDRESS,
              sum
            )
              .send({
                from: account,
              })
              .then(async () => {
                await setMultiSender()
                  .methods.multisendToken(
                    values.tokenAddress,
                    false,
                    address,
                    ammount
                  )
                  .send({
                    from: account,
                    value: "",
                  })
                  .then(() => {
                    setLoading(false);
                    setSuccess(true);
                  })
                  .catch(() => {
                    setLoading(false);
                    message.error("Token don't Tranafer ");
                  });
              })
              .catch(() => {
                setLoading(false);
              });
          } else {
            setLoading(false);
            setError(true);
            message.error("Wrong Address!");
          }

          break;
      }
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const stepsInfo = [
    {
      title: "Add Your Allocation",
      description: "Enter your token to be send with allocations",
    },
    {
      title: "Confirmation",
      description: "Let review your information",
    },
  ];

  if (success) {
    return <Success to={"/"} />;
  } else if (error) {
    return <Error />;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <StepsBar current={current} stepsInfo={stepsInfo} />
        <br />
        <Card bordered={false}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={handleSendToken}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <>
              <Form.Item
                label="Token Address"
                name="tokenAddress"
                rules={[
                  {
                    validator: (_, address) => checkTokenAddress(address),
                  },
                ]}
              >
                <Input placeholder="Ex:0x000..." bordered={false} />
              </Form.Item>
              {/* <TokenTable /> */}
              <Form.Item label="Allocation" name="allocation">
                <TextArea
                  rows={10}
                  placeholder="Insert allocation: separate with breaks line. By format: address,amount or address amount
Ex:
0x0000000000000000000000000000000000001000 13.45
0x0000000000000000000000000000000000001000 1.049
0x0000000000000000000000000000000000001000 1"
                  bordered={false}
                />
              </Form.Item>
              <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={(e) => console.log("Upload event:", e)}
              >
                <Upload
                  name="logo"
                  accept=".csv"
                  beforeUpload={(file) => {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                      console.log(e.target.result);
                    };
                    reader.readAsText(file);

                    // Prevent upload
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />} disabled={!active}>
                    Click to upload
                  </Button>
                </Upload>
              </Form.Item>
            </>
            {/* {current === 1 && (
            <>
              {console.log(tokenDetails)}
              <table className="TableInfo_table__31voJ">
                <tbody>
                  <tr className="RowInfo_root__1XLti">
                    <td className="RowInfo_node__3kZFW">Token Address</td>
                    <td className="RowInfo_node__3kZFW">
                      <div className="has-text-info has-text-right">
                        {tokenAddress}
                      </div>
                    </td>
                  </tr>
                  <tr className="RowInfo_root__1XLti">
                    <td className="RowInfo_node__3kZFW">Total token address</td>
                    <td className="RowInfo_node__3kZFW">
                      <div className="has-text-info has-text-right">
                        {tokenDetails.address}
                      </div>
                    </td>
                  </tr>
                  <tr className="RowInfo_root__1XLti">
                    <td className="RowInfo_node__3kZFW">
                      Total amount to send
                    </td>
                    <td className="RowInfo_node__3kZFW">
                      <div className="has-text-info has-text-right">
                        {tokenDetails.sum}
                      </div>
                    </td>
                  </tr>
                  <tr className="RowInfo_root__1XLti">
                    <td className="RowInfo_node__3kZFW">Your token balance</td>
                    <td className="RowInfo_node__3kZFW">
                      <div className="has-text-info has-text-right">
                        {tokenDetails.sum}
                        {tokenAddress && getTokenBalance(tokenAddress)}
                        {tokenAddress && getTokenSymbol(tokenAddress)}
                      </div>
                    </td>
                  </tr>
                  <tr className="RowInfo_root__1XLti">
                    <td className="RowInfo_node__3kZFW">Token to send</td>
                    <td className="RowInfo_node__3kZFW">
                      <div className="has-text-info has-text-right">CAKE</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )} */}
            <div className="flex justify-center">
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!active}>
                  {"Process"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Multisender;

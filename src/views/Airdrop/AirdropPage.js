import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Form, Modal, Input, message } from "antd";
import { useAirdropContract } from "../../hooks/useContract";
import Web3 from "web3";
import { FaKey } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";
import { airdropSaleStatus, decimalConverter, socialIcons } from "../../utils";

export default function AirdropPage() {
  const { library, active, account } = useWeb3React();
  const [isOwner, setIsOwner] = useState(false);
  const { address } = useParams();

  const {
    getAirdropTokenAddress,
    setStartAirdrop,
    setCancelAirdrop,
    claimAirdropToken,
    setAllocationAirdropToken,
    setAirdropTransferOwnership,
    getAirdropDetails,
    approveAirdrop,
    checkAirdropStarted,
    checkAirdropCancelled,
    checkOwner,
    getAllAllocations,
    userAllocation
  } = useAirdropContract();
  const [loading, setLoading] = useState(false);
  const [airdropTokonomics, setAirdropTokonomics] = useState({});
  const [started, setStarted] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [allocations, setAllocations] = useState([]);
  const [accountAllocation, setAcountAllocation] = useState(null)
  useEffect(() => {
    getData();
    getAllocations();
    checkAirdropStarted(address).then((res) => {
      console.log(res);
      setStarted(res);
    });
    checkAirdropCancelled(address).then((res) => {
      console.log(res);
      setCancelled(res);
    });
  }, [cancelled, started, account]);

  useEffect(() => {
    
    if (active) {
      checkIsOwner();
      checkUserAllocation();

    }
  }, [active, account]);
  const getData = () => {
    setLoading(true);
    getAirdropDetails(address)
      .call()
      .then((res) => {
        // setAirdropTokonomics({ ...airdropTokonomics, tokenAddress: res });
        const data = {
          tokenName: res[0],
          tokenSymbol: res[1],
          tokenAddress: res[17],
          airdropTitle: res[2],
          airdropLogo: res[3],
          airdropWebsite: res[4],
          airdropFacebook: res[5],
          airdropTwitter: res[6],
          airdropGithub: res[7],
          airdropTelegram: res[8],
          airdropInstagram: res[9],
          airdropDiscord: res[10],
          airdropReddit: res[11],
          airdropDescription: res[12],
        };
        setAirdropTokonomics(data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {});
  };

  const startAirdrop = async () => {
    if (active) {
      setLoading(true);
      if(allocations[0].length !== 0){
      approveAirdrop(address, airdropTokonomics?.tokenAddress)
        .send({
          from: account,
        })
        .then(() => {
          const seconds = new Date().getTime() / 1000;
          console.log(seconds);
          console.log(decimalConverter(parseInt(seconds)));
          setStartAirdrop(address, parseInt(seconds))
            .send({
              from: account,
            })
            .then((res) => {
              console.log(res);
              setStarted(true);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            })
        })        
        .catch(() => {
          setLoading(false);
        })        
      } else {
        setLoading(false);
        message.error("You have to set allocation first!")
      }
    }
  };

  const cancelAirdrop = () => {
    if (active) {
      setLoading(true);
      setCancelAirdrop(address)
        .send({
          from: account,
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const claimToken = () => {
    if (active) {
      if(accountAllocation !== 0){
        setLoading(true);
        claimAirdropToken(address)
        .send({
          from: account,
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      } else {
        message.error("You don't have any allocation to claim")
      }
    }
  };

  const getAllocations = () => {
    getAllAllocations(address).then((res) => {
      setAllocations(res)
    })
  };

  const checkUserAllocation = () => {
    userAllocation(address).then((res) =>{ 
      console.log(res)
      setAcountAllocation(res)
    })
  }

  const TableInfo = () => {
    return (
      <div className="table-container mt-0">
        <table>
          <tbody>
            <tr>
              <td>Airdrop Address</td>
              <td className="has-text-right">{address}</td>
            </tr>
            <tr>
              <td>Token Address</td>
              <td className="has-text-right">
                {airdropTokonomics?.tokenAddress}
              </td>
            </tr>
            <tr>
              <td>Token Name</td>
              <td className="has-text-right">{airdropTokonomics?.tokenName}</td>
            </tr>
            <tr>
              <td>Token Symbol</td>
              <td className="has-text-right">
                {airdropTokonomics?.tokenSymbol}
              </td>
            </tr>
            <tr>
              <td>Token decimals</td>
              <td className="has-text-right">18</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const showTransferModal = () => {
    setIsTransferModalOpen(true);
  };
  const handleTransferOk = () => {
    setIsTransferModalOpen(false);
    setLoading(false);
  };
  const handleTransferCancel = () => {
    setIsTransferModalOpen(false);
  };

  const checkIsOwner = () => {
    checkOwner(address).then((res) => {
      if (res.toLowerCase() === account.toLowerCase()) {
        setIsOwner(true);
        console.log(true);
      } else {
        setIsOwner(false);
        console.log(false);
      }
    });
  };
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="flex">
          <div className="column is-flex-grow-2">
            <Card bordered={false}>
              <LaunchpadHeading
                airdropTokonomics={airdropTokonomics}
                started={started}
                cancelled={cancelled}
                isOwner={isOwner}
              />
              <TableInfo />
            </Card>
          </div>
          <div className="column">
            <Card title="User Zone" bordered={false}>
              <div className="mb-2">
                {!cancelled ? (
                  <Button
                    type="primary"
                    onClick={claimToken}
                    style={{ width: "100%" }}
                    disabled={!active}
                  >
                    Claim Token
                  </Button>
                ) : (
                  <p>Airdrop has canceled</p>
                )}
              </div>
            </Card>
            {isOwner && (
              <Card title="Owner Zone" bordered={false}>
                {
                  !cancelled ? (
                    <>
                    <div className="mb-2">
                      <Button
                        type="primary"
                        onClick={startAirdrop}
                        disabled={started}
                        style={{ width: "100%", backgroundColor: "#407cc5" }}
                      >
                        Start Airdrop
                      </Button>
                    </div>
  
                    <div className="mb-2">
                      <Button
                        type="primary"
                        onClick={cancelAirdrop}
                        style={{ width: "100%" }}
                        disabled={cancelled}
                      >
                        Cancel Airdrop
                      </Button>
                    </div>
                    <label for="" className="label">
                      Allocation Actions
                    </label>
                    <div className="mb-2">
                      <Button
                        type="primary"
                        onClick={showModal}
                        style={{ width: "100%" }}
                        disabled={started}
                      >
                        Set Allocations
                      </Button>
                    </div>
  
                    <div className="mb-2">
                      <Button
                        type="primary"
                        onClick={showTransferModal}
                        style={{ width: "100%" }}
                        disabled={cancelled}
                      >
                        Transfer Ownership
                      </Button>{" "}
                    </div>                
                  </>
                  )  : (
                    <p>Airdrop has canceled</p>
                  )
                }

              </Card>
            )}
          </div>
        </div>
        <SetAllocationModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          getAllocations={getAllocations}
          setLoading={setLoading}
        />
        <TransferOwnershipModal
          isTransferModalOpen={isTransferModalOpen}
          handleTransferOk={handleTransferOk}
          handleTransferCancel={handleTransferCancel}
          setLoading={setLoading}
        />
      </div>
    );
  }
}

const LaunchpadHeading = ({
  airdropTokonomics,
  started,
  cancelled,
  isOwner,
}) => {
  return (
    <>
      <article className="media pool-detail" style={{ position: "relative" }}>
        <div className="media-left">
          <p className="image is-48x48">
            <img
              src={airdropTokonomics?.airdropLogo}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = process.env.PUBLIC_URL + "/assets/logo.png";
              }}
              alt=""
              style={{ filter: "grayscale(0)" }}
            />
          </p>
        </div>
        <div className="media-content">
          <div className="content">
            <div className="is-flex is-align-items-center">
              <div className="is-flex-grow-1 is-flex single-title">
                <h1 className="title mr-2">
                  {airdropTokonomics?.airdropTitle}
                  {isOwner && (
                    <span style={{ marginLeft: "10px" }}>
                      <FaKey color="#ffa701" size={20} />
                    </span>
                  )}
                </h1>

                <div className="flex status-wrapper">
                  <div className="flex" />
                  <div className="status-space" />
                  <div className="flex">
                    <div>{airdropSaleStatus(started, cancelled)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="is-flex mt-1 mb-2">
              {socialIcons(
                airdropTokonomics?.airdropWebsite,
                airdropTokonomics?.airdropFacebook,
                airdropTokonomics?.airdropTwitter,
                airdropTokonomics?.airdropGithub,
                airdropTokonomics?.airdropTelegram,
                airdropTokonomics?.airdropInstagram
              )}
            </div>
            <div className="ant-typography" />
          </div>
          <div className="ant-typography" />
        </div>
      </article>
    </>
  );
};

const SetAllocationModal = ({ isModalOpen, handleOk, handleCancel, loading, setLoading, getAllocations }) => {
  const { TextArea } = Input;
  const { library, active, account } = useWeb3React();
  const { address } = useParams();

  const { setAllocationAirdropToken } = useAirdropContract();
  const formRef = useRef();
  const decimalConverter = (value) => {
    return new Web3().utils.toWei(value.toString(), "ether");
  };
  const handleSubmit = () => {
    let ammount = [];
    let addresses = [];

    let multiaddress = formRef.current.getFieldValue("allocation").split("\n");

    for (var i = 0; i < multiaddress.length; i++) {
      let data = multiaddress[i].split(" ");
      if (new Web3().utils.isAddress(data[0]) && !isNaN(data[1])) {
        addresses.push(data[0]);
        console.log(data[1].toString());
        ammount.push(decimalConverter(data[1].toString()));
      }
    }
    console.log(ammount, addresses);

    if (active) {
      setLoading(true);
      setAllocationAirdropToken(address, addresses, ammount)
        .send({
          from: account,
        })
        .then((res) => {
          console.log(res);
          handleOk();
          message.success("Allocation set successfully");
          setLoading(false);
          getAllocations()
        })
        .catch((err) => {
          console.log(err);
          handleOk();
          message.error("Error Occured");
          setLoading(false);
        });
    }
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={handleSubmit} ref={formRef}>
          <Form.Item label="Allocation" name="allocation">
            <TextArea
              rows={10}
              placeholder="Insert allocation: separate with breaks line. By format: address,amount or address amount
Ex:
0x0000000000000000000000000000000000001000 13.45
0x0000000000000000000000000000000000001000 1.049
0x0000000000000000000000000000000000001000 1"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const TransferOwnershipModal = ({
  setLoading,
  isTransferModalOpen,
  handleTransferOk,
  handleTransferCancel,
}) => {
  const { TextArea } = Input;
  const { library, active, account } = useWeb3React();
  const { address } = useParams();

  const { setAirdropTransferOwnership } = useAirdropContract();
  const formRef = useRef();

  const handleSubmit = () => {
    if (active) {
      setLoading(true);
      setAirdropTransferOwnership(
        address,
        formRef.current.getFieldValue("transferAddress").toString()
      )
        .send({ from: account })
        .then((res) => {
          handleTransferOk();
          message.success("Transfer done successfully");
          setLoading(false);
        })
        .catch((err) => {
          handleTransferOk();
          message.error("Error Occured");
          setLoading(false);
        });
    }
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isTransferModalOpen}
        onOk={handleSubmit}
        onCancel={handleTransferCancel}
      >
        <Form layout="vertical" onFinish={handleSubmit} ref={formRef}>
          <Form.Item label="Transfer Address" name="transferAddress">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

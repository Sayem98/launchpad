import { Card } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAirdropContract } from "../../hooks/useContract";
import { airdropSaleStatus } from "../../utils";

function AirdropCard({ item }) {
  const { checkAirdropStarted, checkAirdropCancelled } = useAirdropContract();
  const [started, setStarted] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    checkAirdropStarted(item?.airdropAddress).then((res) => setStarted(res));
    checkAirdropCancelled(item?.airdropAddress).then((res) => {
      console.log(res);
      setCancelled(res);
    });
  }, []);

  return (
    <Card bordered={false}>
      <div>
        <div className="media is-flex is-align-items-center">
          <figure
            className="media-left"
            style={{
              border: "1px solid rgba(249, 81, 146, 0.2)",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <div className="image is-56x56">
              <img
                src={item.airdropLogo}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    process.env.PUBLIC_URL + "/assets/logo.png";
                }}
                alt="dlsd"
                // style={{ filter: "grayscale(1)" }}
              />
            </div>
          </figure>
          <div className="media-content">
            <div className="is-flex is-justify-content-flex-end">
              <div className="is-flex has-text-right is-flex-direction-column">
                <div>
                  <div className="mr-2">
                    <div style={{ display: "inline-block" }}>
                      {airdropSaleStatus(started, cancelled)}
                    </div>
                  </div>
                  <div className="is-flex mt-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-title">
          <div className="subtitle">
            <strong>{item?.airdropTitle}</strong>
          </div>
        </div>

        <div className="table-container" style={{ marginBottom: "10px" }}>
          <table className="TableInfo_table__31voJ">
            <tbody>
              <tr className="RowInfo_root__1XLti">
                <td className="RowInfo_node__3kZFW">Token Symbol</td>
                <td className="RowInfo_node__3kZFW">
                  <div className="has-text-right">{item.tokenSymbol}</div>
                </td>
              </tr>

              {/* <tr className="RowInfo_root__1XLti">
                <td className="RowInfo_node__3kZFW">Total Token</td>
                <td className="RowInfo_node__3kZFW">
                  <div className="has-text-right">555</div>
                </td>
              </tr>
              <tr className="RowInfo_root__1XLti">
                <td className="RowInfo_node__3kZFW">Participants</td>
                <td className="RowInfo_node__3kZFW">
                  <div className="has-text-right">1</div>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>

        <div className="custom-card-footer">
          <div
            className="is-flex is-align-items-center"
            style={{ justifyContent: "end" }}
          >
            <div className="view-pool has-text-right">
              <div className="is-flex is-align-items-center">
                <Link
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "15px",
                    fontWeight: "600",
                    textDecoration: "none",
                    border: "none",
                    borderRadius: "16px",
                    cursor: "pointer",
                    letterSpacing: ".03em",
                    lineHeight: 1,
                    opacity: 1,
                    outline: 0,
                    height: "40px",
                    padding: "0 16px",
                    boxShadow: "none",
                    backgroundColor: "#407cc5",
                    color: "#fff",
                  }}
                  className="view-button"
                  to={`/airdrop/${item.airdropAddress}`}
                >
                  View AirDrop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AirdropCard;

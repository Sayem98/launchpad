import { Progress } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePrivateSaleContract } from "../../hooks/useContract";
import {
  DivideBy18,
  fromWeiConverter,
  RaisedAmountPercentage,
  saleStatus,
} from "../../utils";

function PrivateSaleCard({ item }) {
  const { checkSaleEnded } = usePrivateSaleContract();
  const [saleEnded, setSaleEnded] = useState(false);

  useEffect(() => {
    checkPrivateSaleEnded();
  }, []);

  const checkPrivateSaleEnded = () => {
    checkSaleEnded(item?.saleContract).then((res) => {
      setSaleEnded(res);
    });
  };
  return (
    <>
      {" "}
      <div
        className="card-content is-flex-grow-1"
        style={{
          borderShadow:
            "0 2px 12px -8px rgb(25 19 38 / 10%), 0 1px 1px rgb(25 19 38 / 5%);",
          background: "#03104a",
        }}
      >
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
                src={item.saleLogo}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    process.env.PUBLIC_URL + "/assets/logo.png";
                }}
                alt="Avatar"
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
                      {!saleEnded ? (
                        saleStatus(item?.saleStartTime, item?.saleEndTime)
                      ) : (
                        <>
                          <span className="is-flex status-dot ended">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 16 16"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx={8} cy={8} r={8} />
                            </svg>
                            <span style={{ whiteSpace: "nowrap" }}>
                              Ended
                              {/* Sale Ended */}
                            </span>
                          </span>
                        </>
                      )}
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
            <strong>{item.saleTitle}</strong>
          </div>
          {/* <div className="">Fair Launch</div> */}
        </div>
        <div className="soft-hard-cap">
          <p style={{ color: "#888" }}>Soft/Hard </p>
          <span className="title" style={{ color: "#407cc5" }}>
            {" "}
            {fromWeiConverter(item.saleSoftcap)}/
            {fromWeiConverter(item.saleHardCap)}
          </span>
        </div>

        <div className="custom-card-footer">
          <div className="is-flex is-align-items-center">
            <div className="countdown is-flex-grow-1 is-flex-direction-column">
              <div style={{ color: "#888" }}>Sale Ends In:</div>
              <div className="countdown-text">
                <strong>
                  {moment(item.saleEndTime * 1000).format(
                    "MMM Do YYYY hh:mm:ss a"
                  )}
                </strong>
              </div>
            </div>
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
                  to={"/private-sale/" + item.saleContract}
                >
                  View Pool
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivateSaleCard;

import { Progress } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTokenContract } from "../../hooks/useContract";
import { DivideBy18, fromWeiConverter } from "../../utils";
import { saleStatus } from "../../utils";

function LaunchpadCard({ item }) {
  const { isHardCapReach } = useTokenContract();
  const [hardCapReached, setHardCapReached] = useState(false);

  useEffect(() => {
    checkHardcapReached();
  }, []);

  const checkHardcapReached = () => {
    isHardCapReach(item[2][1]).then((res) => {
      setHardCapReached(res);
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
                src={item[0][2]}
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
                      {!hardCapReached ? (
                        saleStatus(
                          fromWeiConverter(item[1][3]),
                          fromWeiConverter(item[1][4])
                        )
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
            <strong>{item[0][0]}</strong>
          </div>
          {/* <div className="">Fair Launch</div> */}
        </div>
        <div className="soft-hard-cap">
          <p style={{ color: "#888" }}>Soft/Hard </p>
          <span className="title" style={{ color: "#407cc5" }}>
            {" "}
            {DivideBy18(item[1][1])}/{DivideBy18(item[1][2])}
          </span>
        </div>

        <div className="custom-card-footer">
          <div className="is-flex is-align-items-center">
            <div className="countdown is-flex-grow-1 is-flex-direction-column">
              <div style={{ color: "#888" }}>Sale Ends In:</div>
              <div className="countdown-text">
                <strong>
                  {moment((item[1][4] * 1000) / Math.pow(10, 18)).format(
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
                    color: "#fff",
                    boxShadow: "none",
                    backgroundColor: "#407cc5",
                  }}
                  className="view-button"
                  to={"/launchpad/" + item[2][1]}
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

export default LaunchpadCard;

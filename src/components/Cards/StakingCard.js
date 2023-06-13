import { Card } from "antd";
import { Link } from "react-router-dom";

const StakingCard = ({ staking }) => {
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
                src={
                  //   staking[0][2] ||
                  staking.stakingLogo
                }
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
        </div>
        <div className="content-title">
          <div className="subtitle">
            <strong>{staking?.stakingTitle}</strong>
          </div>
        </div>
        <div style={{ height: "24px" }}></div>

        <div className="TableInfo_root__1aCB2" style={{ marginBottom: "10px" }}>
          <table className="TableInfo_table__31voJ">
            <tbody>
              <tr>
                <td>Token Name</td>
                <td className="has-text-right">{staking?.tokenName}</td>
              </tr>
              <tr>
                <td>Token Symbol</td>
                <td className="has-text-right">{staking?.tokenSymbol}</td>
              </tr>
              <tr>
                <td>Token decimals</td>
                <td className="has-text-right">18</td>
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
                  to={`/staking/${staking.stakingAddress}`}
                >
                  View Staking
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default StakingCard;

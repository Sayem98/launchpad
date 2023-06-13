import { Card } from "antd";
import React from "react";

function Leaderboard() {
  return (
    <div>
      <Card style={{ background: "white" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <p className="heading">Total success this week</p>
            <p className="title">-</p>
          </div>
          <div>
            <p className="heading">Total raised this week</p>
            <p className="title">-</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Leaderboard;

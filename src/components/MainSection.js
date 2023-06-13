import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function MainSection() {
  return (
    <div>
      <section
        className="ant-layout"
        style={{
          marginLeft: 200,
          padding: "40px 20px 20px",
          transition: "all 200ms linear 0s",
        }}
      >
        {/* //Main Section */}
        <main className="ant-layout-content MainLayout_content__2mZF9">
          {/* Treanding  */}
          <div className="mb-5"></div>

          {/* mainSection */}

          <main className="py-6 container">
            <Outlet />
          </main>
        </main>
        {/* //Footer Section */}
        <Footer />
      </section>
    </div>
  );
}

export default MainSection;

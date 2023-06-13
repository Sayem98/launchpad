import React from "react";

function Footer() {
  return (
    <div>
      <footer className="ant-layout-footer">
        <div className="container">
          <div className="copyright">
            <p className="has-text-centered" style={{color:"white"}}>
              Disclaimer: The information provided shall not in any way
              constitute a recommendation as to whether you should invest in any
              product discussed. We accept no liability for any loss occasioned
              to any person acting or refraining from action as a result of any
              material provided or published.
            </p>
          </div>
          <div className="is-size-7 has-text-grey-light has-text-right">
            build: 7bc9b23
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

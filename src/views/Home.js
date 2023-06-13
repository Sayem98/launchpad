import { useWeb3React } from "@web3-react/core";
import React from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-body">
          <Banner />
          <div className="has-text-centered">
            <h1
              className="ant-typography"
              style={{ color: "var(--text-color)" }}
            >
              The Crypto Factory Protocol for Everyone!
            </h1>
          </div>
          <p className="custom-subtitle has-text-centered">
            Welcome to Crypto Factory.
          </p>
        </div>
        <div className="custom-hero-buttons">
          <Link to="/launchpad/create">Create Now</Link>
          <a
            className="learn"
            href="https://launchcore.co"
            target="_blank"
            rel="noreferrer nofollow"
          >
            Learn more
          </a>
        </div>
      </section>
      <div className="section">
        <nav className="stats">
          <div className="stat has-text-centered">
            <div className="stat-box">
              <p className="title">$0</p>
              <p className="heading">Total Liquidity Raised</p>
            </div>
          </div>
          <div className="stat has-text-centered">
            <div className="stat-box">
              <p className="title">3512</p>
              <p className="heading">Total Projects</p>
            </div>
          </div>
          <div className="stat has-text-centered">
            <div className="stat-box">
              <p className="title">4K</p>
              <p className="heading">Total Participants</p>
            </div>
          </div>
          <div className="stat has-text-centered">
            <div className="stat-box">
              <p className="title">$0</p>
              <p className="heading">Total Values Locked</p>
            </div>
          </div>
        </nav>
      </div>
      <div className="custom-features-section">
        <div className="has-text-centered">
          <h3 className="custom-title">A Suite of Tools for Token Sales.</h3>
        </div>
        <p className="custom-subtitle">
          A suite of tools were built to help you create your own tokens and
          Crypto Factory in a fast, simple and cheap way, with no prior code
          knowledge required and 100% decentralized!
        </p>
        <div className="custom-features">
          <div className="custom-feature">
            <div className="custom-feature-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>Standard</h3>
              <p>Mint standard tokens on ETH, BSC, AVAX, Fantom, Polygon.</p>
            </div>
          </div>
          <div className="custom-feature">
            <div className="custom-feature-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>Deflationary</h3>
              <p>
                Generate deflationary tokens with tax and/or charity functions.
              </p>
            </div>
          </div>
          <div className="custom-feature">
            <div className="custom-feature-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>Customization</h3>
              <p>Create a token sale for your own custom token easily.</p>
            </div>
          </div>
          <div className="custom-feature">
            <div className="custom-feature-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>Crypto Factory</h3>
              <p>
                Use the token you mint to create a Crypto Factory with just a
                few clicks
              </p>
            </div>
          </div>
          <div className="custom-feature">
            <div className="custom-feature-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>Branding</h3>
              <p>
                Adding logo, social links, description, listing on Crypto
                Factory.
              </p>
            </div>
          </div>
          <div className="custom-feature">
            <div className="custom-feature-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>Management</h3>
              <p>
                The portal to help you easily update content for your Crypto
                Factory.
              </p>
            </div>
          </div>
          <div className="custom-feature">
            <div className="custom-feature-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>Community</h3>
              <p>
                Promote your Crypto Factory to thousands of buyers on Crypto
                Factory.
              </p>
            </div>
          </div>
          <div className="custom-feature">
            <div className="custom-feature-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>Locking</h3>
              <p>Lock your liquidity after presale.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-projects">
        <h3 className="custom-title">A Growing Protocol Ecosystem.</h3>
        <p className="custom-subtitle">
          We build a suite of tools for the world of decentralized finance.
          LPadMoon, LPadSale, LPadElon LPadLock, LPadSwap, we LPad everything!
        </p>
        <div className="projects">
          <div className="project">
            <div className="project-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>Crypto Factory</h3>
              <p>The best Crypto Factory for professional teams</p>
            </div>
          </div>
          <div className="project">
            <div className="project-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>LPadSale</h3>
              <p>Launch a token sale with a few clicks.</p>
            </div>
          </div>
          <div className="project">
            <div className="project-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>LPadSwap</h3>
              <p>Swap tokens and farming $LPadS.</p>
            </div>
          </div>
          <div className="project">
            <div className="project-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>LPadLock</h3>
              <p>Locking liquidity on LPadSwap.</p>
            </div>
          </div>
          <div className="project">
            <div className="project-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>LPadElon</h3>
              <p>The first meme token on LPadMoon.</p>
            </div>
          </div>
          <div className="project">
            <div className="project-box">
              <img src={process.env.PUBLIC_URL + "/assets/logo-2.svg"} />
              <h3>LPadWallet</h3>
              <p>Crypto wallet, buy, store, exchange &amp; earn.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

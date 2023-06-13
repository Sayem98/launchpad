import { isAddress } from "ethers/lib/utils";
import {
  BsFacebook,
  BsGithub,
  BsGlobe,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import Web3 from "web3";
import CounterComponent from "../components/CounterComponent";
const BSC_SCAN_LINKS = {
  3: "http://testnet.bscscan.com",
  97: "http://testnet.bscscan.com",
  80001:"https://mumbai.polygonscan.com"
};
export const getBscScanLink = (data, type) => {
  switch (type) {
    case "transition":
      return BSC_SCAN_LINKS + "/tx/" + data;
    case "token":
      return BSC_SCAN_LINKS + "/token/" + data;
    default:
      return BSC_SCAN_LINKS + "/address/" + data;
  }
};

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

//Convert 10^18 to float value
export const DivideBy18 = (value) => {
  let number = parseFloat(value) / Math.pow(10, 18);
  console.log(number);
  return isNaN(number.toFixed(2)) ? 0 : number.toFixed(2);
};

export const RaisedAmountPercentage = (rasiedAmount, hardCap) => {
  console.log(rasiedAmount, hardCap);
  return parseInt((rasiedAmount / hardCap) * 100);
};

export const saleStatus = (startDate, endDate, hardCapReached) => {
  if (startDate > new Date().getTime() / 1000) {
    return (
      <>
        <span className="is-flex status-dot incoming">
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
            Upcoming
            {/* Sale Ended */}
          </span>
        </span>
      </>
    );
  } else if (
    startDate < new Date().getTime() / 1000 &&
    endDate > new Date().getTime() / 1000
  ) {
    return (
      <>
        <span className="is-flex status-dot inprogress">
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
            Sale live
            {/* Sale Ended */}
          </span>
        </span>
      </>
    );
  } else {
    return (
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
    );
  }
};

export const airdropSaleStatus = (started, cancelled) => {
  if (!started && !cancelled) {
    return (
      <>
        <span className="is-flex status-dot incoming">
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
            Upcoming
            {/* Sale Ended */}
          </span>
        </span>
      </>
    );
  } else if (started && !cancelled) {
    return (
      <>
        <span className="is-flex status-dot inprogress">
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
            Sale live
            {/* Sale Ended */}
          </span>
        </span>
      </>
    );
  } else if (cancelled) {
    return (
      <>
        <span className="is-flex status-dot canceled">
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
            Cancelled
            {/* Sale Ended */}
          </span>
        </span>
      </>
    );
  } else {
    return (
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
    );
  }
};

export const socialIcons = (website, facebook, twitter, github, instagram) => {
  var data = [
    {
      link: website,
      icon: <BsGlobe />,
    },

    {
      link: facebook,
      icon: <BsFacebook />,
    },
    {
      link: twitter,
      icon: <BsTwitter />,
    },
    {
      link: github,
      icon: <BsGithub />,
    },
    {
      link: instagram,
      icon: <BsInstagram />,
    },
  ];
  return (
    <div>
      {data.map(
        (d, key) =>
          d.link !== "" && (
            <a
              key={key}
              href={d.link}
              rel="nofollow noreferrer"
              target="_blank"
              className="mr-4 is-size-5"
            >
              {d.icon}
            </a>
          )
      )}
    </div>
  );
};

export const countDown = (startTime, endTime, isEnded) => {
  const currentTime = parseInt(new Date().getTime() / 1000);
  const intStartTime = parseInt(startTime);
  const intEndTime = parseInt(endTime);

  if (intStartTime <= currentTime) {
    return (
      <CounterComponent time={endTime} isEnded={isEnded} statusText="Ends" />
    );
  } else {
    return (
      <CounterComponent
        time={startTime}
        isEnded={isEnded}
        statusText="Starts"
      />
    );
  }
};

export const decimalConverter = (value, tokenAddress) => {
  return new Web3().utils.toWei(value.toString(), "ether");
};

export const fromWeiConverter = (value) => {
  return parseInt(value) / Math.pow(10, 18);
};

import React from "react";
import Lottie from "react-lottie";
import animationData from "./loading.json";
function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="absolute z-[10000] top-0 w-full h-full  bg-[#fff] text-white">
      <div
        className="text-white relative"
        style={{
          height: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>
    </div>
  );
}

export default Loading;

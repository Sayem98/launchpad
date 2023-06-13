import React from "react";
import useBanner from "../hooks/useBanner";

const Banner = () => {
  const { result } = useBanner();

  return (
    <>
      {result && result.length > 0 && result[0].show && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
          }}
          className="banner-wrapper"
        >
          {result.map((obj) => (
            <>
              <a
                style={{ width: obj.width + "%", marginBottom: "20px" }}
                href={obj.link}
                target="_blank"
              >
                <img style={{ width: "100%" }} src={obj.image} />
              </a>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Banner;

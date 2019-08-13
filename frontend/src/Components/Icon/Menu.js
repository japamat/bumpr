import React from "react";

const SVG = ({
  style = {},
  fill = "#fff",
  width = "100%",
  className = "",
  viewBox = "0 0 24 24"
}) => (
  <svg
  width={width}
  style={style}
  height={width}
  viewBox={viewBox}
  xmlns="http://www.w3.org/2000/svg"
  className={`svg-icon ${className || ""}`}
  xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path fill={fill} d="M24,3c0-0.6-0.4-1-1-1H1C0.4,2,0,2.4,0,3v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V3z"/>
    <path fill={fill} d="M24,11c0-0.6-0.4-1-1-1H1c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V11z"/>
    <path fill={fill} d="M24,19c0-0.6-0.4-1-1-1H1c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V19z"/>
  </svg>
);

export default SVG;
import React from "react";

const SVG = ({
  style = {},
  fill = "#fff",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 24 24"
}) => (
  <svg
  width={width}
  style={style}
  height={height}
  viewBox={viewBox}
  xmlns="http://www.w3.org/2000/svg"
  className={`svg-icon ${className || ""}`}
  xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path fill={fill} d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/>
    <path fill="none" d="M0 0h24v24H0z"/>
  </svg>
);

export default SVG;
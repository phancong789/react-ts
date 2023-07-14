import React from "react";
import * as env from "../../env";
import "./assets/scss/ExtinctionRate.scss";

export default function ExtinctionRate() {
  const classIndex = [11, 25, 17, 12];

  return (
    <div className="ExtinctionRateWapper">
      <p>
        <span>Có hơn {""} loài</span> <br /> đang bị đe dọa tuyệt chủng
      </p>
      <div></div>
      <div>
        <div className="perWapper"></div>
      </div>
    </div>
  );
}

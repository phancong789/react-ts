import React from "react";
import * as env from "../../env";
import "./assets/scss/ExtinctionRate.scss";

export default function ExtinctionRate() {
  const classIndex = [11, 25, 17, 12];
  const [data, setData] = React.useState({
    data: [{ ten: "", ty_le: 0 }],
    tong_loai: 0,
  });
  React.useEffect(() => {
    const getfetchData = async () => {
      await fetch(env.hostName + env.apiRoute.tyleloai)
        .then((x) => x.json())
        .then((x) => setData(x));
    };

    getfetchData();
  }, []);

  return (
    <div className="ExtinctionRateWapper">
      <p>
        <span>Có hơn {data.tong_loai} loài</span> <br /> đang bị đe dọa tuyệt
        chủng
      </p>
      <div></div>
      <div>
        <div className="perWapper"></div>
      </div>
    </div>
  );
}

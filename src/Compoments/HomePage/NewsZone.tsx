import React from "react";
import "./assets/scss/NewsZone.scss";
import * as env from "../../env";

export default function NewsZone() {
  const [data, setData] = React.useState([
    {
      ngay_viet: "",
      anh_dai_dien: "",
      tieu_de: "",
      tom_tat: "",
    },
  ]);
  React.useEffect(() => {
    const getfetchData = async () => {
      env.param.set("perpage", "3");

      await fetch(env.hostName + env.apiRoute.News + "?" + env.param)
        .then((x) => x.json())
        .then((x) => setData(x.list));
    };

    getfetchData();
  }, []);
  return (
    <div className="NewsWapper">
      <p>BẢN TIN</p>
      <div className="NewsRow">
        {data.map((x, index) => {
          let newDate = x.ngay_viet
            .replaceAll("-", "/")
            .substring(0, 10)
            .split("/")
            .reverse()
            .join("/");

          let Newhour = x.ngay_viet
            .replaceAll(":", "h ")
            .substring(10, 17)
            .split("/")
            .reverse()
            .join("/");
          return (
            <div className="new" key={index}>
              <div className="newHead">
                <div className="imgWapper">
                  <img src={env.hostName + x.anh_dai_dien} alt="" />
                </div>
                <div>
                  <p>{newDate + " - " + Newhour}</p>
                  <h4>{x.tieu_de}</h4>
                </div>
              </div>
              <div>
                <p>{x.tom_tat}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

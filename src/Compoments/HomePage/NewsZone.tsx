import React from "react";
import "./assets/scss/NewsZone.scss";
import * as env from "../../env";
import { useGetNewsQuery } from "../../service/HomeAndSearchApi";

export default function NewsZone() {
  const { data, isLoading, isError } = useGetNewsQuery(undefined);

  if (isLoading) return <h1 style={{ textAlign: "center" }}>Is Loading</h1>;
  if (isError) return <h1 style={{ textAlign: "center" }}>Error</h1>;
  console.log(data);
  return (
    <div className="NewsWapper">
      <p>BẢN TIN</p>
      <div className="NewsRow">
        {data?.list.map((x, index) => {
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

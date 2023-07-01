import Styled from "styled-components";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import Specie from "../../Interface/ISpecies";
import * as env from "../../env";
import "./assets/scss/SpeciesCard.scss";

const QrWapper = Styled.div`
  heigth:100px;
  width:100px;
  margin-top:20px;
`;

interface SpecieData {
  Specie: Specie | undefined;
  hasImg: boolean;
}

export default function SpeciesCard({ Specie, hasImg }: SpecieData) {
  if (Specie == null || Specie === undefined) return;
  let checkNull: string = "";
  let hientrang = [];
  let randomImgList: string[] = [
    process.env.PUBLIC_URL + "/image1.png",
    process.env.PUBLIC_URL + "/image2.png",
    process.env.PUBLIC_URL + "/image6.png",
    process.env.PUBLIC_URL + "/image7.png",
  ];

  let randomImgIndex = Math.floor(Math.random() * randomImgList.length);
  if (Specie.loai_hien_trang) {
    checkNull = Specie.loai_hien_trang.code;
  } else {
    checkNull = "";
  }
  switch (checkNull) {
    case "decreasing":
      hientrang.push(
        <p className="hientrang">
          <FontAwesomeIcon
            icon={solid("arrow-down")}
            style={{ color: "#ff0000" }}
          />
          Giảm dần
        </p>
      );
      break;
    case "increasing":
      hientrang.push(
        <p className="hientrang">
          <FontAwesomeIcon
            icon={solid("arrow-up")}
            style={{ color: "#04ff00" }}
          />
          Tăng mạnh
        </p>
      );
      break;
    default:
      hientrang.push(
        <p className="hientrang">
          <FontAwesomeIcon
            icon={regular("circle-question")}
            style={{ color: "#b2b4b8" }}
          />
          chưa xác định
        </p>
      );
      break;
  }
  return (
    <div className="ProminentSpecieCard">
      {hasImg ? (
        <div className="imgWapper">
          <img
            src={
              Specie.attachments[0]
                ? env.hostName + Specie.attachments[0].path
                : randomImgList[randomImgIndex]
            }
            alt={Specie.attachments[0] ? Specie.attachments[0].ten : ""}
          />
        </div>
      ) : (
        <div></div>
      )}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="Cardinfo">
            <p>{Specie.kingdom.ten + " - " + Specie.phylumn.ten}</p>
            <h3>{Specie.ten}</h3>
            <p>{Specie.ten_khoa_hoc}</p>
          </div>
          <QrWapper>
            <QRCode
              style={{ width: "100%" }}
              size={60}
              value={env.hostName + "species/" + Specie.id}
            />
          </QrWapper>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{hientrang}</div>
          <div>
            {Specie.sach_dos[0] ? (
              <button className="sachDoBtn">
                <p>
                  <abbr
                    title={
                      `theo sách đỏ năm ${Specie.sach_dos[0].pivot.nam}:` +
                      Specie.sach_dos[0].mo_ta
                    }
                  >
                    {Specie.sach_dos[0].ma_danh_muc}
                  </abbr>
                </p>
              </button>
            ) : (
              ""
            )}
            {Specie.iucns[0] ? (
              <button className="iucnsBtn">
                <p>
                  <abbr
                    title={
                      `theo IUCN năm ${Specie.iucns[0].pivot.nam}:` +
                      Specie.iucns[0].mo_ta
                    }
                  >
                    {Specie.iucns[0].ma_danh_muc}
                  </abbr>
                </p>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

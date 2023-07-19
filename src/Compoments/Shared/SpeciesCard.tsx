import Styled from "styled-components";
import QRCode from "react-qr-code";
import { Col } from "react-bootstrap";
import Specie from "../../Interface/ISpecies";
import HelpCircleOutlineIcon from "mdi-react/HelpCircleOutlineIcon";
import ArrowDownIcon from "mdi-react/ArrowDownIcon";
import ArrowUpIcon from "mdi-react/ArrowUpIcon";
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
  xxl?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  className?: string;
}

export default function SpeciesCard({
  Specie,
  hasImg,
  xxl,
  xl,
  lg,
  md,
  sm,
  className,
}: SpecieData): React.JSX.Element {
  if (Specie == null || Specie === undefined) return <></>;
  let checkNull: string = "";
  let hientrang = [];
  let randomImgList: string[] = [
    "/image1.png",
    "/image2.png",
    "/image6.png",
    "/image7.png",
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
          <ArrowDownIcon color="#Ff0000" size={50} /> Giảm dần
        </p>
      );
      break;
    case "increasing":
      hientrang.push(
        <p className="hientrang">
          <ArrowUpIcon color="#00ff22" size={50} />
          Tăng mạnh
        </p>
      );
      break;
    default:
      hientrang.push(
        <p className="hientrang">
          <HelpCircleOutlineIcon size={50} /> chưa xác định
        </p>
      );
      break;
  }
  return (
    <Col
      xxl={xxl}
      xl={xl}
      lg={lg}
      md={md}
      sm={sm}
      className={"ProminentSpecieCard " + className}
    >
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
    </Col>
  );
}

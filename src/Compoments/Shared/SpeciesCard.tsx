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
  Specie: Specie[] | undefined;
}

export default function SpeciesCard({ Specie }: SpecieData) {
  return (
    <>
      {Specie?.map((x) => {
        let checkNull: string = "";
        let hientrang = [];

        if (x.loai_hien_trang) {
          checkNull = x.loai_hien_trang.code;
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
            <div>
              <img
                style={{
                  width: "33rem",
                  height: "16rem",
                  aspectRatio: "4 /3",
                }}
                src={env.hostName + x.attachments[0].path}
                alt={x.attachments[0].ten}
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="Cardinfo">
                  <p>{x.kingdom.ten + " - " + x.phylumn.ten}</p>
                  <h3>{x.ten}</h3>
                  <p>{x.ten_khoa_hoc}</p>
                </div>
                <QrWapper>
                  <QRCode
                    style={{ width: "100%" }}
                    size={60}
                    value={env.hostName + "species/" + x.id}
                  />
                </QrWapper>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{hientrang}</div>
                <div>
                  {x.sach_dos[0] ? (
                    <button className="sachDoBtn">
                      <p>
                        <abbr
                          title={
                            `theo sách đỏ năm ${x.sach_dos[0].pivot.nam}:` +
                            x.sach_dos[0].mo_ta
                          }
                        >
                          {x.sach_dos[0].ma_danh_muc}
                        </abbr>
                      </p>
                    </button>
                  ) : (
                    ""
                  )}
                  {x.iucns[0] ? (
                    <button className="iucnsBtn">
                      <p>
                        <abbr
                          title={
                            `theo IUCN năm ${x.iucns[0].pivot.nam}:` +
                            x.iucns[0].mo_ta
                          }
                        >
                          {x.iucns[0].ma_danh_muc}
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
      })}
    </>
  );
}

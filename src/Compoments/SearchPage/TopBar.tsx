import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./assets/scss/Topbar.scss";

export default function TopBar() {
  const [active, setActive] = React.useState("1");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActive(event.currentTarget.id);
  };

  return (
    <div className="topbar">
      <div></div>
      <div>
        <div className={active === "1" ? "pressed" : undefined}>
          <button id={"1"} onClick={handleClick}>
            <FontAwesomeIcon icon={solid("grip")} />
            <p>Lưới</p>
          </button>
        </div>
        <div className={active === "2" ? "pressed" : undefined}>
          <button id={"2"} onClick={handleClick}>
            <FontAwesomeIcon icon={solid("grip-lines")} />
            <p>Bảng</p>
          </button>
        </div>
        <div className={active === "3" ? "pressed" : undefined}>
          <button id={"3"} onClick={handleClick}>
            <FontAwesomeIcon icon={regular("map")} />
            <p>Bản Đồ</p>
          </button>
        </div>
        <div className={active === "4" ? "pressed" : undefined}>
          <button id={"4"} onClick={handleClick}>
            <FontAwesomeIcon icon={solid("chart-column")} />
            <p>Thống Kê</p>
          </button>
        </div>
      </div>
      <div className="excelbtn">
        <button>
          <FontAwesomeIcon icon={solid("file-excel")} />
        </button>
      </div>
    </div>
  );
}

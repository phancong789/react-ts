import React from "react";
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
            <p>Lưới</p>
          </button>
        </div>
        <div className={active === "2" ? "pressed" : undefined}>
          <button id={"2"} onClick={handleClick}>
            <p>Bảng</p>
          </button>
        </div>
        <div className={active === "3" ? "pressed" : undefined}>
          <button id={"3"} onClick={handleClick}>
            <p>Bản Đồ</p>
          </button>
        </div>
        <div className={active === "4" ? "pressed" : undefined}>
          <button id={"4"} onClick={handleClick}>
            <p>Thống Kê</p>
          </button>
        </div>
      </div>
      <div className="excelbtn">
        <button></button>
      </div>
    </div>
  );
}

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./assets/scss/Topbar.scss";

export default function TopBar() {
  return (
    <div className="topbar">
      <div></div>
      <div>
        <div className="pressed">
          <button>
            <FontAwesomeIcon icon={solid("grip")} /> <p>Lưới</p>
          </button>
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={solid("grip-lines")} /> <p>Bảng</p>
          </button>
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={regular("map")} /> <p>Bản Đồ</p>
          </button>
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={solid("chart-column")} /> <p>Thống Kê</p>
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

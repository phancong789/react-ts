import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./assets/scss/SideBar.scss";

export default function SideBar() {
  return (
    <div className="Sidebar">
      <div>
        <div>
          <p>
            LOẠI
            <FontAwesomeIcon icon={solid("circle-question")} />
          </p>
        </div>
        <div>
          <div>
            <input id="kindInput" type="radio" />
            <label htmlFor="kindInput">Loài</label>
          </div>
          <div>
            <input id="documentInput" type="radio" />
            <label htmlFor="documentInput">Văn bản tài liệu</label>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>
            BỘ LỌC <FontAwesomeIcon icon={solid("circle-question")} />
          </p>
        </div>
        <div>
          <ul>
            <li>Phân loại học</li>
          </ul>
          <ul>
            <li>Hiện trạng loài</li>
          </ul>
          <ul>
            <li>Địa giới hành chính</li>
          </ul>
          <ul>
            <li>Hệ sinh thái</li>
          </ul>
          <ul>
            <li>Giá trị loài</li>
          </ul>
          <ul>
            <li>Sách đỏ</li>
          </ul>
          <ul>
            <li>IUCN</li>
          </ul>
          <ul>
            <li>Nghị định & Cites</li>
          </ul>
          <ul>
            <li>Phụ lục Cites</li>
          </ul>
          <ul>
            <li>Chế độ quản lý</li>
          </ul>
          <ul>
            <li>Loài đặc hữu</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

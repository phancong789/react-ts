import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./assets/scss/SideBar.scss";
import GeneralFilterData from "../../Interface/IGeneralFilterData";

interface kinddata {
  data: GeneralFilterData[] | undefined;
}

export default function SideBar() {
  const [kindData, setKindData] = React.useState<kinddata>();

  return (
    <div className="Sidebar">
      <div className="wapper">
        <div>
          <p className="SiderbarFilterTilter">
            LOẠI
            <FontAwesomeIcon icon={solid("circle-question")} />
          </p>
        </div>
        <div>
          <div>
            <input id="kindInput" name="loai" type="radio" defaultChecked />
            <label htmlFor="kindInput">Loài</label>
          </div>
          <div>
            <input id="documentInput" name="loai" type="radio" />
            <label htmlFor="documentInput">Văn bản tài liệu</label>
          </div>
        </div>
      </div>
      <div className="wapper">
        <div>
          <p className="SiderbarFilterTilter">
            BỘ LỌC <FontAwesomeIcon icon={solid("circle-question")} />
          </p>
        </div>
        <div>
          <ul>
            <span>Phân loại học</span>
          </ul>
          <ul>
            <span>Hiện trạng loài</span>
          </ul>
          <ul>
            <span>Địa giới hành chính</span>
          </ul>
          <ul>
            <span>Hệ sinh thái</span>
          </ul>
          <ul>
            <span>Giá trị loài</span>
          </ul>
          <ul>
            <span>Sách đỏ</span>
          </ul>
          <ul>
            <span>IUCN</span>
          </ul>
          <ul>
            <span>Nghị định & Cites</span>
          </ul>
          <ul>
            <span>Phụ lục Cites</span>
          </ul>
          <ul>
            <span>Chế độ quản lý</span>
          </ul>
          <ul>
            <span>Loài đặc hữu</span>
          </ul>
        </div>
      </div>
    </div>
  );
}

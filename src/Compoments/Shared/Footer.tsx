import React from "react";
import styled from "styled-components";
import "./assets/scss/Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="tranglienquan">
        <p>TRANG LIÊN QUAN</p>
        <div>
          <ul className="partnerList">
            <li>
              <a href="https://www.worldbank.org/vi/country/vietnam">
                <img
                  alt="Royal Botanic Gardens Kew"
                  src="http://wlp.howizbiz.com/static/img/worldBank.07de07b6.jpg"
                />
              </a>
            </li>
            <li>
              <a href="http://www.monre.gov.vn/">
                <img
                  alt="IUCN"
                  src="http://wlp.howizbiz.com/static/img/monre-logo.4371aa1b.png"
                />
              </a>
            </li>
            <li>
              <a href="http://vea.gov.vn/">
                <img
                  alt="SSC"
                  src="http://wlp.howizbiz.com/static/img/logotc1.16cd79de.png"
                />
              </a>
            </li>
            <li>
              <a href="https://www.mard.gov.vn/Pages/default.aspx">
                <img
                  alt="SSC"
                  src="http://wlp.howizbiz.com/static/img/bnn-logo.42da3258.png"
                />
              </a>
            </li>
            <li>
              <a href="http://vienduoclieu.org.vn/">
                <img src="http://wlp.howizbiz.com/static/img/image-01-01.daf37fac.png" />
              </a>
            </li>
            <li>
              <a href="http://www.monre.gov.vn/">
                <img
                  alt="IUCN"
                  src="http://wlp.howizbiz.com/static/img/monre-logo.4371aa1b.png"
                />
              </a>
            </li>
            <li>
              <a href="http://prc.org.vn/">
                <img
                  alt="ASU"
                  src="http://wlp.howizbiz.com/static/img/plr.7337293c.png"
                />
              </a>
            </li>
            <li>
              <a href="https://www.bioversityinternational.org/">
                <img
                  alt="BirdLife International"
                  src="http://wlp.howizbiz.com/static/img/Logo-Bioversity-92px-106px.26464286.png"
                />
              </a>
            </li>
            <li>
              <a href="https://www.cbd.int/">
                <img
                  alt="BGCI"
                  src="data:image/png;base64,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"
                />
              </a>
            </li>
            <li>
              <a href="https://www.idlo.int/">
                <img
                  alt="Conservation International"
                  src="http://wlp.howizbiz.com/static/img/idlo-logo.37f0fb9e.png"
                />
              </a>
            </li>
            <li>
              <a href="https://www.abs-biotrade.info/">
                <img
                  src="http://wlp.howizbiz.com/static/img/abs.04181a5d.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a href="https://absch.cbd.int/">
                <img
                  src="http://wlp.howizbiz.com/static/img/Logo-Bioversity-92px-106px.26464286.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a href="http://vienduoclieu.org.vn/">
                <img
                  src="http://wlp.howizbiz.com/static/img/niom.8607a9a4.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a href="https://absch.cbd.int/">
                <img
                  src="http://wlp.howizbiz.com/static/img/absch.e8b46864.png"
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", margin: "2rem 0" }}>
          <div style={{ width: "49%", borderRight: "1px solid white" }}>
            <h5>GIỚI THIỆU</h5>
            <a href="#">Hệ thống</a>
            <a href="#">Tài trợ</a>
          </div>
          <div style={{ width: "49%" }}>
            <h5>THÔNG TIN - HƯỚNG DẪN</h5>
            <a href="#">Tin tức</a>
            <a href="#">Tài liệu hướng dẫn tra cứu thông tin</a>
            <a href="#">Video hướng dẫn tra cứu thông tin</a>
          </div>
        </div>
        <div style={{ display: "flex", paddingBottom: 30 }}>
          <div style={{ width: "49%", borderRight: "1px solid white" }}>
            <h5>VĂN BẢN - TÀI LIỆU</h5>
            <a href="#">Văn bản pháp luật</a>
          </div>
          <div style={{ width: "49%" }}>
            <h5>HỖ TRỢ</h5>
            <a href="">Liên hệ</a>
          </div>
        </div>
      </div>
      <div className="BottomFooter">
        <h4>
          HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN BẢO
          VỆ
        </h4>
        <div style={{ display: "flex" }}>
          <a href="#">Điều khoản & Bảo mật</a>
          <h4>Bản quyền bởi Ban quản lý dự án WLP</h4>
        </div>
        <h4>
          Được tài trợ bởi: Quỹ môi trường dự án toàn cầu (GEF) THÔNG QUA NGÂN
          HÀNG THẾ GIỚI (WB)
        </h4>
      </div>
    </footer>
  );
}

import Styled from "styled-components";
import QRCode from "react-qr-code";
import { Col } from "react-bootstrap";
import "../../Compoments/Shared/assets/scss/SpeciesCard.scss";
import { useId, useState } from "react";
import { useLazyGetMapinfoQuery } from "../../service/HomeAndSearchApi";
import { useAppDispatch, useAppSelector } from "../../CustomHook/hook";
import IGeneralFilterData from "../../Interface/IGeneralFilterData";

interface SpecieData {
  province: IGeneralFilterData | undefined;
  hasImg: boolean;
  xxl?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  className?: string;
  showOnMap?: boolean;
}

export default function ProvinceCard({
  province,
  xxl,
  xl,
  lg,
  md,
  sm,
  className,
}: SpecieData): React.JSX.Element {
  const checkboxid = useId();
  const [triger] = useLazyGetMapinfoQuery();
  const [ownInfoMapData, setOwnInfoMapData] = useState<number[]>();
  const dispatch = useAppDispatch();

  const checkedHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <Col
      xxl={xxl}
      xl={xl}
      lg={lg}
      md={md}
      sm={sm}
      style={{ padding: 0, borderRadius: 5 }}
      className={"ProminentSpecieCard flex-grow-1 " + className}
    >
      <div className="Cardinfo">
        <p>{""}</p>
        <h3>{""}</h3>
        <p>{""}</p>
      </div>
      <div className="TakeLocation">
        <input
          onChange={checkedHandle}
          type="checkbox"
          name={""}
          id={checkboxid}
        />
        <label htmlFor={checkboxid}>Hiện thị trên bản đồ</label>
      </div>
    </Col>
  );
}

import React from "react";
import Styled from "styled-components";
// @ts-ignore
import * as env from "../../env";
import Specie from "../../Interface/ISpecies";
import SpeciesCard from "../Shared/SpeciesCard";
import "./assets/scss/ProminentSpecies.scss";
import { IndexKind } from "typescript";

const ProminentSpeciesRow = Styled.div`
 display:flex;
 flex-wrap:wrap;
`;

export default function ProminentSpecies() {
  const [data, setData] = React.useState<Specie[]>();
  React.useEffect(() => {
    const getfetchData = async () => {
      await fetch(env.hostName + env.apiRoute.loainoibat)
        .then((x) => x.json())
        .then((x) => setData(x));
    };

    getfetchData();
  }, []);
  return (
    <div className="ProminentSpeciesWapper">
      <p>LOÀI NỔI BẬT</p>
      <ProminentSpeciesRow>
        {data?.map((x, index) => {
          return <SpeciesCard key={index} Specie={x} hasImg={true} />;
        })}
      </ProminentSpeciesRow>
    </div>
  );
}

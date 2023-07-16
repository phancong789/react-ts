import React from "react";
import Styled from "styled-components";
import * as env from "../../env";
import { useGetProminentSpeciesQuery } from "../../service/HomeAndSearchApi";
import Specie from "../../Interface/ISpecies";
import SpeciesCard from "../Shared/SpeciesCard";
import "./assets/scss/ProminentSpecies.scss";

const ProminentSpeciesRow = Styled.div`
 display:flex;
 flex-wrap:wrap;
`;

export default function ProminentSpecies() {
  const { data, isLoading, isError } = useGetProminentSpeciesQuery(undefined);

  if (isLoading) return <h1 style={{ textAlign: "center" }}>Is Loading</h1>;
  if (isError) return <h1 style={{ textAlign: "center" }}>Error</h1>;

  return (
    <div className="ProminentSpeciesWapper">
      <p>LOÀI NỔI BẬT</p>
      <ProminentSpeciesRow>
        {data?.map((x, index) => {
          return <SpeciesCard key={index + 1} Specie={x} hasImg={true} />;
        })}
      </ProminentSpeciesRow>
    </div>
  );
}

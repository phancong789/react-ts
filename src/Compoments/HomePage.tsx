import React from "react";
import ProminentSpecies from "./HomePage/ProminentSpecies";
import NewsZone from "./HomePage/NewsZone";
import ExtinctionRate from "./HomePage/ExtinctionRate";

export default function HomePage() {
  return (
    <>
      <ProminentSpecies />
      <ExtinctionRate />
      <NewsZone />
    </>
  );
}

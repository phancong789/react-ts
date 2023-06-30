import React from "react";
import ProminentSpecies from "../Compoments/HomePage/ProminentSpecies";
import NewsZone from "../Compoments/HomePage/NewsZone";
import ExtinctionRate from "../Compoments/HomePage/ExtinctionRate";
import NavBar from "../Compoments/Shared/Navbar";
import SearchPage from "./SearchPage";
import Footer from "../Compoments/Shared/Footer";
import { Routes, Route } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <ProminentSpecies />
      <ExtinctionRate />
      <NewsZone />
      <Footer />
    </>
  );
}

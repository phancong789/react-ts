import React from "react";
import ProminentSpecies from "./HomePage/ProminentSpecies";
import NewsZone from "./HomePage/NewsZone";
import ExtinctionRate from "./HomePage/ExtinctionRate";
import NavBar from "./Shared/Navbar";
import SearchPage from "./SearchPage";
import Footer from "./Shared/Footer";
import { Routes, Route } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ProminentSpecies />
              <ExtinctionRate />
              <NewsZone />
            </>
          }
        />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </>
  );
}

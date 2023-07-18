import React from "react";
import styled from "styled-components";
import ResultsContent from "../Compoments/SearchPage/ResultsContent";
import Footer from "../Compoments/Shared/Footer";
import NavBar from "../Compoments/Shared/Navbar";
import TopBar from "../Compoments/SearchPage/TopBar";
import SideBar from "../Compoments/SearchPage/SideBar";
import { useAppSelector } from "../CustomHook/hook";
import { selectSwitchSearchPageContent } from "../features/UiSlice";
import MapContent from "../Compoments/SearchPage/MapContent";

const ContentSide = styled.div`
  flex-grow: 2;
`;

export default function SearchPage() {
  const switchcontent = useAppSelector(selectSwitchSearchPageContent);

  let render = [];
  switch (switchcontent) {
    case "grid":
      render.push(<ResultsContent />);
      break;
    case "map":
      render.push(<MapContent />);
      break;
    default:
      break;
  }
  return (
    <>
      <NavBar />
      <TopBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <ContentSide className="contentSide">{render}</ContentSide>
      </div>
      <Footer />
    </>
  );
}

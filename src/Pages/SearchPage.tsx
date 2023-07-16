import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import * as env from "../env";
import Specie from "../Interface/ISpecies";
import Footer from "../Compoments/Shared/Footer";
import NavBar from "../Compoments/Shared/Navbar";
import TopBar from "../Compoments/SearchPage/TopBar";
import SideBar from "../Compoments/SearchPage/SideBar";
import SpeciesCard from "../Compoments/Shared/SpeciesCard";
import { useAppSelector, useAppDispatch } from "../CustomHook/hook";
import { useGetSpeciesQuery } from "../service/HomeAndSearchApi";
import "./SearchPage.scss";
import { selectSpecies, setSpeciesData } from "../features/HomeAndSearchSlice";

const Titles = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin-left: 1rem;
`;

const ContentSide = styled.div`
  max-width: 70%;
`;

export default function SearchPage() {
  const [showMore, setShowMore] = React.useState(0);
  const { data, isLoading, isError } = useGetSpeciesQuery({
    paginate: true,
    page: showMore,
    perpage: 18,
    search: "",
  });
  const dispatch = useAppDispatch();
  const speciesData = useAppSelector(selectSpecies);

  React.useEffect(() => {
    if (data) {
      dispatch(setSpeciesData(data));
      console.log("hello");
    }
  }, [data]);

  const searchResults: JSX.Element[] = [];
  const moreSearchResults: JSX.Element[] = [];
  if (speciesData) {
    speciesData?.list?.forEach((x, index) => {
      if (index < 6) {
        if (isLoading) {
          return searchResults.push(
            <h1 style={{ textAlign: "center" }}>Is Loading</h1>
          );
        } else if (isError) {
          return searchResults.push(
            <h1 style={{ textAlign: "center" }}>Error</h1>
          );
        } else {
          searchResults.push(
            <SpeciesCard key={x.id} Specie={x} hasImg={true} />
          );
        }
      } else {
        if (isLoading) {
          return searchResults.push(
            <h1 style={{ textAlign: "center" }}>Is Loading</h1>
          );
        } else if (isError) {
          return searchResults.push(
            <h1 style={{ textAlign: "center" }}>Error</h1>
          );
        } else {
          moreSearchResults.push(
            <SpeciesCard key={x.id} Specie={x} hasImg={false} />
          );
        }
      }
    });
  }

  return (
    <>
      <NavBar />
      <TopBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <ContentSide className="contentSide">
          <div>
            <Titles style={{ marginTop: "1rem" }}>
              Kết quả {`(${data?.pagination.total})`}
            </Titles>
          </div>
          <div className="ResultsWapper">{searchResults}</div>
          <div>
            <Titles style={{ borderTop: "2px solid black", paddingTop: 5 }}>
              Kết quả khác
            </Titles>
          </div>
          <div className="ResultsWapper">{moreSearchResults}</div>
          <div className="mb-2 d-flex justify-content-center">
            <Button variant="none border-bottom fs-4 border-2">tải thêm</Button>
          </div>
        </ContentSide>
      </div>
      <Footer />
    </>
  );
}

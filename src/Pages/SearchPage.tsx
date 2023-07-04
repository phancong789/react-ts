import React from "react";
import styled from "styled-components";
import TopBar from "../Compoments/SearchPage/TopBar";
import SideBar from "../Compoments/SearchPage/SideBar";
import * as env from "../env";
import Specie from "../Interface/ISpecies";
import SpeciesCard from "../Compoments/Shared/SpeciesCard";
import "./SearchPage.scss";
import Button from "react-bootstrap/Button";
import NavBar from "../Compoments/Shared/Navbar";
import Footer from "../Compoments/Shared/Footer";

interface loaicongbo {
  list: Specie[] | undefined;
  pagination: {
    count: 0;
    hasMoreItems: false;
    itemsPerPage: 0;
    page: 0;
    total: 367;
  };
}

const Titles = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin-left: 1rem;
`;

const ContentSide = styled.div`
  max-width: 70%;
`;

export default function SearchPage() {
  const [cardData, setCardData] = React.useState<loaicongbo>();
  React.useEffect(() => {
    const fetchData = async () => {
      env.param.set("perpage", "18");

      await fetch(env.hostName + env.apiRoute.loaicongbo + "?" + env.param, {})
        .then((x) => x.json())
        .then((x) => setCardData(x));
    };
    fetchData();
  }, []);

  const searchResults: JSX.Element[] = [];
  const moreSearchResults: JSX.Element[] = [];
  if (cardData?.list)
    cardData?.list.forEach((x, index) => {
      if (index < 6) {
        searchResults.push(
          <SpeciesCard key={index} Specie={x} hasImg={true} />
        );
      } else {
        moreSearchResults.push(
          <SpeciesCard key={index} Specie={x} hasImg={false} />
        );
      }
    });
  return (
    <>
      <NavBar />
      <TopBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <ContentSide className="contentSide">
          <div>
            <Titles style={{ marginTop: "1rem" }}>
              Kết quả {`(${cardData?.pagination.total})`}
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

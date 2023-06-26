import React from "react";
import styled from "styled-components";
import TopBar from "./SearchPage/TopBar";
import SideBar from "./SearchPage/SideBar";
import * as env from "../env";
import Specie from "../Interface/ISpecies";
import SpeciesCard from "./Shared/SpeciesCard";

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
  margin-left: 1rem;
`;

const ResultsWapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const ContentSide = styled.div`
  max-width: 90%;
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
        searchResults.push(<SpeciesCard Specie={x} hasImg={true} />);
      } else {
        moreSearchResults.push(<SpeciesCard Specie={x} hasImg={false} />);
      }
    });
  return (
    <>
      <TopBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <ContentSide className="contentSide">
          <div>
            <Titles>Kết quả {`(${cardData?.pagination.total})`}</Titles>
          </div>
          <ResultsWapper>{searchResults}</ResultsWapper>
          <div>
            <Titles>Kết quả khác</Titles>
          </div>
          <ResultsWapper>{moreSearchResults}</ResultsWapper>
        </ContentSide>
      </div>
    </>
  );
}

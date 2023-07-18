import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { useAppSelector, useAppDispatch } from "../../CustomHook/hook";
import { useGetSpeciesQuery } from "../../service/HomeAndSearchApi";
import {
  selectSpecies,
  setSpeciesData,
} from "../../features/HomeAndSearchSlice";
import SpeciesCard from "../../Compoments/Shared/SpeciesCard";
import * as env from "../../env";
import Specie from "../../Interface/ISpecies";
import { Row, Col } from "react-bootstrap";

const Titles = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin-left: 1rem;
`;

export default function ResultsContent() {
  const [showMore, setShowMore] = React.useState(1);
  const { data, isLoading, isFetching, isError } = useGetSpeciesQuery({
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
        searchResults.push(<SpeciesCard key={x.id} Specie={x} hasImg={true} />);
      } else {
        moreSearchResults.push(
          <SpeciesCard key={x.id} Specie={x} hasImg={false} />
        );
      }
    });
  }

  return (
    <>
      <div>
        <Titles style={{ marginTop: "1rem" }}>
          Kết quả {`(${data?.pagination.total})`}
        </Titles>
      </div>
      <Row xxl={4} className="ResultsWapper" style={{ width: "100%" }}>
        {isFetching || isLoading ? (
          <h1>Loading</h1>
        ) : isError ? (
          <h1>Error</h1>
        ) : (
          searchResults
        )}
      </Row>
      <div>
        <Titles style={{ borderTop: "2px solid black", paddingTop: 5 }}>
          Kết quả khác
        </Titles>
      </div>
      <Row xxl={4} className="ResultsWapper" style={{ width: "100%" }}>
        {isFetching || isLoading ? (
          <h1>Loading</h1>
        ) : isError ? (
          <h1>Error</h1>
        ) : (
          moreSearchResults
        )}
      </Row>
      <div className="mb-2 d-flex justify-content-center">
        <Button
          variant="none border-bottom fs-4 border-2"
          onClick={() => {
            setShowMore(showMore + 1);
          }}
        >
          tải thêm
        </Button>
      </div>
    </>
  );
}

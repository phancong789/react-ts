import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MagnifyIcon from "mdi-react/MagnifyIcon";
import HelpCircleIcon from "mdi-react/HelpCircleIcon";
import { useAppSelector, useAppDispatch } from "../../CustomHook/hook";
import "./assets/scss/SearchBar.scss";
import { useGetSpeciesQuery } from "../../service/HomeAndSearchApi";
import { Col } from "react-bootstrap";
import {
  selectSearch,
  setSearchResult,
  setSpeciesData,
} from "../../features/HomeAndSearchSlice";
import useOutsideAlerter from "../../CustomHook/useOutsideAlerter";

const Partition = styled.div`
  margin: 0 40px;
  border: 1px solid white;
  height: 110%;
`;

const ShowMore = styled.button`
  border-bottom: 1px solid black !important;
  padding: 5px !important;
  margin: 5px !important;
  margin: 0;
  background-color: white !important;
  p {
    margin: 0;
  }
  &:hover {
    border-bottom: 2px solid black !important;
  }
`;

const SearchResult = styled.button`
  padding: 8px 25px 5px !important;
  display: block;
  width: 100%;
  background-color: white !important;
  text-align: start;
  &:hover {
    background-color: #5f5f5f !important;
    color: white;
  }
`;
const SearchBar: React.FC<{ isHome: boolean }> = ({ isHome }) => {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [perpage, setPerPage] = React.useState(5);
  const searchResult = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();
  const wrapperRef = React.useRef(null);
  const customhook = useOutsideAlerter(wrapperRef);
  const navigate = useNavigate();

  const { data, isLoading } = useGetSpeciesQuery({
    paginate: true,
    page: 1,
    perpage: perpage,
    search: searchInput,
  });

  return (
    <div className="searchContainer position-relative">
      <Col ref={wrapperRef} lg={4} xl={6} xxl={8} className="inputWapper">
        <input
          placeholder="Tìm Kiếm"
          onChange={(e) => {
            setPerPage(5);
            setSearchInput(e.currentTarget.value);
            if (data?.list) dispatch(setSearchResult(data?.list));
          }}
          onFocus={() => {
            customhook.setShowPopDown(true);
          }}
          className="searchInput"
          type="text"
        />
        <Col
          lg={4}
          xl={6}
          xxl={8}
          className={
            customhook.showPopDown
              ? "position-absolute searchresult bg-light z-2"
              : "position-absolute searchresult bg-light z-2 d-none"
          }
        >
          {searchResult?.map((item, index) => {
            if (index < 5)
              return (
                <SearchResult
                  value={item.id}
                  onClick={(e) => {
                    window.location.href =
                      "http://wlp.howizbiz.com/species/" +
                      e.currentTarget.value;
                  }}
                >
                  {isLoading && "đang tải"} {item.ten}
                </SearchResult>
              );
          })}

          <ShowMore
            onClick={() => {
              setPerPage(18);
              if (data) dispatch(setSpeciesData(data));
              if (isHome) {
                navigate("/search");
              }
            }}
          >
            <p>Xem thêm kết quả khác</p>
          </ShowMore>
        </Col>
      </Col>
      <button>
        <MagnifyIcon color="#fff" size={30} />
      </button>
      {isHome ? (
        <>
          <Partition />
          <Link
            to="/search"
            className="advanceBtn"
            style={{ color: "white", fontSize: "1.2rem" }}
          >
            <p>
              Nâng Cao <HelpCircleIcon color="#000" />
            </p>
          </Link>
        </>
      ) : (
        <div>
          <Link to="/search">
            <p className="advanceBtnPress">Nâng Cao</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

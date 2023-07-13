import styled from "styled-components";
import { Link } from "react-router-dom";
import "./assets/scss/SearchBar.scss";
import React from "react";

const Partition = styled.div`
  margin: 0 40px;
  border: 1px solid white;
  height: 110%;
`;
const SearchBar: React.FC<{ isHome: boolean }> = ({ isHome }) => {
  return (
    <div className="searchContainer">
      <input placeholder="Tìm Kiếm" className="searchInput" type="text" />
      <button></button>
      {isHome ? (
        <>
          <Partition />
          <Link
            to="/search"
            className="advanceBtn"
            style={{ color: "white", fontSize: "1.2rem" }}
          >
            <p>Nâng Cao</p>
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

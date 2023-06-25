import React from "react";
import TopBar from "./SearchPage/TopBar";
import SideBar from "./SearchPage/SideBar";
import * as env from "../env";
import Specie from "../Interface/ISpecies";

interface loaicongbo {
  list: Specie[];
  pagination: {
    count: 0;
    hasMoreItems: false;
    itemsPerPage: 0;
    page: 0;
    total: 367;
  };
}

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

  return (
    <>
      <TopBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div>
          <div>
            <p>Kết quả {cardData?.pagination.total}</p>
          </div>
          {}
          <div>
            <p>Kết quả khác</p>
          </div>
          {}
        </div>
      </div>
    </>
  );
}

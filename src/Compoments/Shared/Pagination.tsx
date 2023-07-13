import React from "react";
import ChevronLeftIcon from "mdi-react/ChevronLeftIcon";
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import * as env from "../../env";
import "./assets/scss/Pagination.scss";

export default function Pagination() {
  // var pagecount = Math.ceil(
  //   (controlpanelcontext?.listUser?.pagination.total as number) /
  //     Number(env.getUserParam.get("perpage"))
  // );
  // var currentpage = Number(env.getUserParam.get("page"));
  // var prevPage = currentpage - 1;
  // var nextPage = currentpage + 1;

  // let min: number;
  // let max: number;
  // min =
  //   Number(env.getUserParam.get("perpage")) *
  //     Number(env.getUserParam.get("page")) -
  //   Number(env.getUserParam.get("perpage")) +
  //   1;
  // if (
  //   Number(env.getUserParam.get("perpage")) <
  //   (controlpanelcontext?.listUser?.pagination.total as number)
  // ) {
  //   max =
  //     Number(env.getUserParam.get("page")) *
  //     Number(env.getUserParam.get("perpage"));
  // } else {
  //   max = controlpanelcontext?.listUser?.pagination.total as number;
  // }
  // let listLi = [];
  // for (var page = prevPage; page <= nextPage; page++) {
  //   if (page <= pagecount) {
  //     if (page === 0) continue;

  //     listLi.push(
  //       <li>
  //         <button
  //           onClick={(e) =>
  //             controlpanelcontext?.ChangePage(e.currentTarget.innerText)
  //           }
  //           className={currentpage === page ? "active" : ""}
  //         >
  //           {page}
  //         </button>
  //       </li>
  //     );
  //   }
  // }

  return (
    <div className="Pagination m-4">
      <div>
        <p></p>
      </div>
      <div>
        <ul>
          <li>
            <button onClick={() => {}}>
              <ChevronLeftIcon />
            </button>
          </li>
          {}
          <li>
            <button onClick={() => {}}>
              <ChevronRightIcon />
            </button>
          </li>
        </ul>
      </div>
      <div>
        <select
          onChange={(e) => {}}
          name="perpage"
          value={env.getUserParam.get("perpage") as string}
        >
          <option value="5">5 / trang</option>
          <option value="10">10 / trang</option>
          <option value="25">25 / trang</option>
          <option value="50">50 / trang</option>
        </select>
      </div>
    </div>
  );
}

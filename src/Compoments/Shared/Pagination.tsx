import React from "react";
import ChevronLeftIcon from "mdi-react/ChevronLeftIcon";
import DotsHorizontalIcon from "mdi-react/DotsHorizontalIcon";
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import * as env from "../../env";
import "./assets/scss/Pagination.scss";
import { useAppSelector } from "../../CustomHook/hook";
import { selectListUsers } from "../../features/UserSlice";
import { useGetUserListQuery } from "../../service/UserApi";

export default function Pagination() {
  const [recall, setReCall] = React.useState(false);
  const userListdata = useAppSelector(selectListUsers);

  const { refetch } = useGetUserListQuery(0);
  var pagecount = Math.ceil(
    (userListdata?.pagination.total as number) /
      Number(env.getUserParams.get("perpage"))
  );
  var currentpage = Number(env.getUserParams.get("page"));
  var prevPage = currentpage - 1;
  var nextPage = currentpage + 1;

  let min: number;
  let max: number;

  min =
    Number(env.getUserParams.get("perpage")) * currentpage -
    Number(env.getUserParams.get("perpage")) +
    1;
  max = currentpage * Number(env.getUserParams.get("perpage"));
  if (min > (userListdata?.pagination.total as number)) {
    min = 0;
  }
  if (max > (userListdata?.pagination.total as number)) {
    max = userListdata?.pagination.total as number;
  }
  let listLi = [];
  for (var page = prevPage; page <= nextPage; page++) {
    if (page <= pagecount) {
      if (page === 0) continue;

      listLi.push(
        <li>
          <button
            onClick={(e) => {
              env.getUserParams.set("page", e.currentTarget.innerText);
              setReCall(!recall);
              refetch();
            }}
            className={currentpage === page ? "active" : ""}
          >
            {page}
          </button>
        </li>
      );
    }
  }

  return (
    <div className="Pagination m-4">
      <div>
        <p>{min + " " + max + "/" + userListdata?.pagination.total}</p>
      </div>
      <div>
        <ul>
          {currentpage > 1 ? (
            <li>
              <button
                onClick={() => {
                  env.getUserParams.set("page", String(currentpage - 1));
                  setReCall(!recall);
                  refetch();
                }}
              >
                <ChevronLeftIcon />
              </button>
            </li>
          ) : undefined}
          {currentpage > 2 ? (
            <li>
              <button
                onClick={() => {
                  env.getUserParams.set("page", "1");
                  setReCall(!recall);
                  refetch();
                }}
              >
                1
              </button>
            </li>
          ) : undefined}
          {currentpage > 3 ? (
            <li>
              <button>
                <DotsHorizontalIcon />
              </button>
            </li>
          ) : undefined}
          {listLi}
          {currentpage < pagecount - 2 ? (
            <li>
              <button>
                <DotsHorizontalIcon />
              </button>
            </li>
          ) : undefined}
          {currentpage < pagecount - 1 ? (
            <li>
              <button
                onClick={() => {
                  env.getUserParams.set("page", pagecount.toString());
                  setReCall(!recall);
                  refetch();
                }}
              >
                {pagecount}
              </button>
            </li>
          ) : undefined}
          {currentpage < pagecount ? (
            <li>
              <button
                onClick={() => {
                  env.getUserParams.set("page", String(currentpage + 1));
                  setReCall(!recall);
                  refetch();
                }}
              >
                <ChevronRightIcon />
              </button>
            </li>
          ) : undefined}
        </ul>
      </div>
      <div>
        <select
          onChange={(e) => {
            env.getUserParams.set("perpage", e.currentTarget.value);
            env.getUserParams.set("page", "1");
            setReCall(!recall);
            refetch();
          }}
          name="perpage"
          value={env.getUserParams.get("perpage") as string}
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

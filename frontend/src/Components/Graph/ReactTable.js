import { useTable } from "react-table";
import React, { useMemo, useEffect, useState } from "react";

//import axios from "axios";
//import faker from "faker/locale/ko";
import "./new.css";

function ReactTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <>
      <div class="product__page__title">
        <div class="row"></div>
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-8">
            <div class="section-title">
              <h4>실시간 검색어</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-4 col-md-8">
          <table class="type09" {...getTableProps()}>
            <tbody class="row" {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div class="col-lg-4"></div>
      </div>
      <br></br>
    </>
  );
}

function Table() {
  const columns = useMemo(() => [
    {
      Header: "순위",
      accessor: "id",
    },

    {
      Header: "영화제목",
      accessor: "text",
    },
  ]);

  const [peopleData, setdata] = useState([]);
  const getData = async () => {
    console.log("1");
    const json = await (console.log("2-2"),
    await fetch(`http://127.0.0.1:8000/insertcnt/top`)).json();
    console.log("2-3");
    setdata(json);
    console.log(json);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("3");

  return <ReactTable columns={columns} data={peopleData} />;
}
export default Table;

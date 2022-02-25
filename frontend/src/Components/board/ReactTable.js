import React, { useMemo, useEffect, useState } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import "../Graph/new.css";

function ReactTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div class="row">
      <div class="col-lg-12"></div>
      <div class="col-lg-12 col-md-8">
        <table class="type10" {...getTableProps()}>
          <tbody class="row" {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              console.log(row);
              return (
                <Link to={"/Community2/boarddetail/" + row.values.id + "/"}>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, i) =>
                      i == 1 ? (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ) : (
                        <th {...cell.getCellProps()}>{cell.render("Cell")}</th>
                      )
                    )}
                  </tr>
                </Link>
              );
            })}
          </tbody>
        </table>
      </div>
      <div class="col-lg-4"></div>
    </div>
  );
}
export default ReactTable;

import React, { useMemo, useEffect, useState } from "react";
import { useTable } from "react-table";
import "../Graph/new.css";
import ReactTable from "./ReactTable";

const Posts = ({ posts, loading }) => {

    const columnData = [
        {
          accessor: 'id',
          Header: 'Num',
        },
        {
          accessor: 'title',
          Header: 'Title',
        },
        {
            accessor: 'readcount',
            Header: '조회수',
        }
    ]

    const columns = useMemo(() => columnData, []);
    const data = useMemo(() => posts);

    if (loading) {
        return <h2>Now Loadoing...</h2>
    }
    return<ReactTable columns={columns} data={data} />;
};
export default Posts;

/* const Posts = ({ posts, loading }) => {
    if (loading) {
        return <h2>Now Loadoing...</h2>
    }
    return (
        <ul>
            {posts.map(post =>(
                <li key={post.id}>
                    {post.title}
                </li>
            ))}

        </ul>
    );
}; 
export default Posts;*/
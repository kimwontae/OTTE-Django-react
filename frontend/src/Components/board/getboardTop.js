import $ from "jquery";
import axios from "axios";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactTable from "./ReactTable";

class boardtop extends Component {

    state = {
        posts: [],
        columns: [{
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
    };

    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/board/Top/');
            const posts = await res.json();
            this.setState({
                posts
            });
            console.log(posts);
        } catch (e) {
            console.log(e);
        }
    }
 
    render() {
        return <ReactTable columns={this.state.columns} data={this.state.posts} />;
    }
}

export default boardtop;

import $ from "jquery";
import axios from "axios";
import React, { Component } from 'react';
import Getboardtop from "./getboardTop";
import Getboardlist from "./getboardlist";
import { Link } from "react-router-dom";
class getboard extends Component {
    submitClick = (e) => {
        this.id= $('#id').val();
        console.log($('#id').val()+'버튼 함수 발생')
        axios.delete('http://127.0.0.1:8000/board/'+this.id+'/')
    }
 
    render() {
        return (
            <div className="container" color="bleck">
                <h2>조회수 상위</h2>
                <Getboardtop />
                <h2>전체 게시글 리스트</h2>
                <Getboardlist />
                <Link to="/Community2/insert">
                    <button>신규등록</button>
                </Link>
            </div>
        );
    }
}

export default getboard;
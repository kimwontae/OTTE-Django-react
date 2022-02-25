import $ from "jquery";
import axios from "axios";
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class getboard_org extends Component {

    state = {
        posts: []
    };

    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/board/');
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
        return (
            <div className="container">
                <div className="row">
                <div className="col-lg-12">
                    {this.state.posts.map(item => (
                    <form >
                    <div key={item.id}>
                        <div class="card">
                            <div class="card border-primary mb-3">
                            <Link to={'/Community2/boarddetail/'+item.id+'/'} >
                                <div class="card-header">{item.title}</div>
                                <div class="card-body">
                                {item.content} 조회수: {item.readcount}
                                    <input type="hidden" id="id" placeholder={item.id} defaultValue={item.id}></input>
                                    <input type="hidden" id="title" placeholder={item.title} defaultValue={item.title}></input>
                                    <input type="hidden" id="content" placeholder={item.content} defaultValue={item.content}></input>
                                </div>
                                <div class="card-footer">
                                </div>
                            </Link>
                            </div>
                        </div>
                    </div>
                    </form >
                ))}
                </div>
            </div>
            </div>
        );
    }
}

export default getboard_org;

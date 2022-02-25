import $ from "jquery";
import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";

class boardview extends Component {

    submitClick = (e) => {
        const id = this.props.id;
		this.title = $('#title').val();
        this.username = $('#username').val();
        this.content = $('#content').val();
		this.readcount = $('#readcount').val();
		this.reuser = $('#reuser').val();
        if(this.reuser == this.username){
			alert("조건이 충족 되었습니다.")
			axios.put(`http://127.0.0.1:8000/board/${id}/`, {
            title: this.title,
            username: this.username,
            content: this.content,
			readcount: this.readcount,
        })
        }else{
			if(this.reuser == ''){
				alert("사용자를 입력해주세요.")
			}else{
				alert("일치하지 않는 사용자입니다.")
			}
      }
    }
    
    state = {
        posts: [],
		images: []
    };

    async componentDidMount() {
        try {
            const id = this.props.id;
            const res = await fetch(`http://127.0.0.1:8000/board/${id}/`);
            const posts = await res.json();
			const res2 = await fetch(`http://127.0.0.1:8000/board/image/${id}/`);
            const images = await res2.json();
            this.setState({
                posts,
				images
            });
 			axios.put(`http://127.0.0.1:8000/board/${id}/`, {
            title: this.state.posts.title,
            username: this.state.posts.username,
            content: this.state.posts.content,
			readcount: this.state.posts.readcount+1,
        	})
            console.log(this.state)
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div class="card border-primary mb-3">
                <div class='card-header'>
                    <p>
                        <input class="form-control" id="title" placeholder={this.state.posts.id} defaultValue={this.state.posts.title}></input>
                    </p>
                </div>
                <div class='card-body'>
				{this.state.images.map(item => (
                    <div key={item.id}>
                        <a>
						<img src={"http://127.0.0.1:8000"+item.images} width="1024" height="768"/>
                        </a>
                    </div>
                ))}
                    <p>
                    	<input class="form-control" id="username" placeholder={this.state.posts.username} defaultValue={this.state.posts.username} readOnly="readOnly"></input>
                    </p>
                    <p>
                        <textarea class="form-control" id="content" placeholder={this.state.posts.content} defaultValue={this.state.posts.content} row="40"/>
                    </p>
                    <p>
                        <input class="form-control" id="readcount" placeholder={this.state.posts.readcount} defaultValue={this.state.posts.readcount} readOnly="readOnly"></input>
                    </p>
                    <p>
                        <input class="form-control" id="writedate" placeholder={this.state.posts.writedate} defaultValue={this.state.posts.writedate} readOnly="readOnly"></input>
                    </p>
					<input class="form-control" id="reuser" ></input> 
					<button type="submit" onClick={(e) => this.submitClick(e)}>수정</button>
                </div>
            </div>
        );
    }
  }
  
export default boardview;
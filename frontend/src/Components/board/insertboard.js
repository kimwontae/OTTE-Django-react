import $ from "jquery";
import axios from "axios";
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class insert extends Component {

  state = {
    posts: [],
    board_id : ''
  };

  async componentDidMount() {
    try {
        const res = await fetch('http://127.0.0.1:8000/board/last');
        const posts = await res.json();
        const board_id = 1;
        if(posts[0] == null){
          console.log("보드 항목을 못 받아옴")
          this.setState({
            posts,
            board_id
          });
        }else{
          console.log("보드 항목이 확인됨")
          const board_id = posts[0].id+1
          this.setState({
            posts,
            board_id
          });
        }
        
/*         if(posts[0].id >= 1){
          board_id=posts[0].id+1
          this.setState({
            posts,
            board_id
          });
        }else{
          this.setState({
            posts,
            board_id
          });
        } */
        console.log(this.state.board_id);
    } catch (e) {
        console.log(e);
    }
  }

  submitClick = (e) => {
    this.title = $('#title').val();
    this.username = $('#username').val();
    this.content = $('#content').val();
    this.readcount = $('#readcount').val();
    console.log(this.title)

    if(this.title === '' && this.content === ''){
      alert("내용을 채워주세요")
    }else{
        axios.post('http://127.0.0.1:8000/board/', {
        title: this.title,
        username: this.username,
        content: this.content,
        readcount: this.readcount,
      })
    }
  }
  

  render() {
    
    const uploadModule = async(e) =>{
      
      var imgmane = ""
      e.preventDefault();
      const desc = e.target[4].value;
      const upload_file = e.target[5].files[0]

      const formData = new FormData();
      formData.append("description", desc);
      formData.append("images", upload_file);
      formData.append("enctype","multipart/form-data");
      axios(
          {
              method: "POST",
              url: "http://127.0.0.1:8000/board/test/",
              data: formData,
              headers:{
                  "Content-Type": "multipart/form-data",
              }
          }
      ).then(function(response){console.log(response)})
      console.log(upload_file.name)
      imgmane = "media/images/"+upload_file.name
      window.location.href = "http://localhost:3000/Community2/";
      alert('저장이 완료 되었습니다.')
    }
      return (
        <div className="container" color="bleck">
              <div className="row">
              <div className="col-lg-12">
                  <h2>board insert Test</h2>
                  <form onSubmit={uploadModule}>
                  <div class="card">
                    <div class="card border-primary mb-3"></div>
                    <div class="card-header">
                      <p>
                        <input id="title" class="form-control" placeholder="title"></input>
                      </p>
                    </div>
                    <div class="card-body">
                      <p>
                        <input type="hidden" id="username" defaultValue="username" readonly="readonly"></input>
                     </p>
                      <p>
                        <textarea class="form-control" id="content" placeholder="content" rows="20"/>
                      </p>
                      <p>
                        <input type="hidden" id="readcount" defaultValue="0" readonly="readonly"></input>
                      </p>
                      {/* <p>
                        <input type="date" class="form-control"  id="writedate"></input>
                      </p> */}
                      
                        <input type="text" defaultValue={this.state.board_id} class="form-control" name="description" />
                        <br />
                        <input type="file" name="images" />
                    </div>
                    <div class="box-footer">
                      <p>
                        <button type="submit" onClick={(e) => this.submitClick(e)}>작성</button>
                      </p>
                    </div>
                    </div>
                  </form>
              </div>
          </div>
        </div>
      );

      
      /*return(
        <div class="row text-center" style="width: 100%">
								<div style="width: 85%; float: none; margin: 0 auto">
									<tr>
										<form id='registerForm' action="/board/write" method="post">
											<div class="card border-primary mb-3" style="max-width: 80rem; margin: auto;">
												<div class="card-header">
													<input type="text" name="title" class="form-control" placeholder="제목을 입력해 주세요">
													<input type="text" name="name" value="${user.userid}" style="display: none;" readonly>
												</div>
												
												<div class="card-body">
													<h4 class="card-title"></h4>
													<p class="card-text"><!-- 게시물 작성 -->
														<textarea class="form-control" name="content" id="exampleTextarea" rows="20"></textarea>
													</p>
													<div class="box-body"><!-- 파일첨부 -->
														<div class="form-group" id="filedropHere">
															<label for="exampleInputEmail1">File DROP Here</label>
															<div class="fileDrop"></div>
														</div>
														<div class="box-footer">
															<div>
																<hr>
															</div>
															<ul class="mailbox-attachments clearfix uploadedList"></ul>
														</div>
													</div>
													<p> <!-- 작성완료 제출 -->
														<button class="btn btn-secondary my-2 my-sm-0" type="submit">등록</button>
													</p>
												</div>
											</div>
										</form>
									</tr>
								</div>
							</div>
      ) */
  }
}

export default insert;
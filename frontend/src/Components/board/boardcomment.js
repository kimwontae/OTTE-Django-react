import $ from "jquery";
import axios from "axios";
import { Component } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
class boardview extends Component {
  deleteClick = (e) => {
    this.board_id = $("#org_id").val();
    this.comment_user = $("#comment_user").val();
    this.delete_user = $("#delete_user").val();
    if (this.comment_user == this.delete_user) {
      alert("두 값이 일치합니다.");
      axios.delete(
        "http://127.0.0.1:8000/board/comment/delete/" + this.board_id + "/"
      );
    } else {
      alert("다른 사용자입니다.");
    }
  };

  submitClick = (e) => {
    this.board_id = $("#board_id").val();
    this.title = $("#comment_title").val();
    this.comment_user = $("#comment_user").val();
    this.comment_content = $("#comment_content").val();

    if (this.title === "" && this.content === "") {
    } else {
      axios.post("http://127.0.0.1:8000/board/comment/", {
        board_id: this.board_id,
        title: this.title,
        comment_user: this.comment_user,
        comment_content: this.comment_content,
      });
    }
  };

  state = {
    posts: [],
    display: "none",
  };

  async componentDidMount() {
    try {
      const id = this.props.id;
      const res = await fetch(`http://127.0.0.1:8000/board/comment/${id}/`);
      const posts = await res.json();
      this.setState({
        posts,
      });
      console.log(this.state);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const id = this.props.id;
    return (
      <div class="card-footer">
        <form>
          <p>
            <input
              type="hidden"
              id="board_id"
              defaultValue={this.props.id}
            ></input>
            <input class="form-control" id="comment_title"></input>
          </p>
          <p>
            <input
              type="hidden"
              id="comment_user"
              defaultValue="tester"
            ></input>
            <input class="form-control" id="comment_content"></input>
          </p>
          <button type="submit" onClick={(e) => this.submitClick(e)}>
            작성
          </button>
        </form>
        <div>
          {this.state.posts.map((item) => (
            <div key={item.id}>
              <h5>{item.title}</h5>
              <span>
                {item.comment_content}
                <input type="hidden" id="org_id" defaultValue={item.id}></input>
                <input
                  type="hidden"
                  id="comment_user"
                  defaultValue={item.comment_user}
                ></input>
                <input id="delete_user"></input>
                <button type="submit" onClick={(e) => this.deleteClick(e)}>
                  삭제
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default boardview;

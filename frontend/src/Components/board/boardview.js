import { Component } from "react";
import Boarddetail from "./boarddetail";
import Boardcomment from "./boardcomment";

class boardview extends Component {
  render() {
    return (
      <div>
        <div class="container">
          <div className="row">
            <x1></x1>
            <div class="row d-flex justify-content-center"></div>
            <div class="col-lg-12">
              <div class="card">
                <div>
                  <Boarddetail id={this.props.match.params.id} />
                </div>
                <div>
                  <Boardcomment id={this.props.match.params.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default boardview;

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="page-up">
        <a href="#" id="scrollToTopButton">
          <span className="arrow_carrot-up"></span>
        </a>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="footer__logo"></div>
          </div>
          <div className="col-lg-8">
            <div className="footer__nav">
              <ul>
                <li>
                <a href ="http://localhost:3001/">관리자 페이지</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2">
            <p>
              <script>document.write(new Date().getFullYear());</script>
              All rights reserved | This site is made with
              <i className="fa fa-heart" aria-hidden="true"></i> by Team1
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

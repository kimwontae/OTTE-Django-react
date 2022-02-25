import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import $ from "jquery";
// import "../../source/css/Header.css";

function Header(props) {
/*   var didScroll;
  // 스크롤시에 사용자가 스크롤했다는 것을 알림
  $(window).scroll(function(event){ didScroll = true; });
    // hasScrolled()를 실행하고 didScroll 상태를 재설정
  setInterval(function() { if (didScroll) { hasScrolled(); didScroll = false; } }, 250);

  function hasScrolled() {
    var nowScrollTop = window.scrollY;
    if(nowScrollTop>50){
      console.log(document.getElementById("header"));
    }else if(nowScrollTop=0){
      console.log('초기 범위 안입니다.');
    }
  } */

  $(document).ready(function(){       
    var scroll_pos = 0;
    $(document).scroll(function() { 
        scroll_pos = $(this).scrollTop();
        if(scroll_pos > 50) {
            $("header").css('background', 'linear-gradient(to top, transparent, black)');
        } else {
            $("header").css('background', 'transparent');
        }
    });
  });

  let [userprofile, setUserprofile] = useState(false);
  let [currentUser_pk, setCurrentUser_pk] = useState();
  let [userNickname, setUserNickname] = useState("")

  useEffect(() => {
    fetch("http://localhost:8000/user/current/", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // 현재 유저 정보 받아왔다면, 로그인 상태로 state 업데이트 하고
        if (json.id) {
          //유저정보를 받아왔으면 해당 user의 프로필을 받아온다.
        }
        fetch(
          "http://localhost:8000/user/auth/profile/" + json.id + "/update/",
          {
            method: "PATCH",
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((userData) => {
            setCurrentUser_pk(userData.user_pk);
            setUserNickname(userData.nickname);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userNickname]);
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo">
              <Link to={"/"}>
                <img src={require("./logo.png")}></img>
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
          </div>
          <div className="col-lg-2">
            <div className="header__nav">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li>
                    <Link to={"/Community2"}>자유게시판</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="header-nav">
              <div className="header-nav-links">
                {props.modal === false ? (
                  <Link to="/login">
                    <button className="header-btn">로그인</button>
                  </Link>
                ) : (
                  <>
                    <div
                      className="user-container"
                      onClick={() => {
                        setUserprofile(!userprofile);
                      }}
                    >
                      <button className="header-btn"> MENU </button>
                      {userprofile === true ? (
                        <div className="user-profile">
                          <div className="profile-menu">
                            <Link to="/profile">
                              <div className="header-btn">내 정보</div>
                            </Link>
                            <Link onClick={props.handleLogout} to="/">
                              <div className="header-btn">로그아웃</div>
                            </Link>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
    </header>
  );
}

export default Header;

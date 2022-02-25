import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import $ from "jquery";
import Detail from "../Movie/Detail";
import axios from "axios";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "15%",
    right: "15%",
    bottom: "40px",
    border: "1px solid #ccc",
    background: "#0b0c2a",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
};

function SearchModal({
  id,
  title,
  summary,
  coverImg,
  release,
  runtime,
  naver,
  imdb,
  nation,
}) {
  //검색 기록 서버로 전송
  function submitClick(e) {
    console.log("클릭 이벤트가 실행 되었습니다.");
    console.log(title);
    console.log(summary);
    console.log(coverImg);
    axios.post(`http://127.0.0.1:8000/insertcnt/`, {
      text: title,
    });
  }

  //modal창 오픈을 위한 변수, 상태 저장
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <div className="row">
        <div className="product__item__pic">
          {/* 클릭 1회에 2개 이벤트 부여 */}
          <img
            id={id}
            onClick={(e) => {
              setModalIsOpen(true);
              submitClick(e);
            }}
            src={`https://image.tmdb.org/t/p/original/${coverImg}`}
          />
        </div>
      </div>
      <div className="product__item__text">
        <h5>
          {/* 클릭 1회에 2개 이벤트 부여 */}
          <a
            id={id}
            onClick={(e) => {
              setModalIsOpen(true);
              submitClick(e);
            }}
          >
            {title}
          </a>
        </h5>
      </div>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {/* 모달창 안에 Detail 컴포넌트 호출 */}
        <Detail
          title={title}
          id={id}
          release={release}
          runtime={runtime}
          naver={naver}
          imdb={imdb}
          nation={nation}
          summary={summary}
          coverImg={coverImg}
        />
      </Modal>
    </div>
  );
}

export default SearchModal;

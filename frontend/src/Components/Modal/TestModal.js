import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Detail from "../Movie/Detail";

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

//SearchModal에서 검색기록 넘겨주는 기능 제외
function TestModal({
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <div className="row">
        <div className="product__item__pic">
          <img
            className="product__item__pic_box"
            onClick={() => setModalIsOpen(true)}
            src={`https://image.tmdb.org/t/p/original/${coverImg}`}
          />
        </div>
      </div>
      <div className="product__item__text">
        <h5>
          <a onClick={() => setModalIsOpen(true)}>{title}</a>
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

export default TestModal;

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import TestModal from "../Modal/TestModal";

function Movie({ id, title }) {
  //최신영화 호출
  const [latestmovies, setLatestMovies] = useState([]);
  //id로 호출 받아 해당 작품의 상세 정보 불러오기
  const getMoviesLatest = async () => {
    const json = await (
      await fetch(`http://127.0.0.1:8000/apimovie/${id}`)
    ).json();

    setLatestMovies(json);
    //console.log(json);
  };
  useEffect(() => {
    getMoviesLatest();
  }, []);

  return (
    <div className="product__item__text">
      <TestModal
        key={latestmovies.otteid}
        title={latestmovies.title}
        id={latestmovies.otteid}
        release={latestmovies.release_date}
        runtime={latestmovies.runtime}
        naver={latestmovies.naverid}
        imdb={latestmovies.imdbscore}
        nation={latestmovies.original_language}
        summary={latestmovies.overview}
        coverImg={latestmovies.poster_path}
      />
    </div>
  );
}

//우리가 어떤 props을 가지고 있는지 선언/ 위에는 props을 받기 위한 코드
Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired, //배열이므로
};

export default Movie;

import { useState, useEffect } from "react";

import MovieLatest from "../Components/Movie/MovieLatest";
import SearchBar from "../Components/Search/SearchBar";
import MovieKorea from "../Components/Movie/MovieKorea";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../source/css/bootstrap.min.css";
import ReactTable from "../Components/Graph/ReactTable";

function Home() {
  //loading의 변화를 setloading에 저장, useState는 loading의 초기값 설정
  const [totalmovies, setTotalMovies] = useState([]);
  const [latestmovies, setLatestMovies] = useState([]);
  const [koreamovies, setKoreaMovies] = useState([]);

  //검색을 위한 전체 영화 DB 불러오기
  const getMoviesTotal = async () => {
    const json = await (await fetch(`http://127.0.0.1:8000/apimovie`)).json();

    setTotalMovies(json);
  };
  useEffect(() => {
    getMoviesTotal();
  }, []);

  //최신영화 호출
  const getMoviesLatest = async () => {
    const json = await (
      await fetch(`http://127.0.0.1:8000/apimovie/recent`)
    ).json();

    setLatestMovies(json);
  };
  useEffect(() => {
    getMoviesLatest();
  }, []);

  //한국영화
  const getMoviesKorea = async () => {
    const json = await (
      await fetch(`http://127.0.0.1:8000/apimovie/korea`)
    ).json();

    setKoreaMovies(json);
    console.log(json);
  };
  useEffect(() => {
    getMoviesKorea();
  }, []);

  //slide 세팅값 설정
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <>
      {/* <section class="product-page spad"> */}
      <div class="container">
        <div class="row">
          <x1></x1>
          {/* 실시간 인기검색어 테이블 */}
          <div class="col-lg-12">
            <ReactTable />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            {/* 검색 */}
            <div class="product__page__content">
              <SearchBar placeholder="영화 제목" data={totalmovies} />
            </div>
            {/* 최신작품 */}
            <div class="product__page__content">
              <div class="product__page__title">
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-8">
                    <div class="section-title">
                      <h4>최신 작품</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 ">
                  <Slider {...settings}>
                    {latestmovies.map((movie) => (
                      <MovieLatest id={movie.otteid} title={movie.title} />
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            {/* 한국착품 */}
            <div class="product__page__content">
              <div class="product__page__title">
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-8">
                    <div class="section-title">
                      <h4>한국 작품</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="product__item">
                    <Slider {...settings}>
                      {koreamovies.map((movie) => (
                        <MovieKorea id={movie.otteid} title={movie.title} />
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </section> */}
    </>
  );
}

export default Home;

import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ottlist = [
  {
    name: "Netflix",
    image: "https://www.justwatch.com/images/icon/207360008/s100",
  },
  {
    name: "wavve",
    image: "https://www.justwatch.com/images/icon/155655742/s100",
  },
  {
    name: "Watcha",
    image: "https://www.justwatch.com/images/icon/2538290/s100",
  },
  {
    name: "Disney Plus",
    image: "https://www.justwatch.com/images/icon/147638351/s100",
  },
  {
    name: "Amazon Prime Video",
    image: "https://www.justwatch.com/images/icon/52449861/s100",
  },
  {
    name: "True Story",
    image: "https://images.justwatch.com/icon/244289819/s100",
  },
  {
    name: "Mubi",
    image: "https://www.justwatch.com/images/icon/164970114/s100",
  },
  {
    name: "GuideDoc",
    image: "https://images.justwatch.com/icon/2625277/s100",
  },
  {
    name: "DocAlliance Films",
    image: "https://images.justwatch.com/icon/244290074/s100",
  },
  {
    name: "Apple TV Plus",
    image: "https://www.justwatch.com/images/icon/152862153/s100",
  },
];
function Otticons({
  title,
  coverImg,
  id,
  summary,
  release,
  runtime,
  naver,
  imdb,
  nation,
}) {
  const [ottnames, setOttnames] = useState([]);
  const [filterednames, setFilterednames] = useState([]);
  const getOttname = async () => {
    const json = await (
      await fetch(`http://127.0.0.1:8000/apimovie/ott/${id}`)
    ).json();
    const jsonarray = [];
    for (let i = 0; i < json.length; i++) {
      jsonarray.push(json[i].ottname);
    }
    setOttnames(jsonarray);
    console.log(jsonarray);
  };
  useEffect(() => {
    getOttname();
  }, []);
  const ottimg = [];
  for (let i = 0; i < ottnames.length; i++) {
    for (let j = 0; j < ottlist.length; j++) {
      if (ottnames[i] === ottlist[j].name) ottimg.push(ottlist[j].image);
    }
  }
  console.log(ottimg);

  return (
    <div class="secton-title">
      <ul>
        <li>
          {/* {ottnames && ottnames.map((x) => <a key={x}>{x}</a>)}
          {ottlist.map((s) => {}
            <img src={s.image} />
          ))} */}
          {ottimg &&
            ottimg.map((g) => (
              <a key={g}>
                <img src={g} />
              </a>
            ))}
        </li>
      </ul>
    </div>
  );
}

Otticons.propTypes = {
  id: PropTypes.number.isRequired,
};
export default Otticons;

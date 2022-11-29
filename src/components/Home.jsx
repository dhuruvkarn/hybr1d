import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
function Home() {
  const [dataArray, setDataArray] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://hn.algolia.com/api/v1/search?query=${searchText}`,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
      withCredentials: false,
    })
      .then(({ data }) => {
        setDataArray(data.hits);
      })
      .catch((err) => {
        console.log(err.messge);
      });
  }, [searchText]);
  return (
    <>
      <div className="mainDiv">
        <div className="inputDivMainDiv">
          <input
            className="searchInput"
            type="text"
            value={searchText}
            placeholder="Enter for search"
            onChange={handleSearch}
          />
          <MdClose
            style={{ display: searchText.length === 0 ? "none" : "" }}
            onClick={() => {
              setSearchText("");
            }}
            className="closeButton"
          />
        </div>
        <div className="dataMainDiv">
          {dataArray?.map((elem, index) => {
            return (
              <div
                onClick={() => {
                  navigate(`/product/${elem.objectID}`);
                }}
                key={index}
                className="particularDiv"
              >
                <div className="title">Title</div>
                <div>{elem.title}</div>
                <div>
                  <span className="title">Author</span> :- {elem.author}
                </div>
                <div>
                  <span className="title">Points</span> :- {elem.points}
                </div>
                <div>
                  <span className="title">Relevency Score</span> :-{" "}
                  {elem.relevancy_score}
                </div>
                <a href={elem.url} target="_blank" rel="noreferrer">
                  explore more
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;

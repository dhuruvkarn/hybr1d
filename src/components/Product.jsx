import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
function Product() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `http://hn.algolia.com/api/v1/items/${id}`,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
      withCredentials: false,
    })
      .then(({ data }) => {
        console.log(data, "data");
        setProductData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.messge);
      });
  }, [id]);

  function children(child) {
    if (child.length === 0) {
      return;
    }
    child.forEach((elem) => {
      const breakLine = document.createElement("br");
      const para = document.createElement("p");
      const commentDiv = document.getElementById("commentAppendDiv");
      para.innerHTML = elem.text;
      commentDiv.append(para, breakLine);
      children(elem.children);
    });
  }

  useEffect(() => {
    if (productData != null) {
      children(productData.children);
    }
  }, [productData]);

  return (
    <>
      {loading ? (
        <centre className="loadingDiv">Loading...</centre>
      ) : (
        <div className="productMainDiv">
          <div className="productTitle">
            <span className="title productTitle">Title :- </span> &nbsp;
            {productData?.title}
          </div>
          <div className="productTitle">
            <span className="title productTitle"> Points :-</span> &nbsp;
            {productData?.points}
          </div>
          <div>
            <div className="comments">Comments</div>
            <div id="commentAppendDiv" className="commentText"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;

import React from "react";
import "./Widgets.css";

import NewsCard from "./NewsCard"


function Widgets() {
  return (
    <div className="widgets">
      <div className="topTextContainer">
        <div className="topTextContainer__div">
          <h2 className="topText">Latest News</h2>
          <div className="NewsCards" style={{paddingTop: "10px"}}>
            <NewsCard text="Lorem Ipsum Dolor Sit Amet"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Widgets;

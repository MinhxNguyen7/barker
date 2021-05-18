import { Card } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent';

import React from "react";
import "./Widgets.css";


function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        <Card>
        <CardMedia style = {{ height: 0, paddingTop: '56%'}}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/680px-Banana-Single.jpg"/>
        <CardContent>
          Hello 
        </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Widgets;

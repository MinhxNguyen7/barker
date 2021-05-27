import React from "react";
import axios from "axios"
import "./NewsCard.css"
import {Card, CardImg, CardText, CardBody, Button} from 'reactstrap';

import settings from "./functionals/settings"

export default class NewsCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {text:"", media_url:""}
  }

  componentDidMount(){
    // Gets a random ID and removes it from idList
    const postURL = settings.GET_WHOLE_TWEET_URL + this.props.id + "/"
    axios
      .get(postURL)
      .then((reponse)=>{
        let post = reponse.data;
        this.setState({
          text: post.text.split(" ").splice(0,20).join(" "), 
          media_url: post.media
        })
      })
  }

  render(){
    const bodyStyle = {
      padding:"20px", border:"0", 
      borderTop:"1px solid rgb(235, 238, 240)", borderBottom: "1px solid rgb(235, 238, 240)"
    }

    const news_url = [window.location.origin, "news", this.state.media_url.substring(5)].join("/")
    return(
      <a className="newsCard__a" href={news_url} target="_blank" rel="noopener noreferrer">
        <Card body outline color="primary" style={bodyStyle}>
          <div className="newsCardDiv">{this.state.text}</div>
        </Card>
      </a>
    )
  }
}
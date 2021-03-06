import React from "react";
import ReactPlayer from 'react-player/lazy';
import ReactCardFlip from 'react-card-flip';
import VisibilitySensor from 'react-visibility-sensor';
import {htmlTagger} from "./functionals/utils"

import "./Post.css";
import { Avatar, Card, CardMedia } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite"

class Post extends React.Component{ 
  constructor(props){
    super(props);
    this.state = {isFlipped: false, isPaused: false, blurb: "", liked: false}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  render(){
    // Check if react-player can play media
    // Falls back to image display if it cannot
    let media, text, explanation
    const media_url = String(this.props.media)

    if(this.props.explanation==="" || this.props.explanation===undefined){
      explanation = "This Bark current does not have an explanation"
    }
    else{
      explanation = htmlTagger(this.props.explanation, 'link')
    }
    
    text = htmlTagger(htmlTagger(this.props.text, 'hashtag'), 'atSymbol')
    
    if(media_url.startsWith("news:")){
      const news_url = [window.location.origin, "news", media_url.substring(5)].join("/")
      media = (
        <a className="news__a" href={news_url} target="_blank" rel="noopener noreferrer">
          <Card className="news__card" style={{paddingRight: "20px"}}>
            <CardMedia image={this.props.img}/>
            <div className="cardTextDiv">
              {this.props.text.split(" ").slice(0,20).join(" ")+"..."}
            </div>
          </Card>
        </a>
      )
      text = this.props.text
      text = text.substring(0, text.length-3)
    }
    else{
      if(ReactPlayer.canPlay(media_url)){
        media = (
        <VisibilitySensor onChange={this.visibilityChange}>
          {({isVisible}) => {
            let w, h
            if(window.innerWidth < 420){
              h = "auto"
              w = "70vw"
            }
            else if(window.innerWidth < 1024){
              h = "20vw"
              w = "35vw"
            }
            else{
              h = "40vh"
              w = "90%"
            }
            return(
              <div className="player-wrapper">
                <ReactPlayer height={h} width={w}
                url={media_url} loop={true} muted={true} playing={isVisible && !this.state.isPaused} 
                onClick={() => this.setState({isPaused: true})}
                config={{
                  youtube:{playerVars:{controls: 1, disablekb: 1, modestbranding:1, rel:0, color:"white"}
                  }}}>
                  <div/>
                </ReactPlayer>
              </div>
            )
          }}
        </VisibilitySensor>
        )
        console.log("play!")
      }
      else if (media_url === "" || media_url == null){
        const img_url = this.props.img
        if(img_url){
          media = <img src={img_url}/>
          // console.log("here: " + img_url)
          // console.log(media)
        }
        else media=<div/>
      }
      else{
        media = <img src={media_url} alt=""/>
      }
    }

    const flipper = (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        {/* Front element */}
        <p className="text" dangerouslySetInnerHTML={{ __html: text }}/> 
      
        {/* Back elemenent */}
        <p className="text" dangerouslySetInnerHTML={{ __html: explanation }}/>
      </ReactCardFlip>
    )

    return (
      <div className="post">

          <div className="post__avatar">
            <Avatar src={this.props.avatar} />
          </div>

          <div className="post__body">

            <div className="post__header">
              <div className="post__headerText">
                <h3 onClick={this.handleClick}>
                  {this.props.displayName}{" "}
                  <span className="post__headerSpecial">
                  {this.props.verified && <VerifiedUserIcon className="post__badge"/>} @
                    {this.props.username}
                  </span>
                </h3>
              </div>
              <div className="post__headerDescription">
                {flipper}
              </div>
            </div>
            {media}
            <div className="post__footer">
              <ChatBubbleOutlineIcon fontSize="small" />
              <RepeatIcon fontSize="small" />
              <a style={{display:"block", cursor: "pointer"}} onClick={()=> this.setState({liked: !this.state.liked})}>{
                this.state.liked ? 
                <FavoriteIcon fontSize="small" style={{color:"rgb(224, 36, 94)"}}/> :
                <FavoriteBorderIcon fontSize="small" />
              }</a>
            </div>
          </div>

      </div>
    );
  }
}

export default Post;

import React from "react";
import ReactPlayer from 'react-player/lazy';
import ReactCardFlip from 'react-card-flip';
import VisibilitySensor from 'react-visibility-sensor';

import "./Post.css";
import { Avatar, Card } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";


class Post extends React.Component{ 
  constructor(props){
    super(props);
    this.state = {isFlipped: false, isPaused: false}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  render(){
    // Check if react-player can play media
    // Falls back to image display if it cannot
    let media
    const media_url = String(this.props.image)
    
    if(media_url.startsWith("news:")){
      const news_url = [window.location.origin, "news", media_url.substring(5)].join("/")
      media = (
        <a className="news__a" href={news_url} target="_blank" rel="noopener noreferrer">
          <Card body className="news__card">
            This is a blurb of the news article
          </Card>
        </a>
      )
    }
    else{
      if(ReactPlayer.canPlay(media_url)){
        media = (
        <VisibilitySensor onChange={this.visibilityChange}>
          {({isVisible}) => { 
            return(
              <div className="player-wrapper">
                <ReactPlayer height={"25vw"} width={"90%"}
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
        media = ""
      }
      else{
        media = <img src={media_url}/>
      }
    }

    let explanation
    if(this.props.explanation==="" || this.props.explanation===undefined){
      explanation = "This Bark current does not have an explanation"
    }
    else{
      explanation = this.props.explanation.replace( // eslint-disable-next-line
      /(<a href=")?((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))(">(.*)<\/a>)?/gi,
      function(){return '<a href="' + arguments[2] + '" target="_blank">' + (arguments[7] || arguments[2]) + '</a>' }
    )}
    
    const text = this.props.text.replace( // eslint-disable-next-line
      /(<a href=")?((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))(">(.*)<\/a>)?/gi,
      function(){return '<a href="' + arguments[2] + '"target="_blank">' + (arguments[7] || arguments[2]) + '</a>'}
    )

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
              <FavoriteBorderIcon fontSize="small" />
            </div>
          </div>

      </div>
    );
  }
}

export default Post;

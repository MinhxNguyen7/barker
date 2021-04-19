import React, { forwardRef } from "react";
import ReactPlayer from 'react-player/lazy'
import ReactCardFlip from 'react-card-flip';

import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";


class Post extends React.Component{ //= forwardRef(({ displayName, username, verified, text, image, avatar, explanation }, ref) => {
  constructor(props){
    super(props);
    this.state = {isFlipped: false}
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
    if(ReactPlayer.canPlay(this.props.image)){
      media = (
      <div className="player-wrapper">
        <ReactPlayer url={this.props.image} // TODO: Autoplay when in view
          muted={true} loop={true} playing={false} height={"45vh"} width={null}>
          <div/>
        </ReactPlayer>
      </div>)
      console.log("play!")
    }
    else if (this.props.image !== "" && this.props.image != null){
      media = <img src={this.props.image} alt="" />
    }

    let explanation
    if(this.props.explanation==="" || this.props.explanation===undefined){
      explanation = "This Bark current does not have an explanation"
    }
    else{
      explanation = this.props.explanation.replace(
      /(<a href=")?((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))(">(.*)<\/a>)?/gi,
      function(){return '<a href="' + arguments[2] + '">' + (arguments[7] || arguments[2]) + '</a>'}
    )}
    
    const text = this.props.text.replace(
      /(<a href=")?((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))(">(.*)<\/a>)?/gi,
      function(){return '<a href="' + arguments[2] + '">' + (arguments[7] || arguments[2]) + '</a>'}
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
                <h3>
                  {this.props.displayName}{" "}
                  <span className="post__headerSpecial">
                  {this.props.verified && <VerifiedUserIcon className="post__badge"/>} @
                    {this.props.username}
                </span>
                </h3>
              </div>
              <div className="post__headerDescription" onClick={this.handleClick}>
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

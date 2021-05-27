import React from "react";
import axios from "axios"

import Post from "./Post";
import "./Feed.css";
import ViewSelector from "./ViewSelector"

import FlipMove from "react-flip-move";
import SearchIcon from "@material-ui/icons/Search";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import {randomUser} from "./functionals/utils"
import settings from "./functionals/settings"


class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: false, queue: false, posts: [], idList: []};
  }
  
  componentDidMount(){
    this.addPost(3)
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.queue === true){
      this.addPost()
      this.state.queue = false
    }
    // Check if Viewer has been changed
    if(prevProps.viewer !== this.props.viewer){
      this.updateIdList()
    }
  }

  updateIdList(){
    this.setState({posts: [], loading: true})
      const currentViewer = this.props.viewer
      const viewerURL = settings.GET_IDs_FROM_VIEWER_URL + currentViewer + "/"
      console.log("Getting IDs from: " + viewerURL)
      axios
        .get(viewerURL)
        .then((reponse)=>{
          const tweetIds = reponse.data.tweetIds
          // console.log(tweetIds)
  
          this.setState({idList: tweetIds})
          this.setState({loading: false})
          this.addPost(6);
        })
        .catch(err=>{console.log(err)})
  }

  addPost = (n=1) => {
    for(let i=0;i<n && this.state.idList.length > 0;i++){
      // console.log("Adding post")
      this.setState({loading: true});
      // Gets a random ID and removes it from idList
      const id = this.state.idList.splice(Math.floor(Math.random() * this.state.idList.length), 1)
      const postURL = settings.GET_WHOLE_TWEET_URL + id + "/"
      // console.log("Getting post from: " + postURL)

      axios
        .get(postURL)
        .then(reponse => {
          this.setState({loading: true})
          let post = reponse.data;

          // For random name generation
          if(post['username'].startsWith("random:") || post['username']==="AmericanNews"){
            const fake_user = randomUser()

            post['username'] = fake_user['username'];
            post['displayName'] = fake_user['displayName'];
          }

          // If the post's image URL contains API redirect, set image url to the API's answer
          if(post['media'].startsWith('api:')){
            axios
              .get(post['media'].substring(4))
              .then(media_response => post['media'] = media_response.data)
              .catch(err => console.log(err + "—retrieving from " + post['media'].substring(4)))

            // Sets image url to a loading gif while waiting for photo
            post['media'] = "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
          }

          // If post's text starts with [repeat] tag, put post id back into idList
          if(post['text'].startsWith('[repeat]')){
            post['text'] = post['text'].substring(8)
            this.state.idList.push(id)
          }

          if(post['avatar']===null || post['avatar']===""){
            post['avatar'] = "/api/img/ProfilePic/"+String(Math.round(Math.random()*1000))
          }

          // Adds the post into the state
          this.setState({posts: this.state.posts.concat(post), loading: false});
          
        })
        .catch((err) => "Error retrieving post: " + err)
      this.setState({loading: false})
    }
    
  }

  handleScroll = (element) => {
    element.preventDefault()
    const height_target = Math.round(element.target.scrollHeight - element.target.scrollTop)

    // Check if there are any posts left
    if(this.state.idList.length > 0){
      // checks if the user has scrolled to the bottom of the element
      if (height_target <= Math.ceil(element.target.clientHeight) + 500) {
        // only add post if a post isn't already loading
        if(this.state.loading === true) {
          if(this.state.queue === false){ // Loading and not queuing
            this.state.queue = true
          }
        }
        else { // If not loading
          this.addPost(2)
        } 
      }
    }
    else{
      console.log("Out of posts!")
       // Do something when it runs out of posts
    }
  }

  moreClick = () => {
    console.log("Clicked moreClick")
    window.open("https://github.com/LeoLinRui/SSTP/wiki", "_blank")
  }

  profileClick = (e) => {
    console.log("Clicked profileClick")
    this.props.switchClick(e)
  }

  exploreClick = () => {
    console.log("Clicked exploreClick")
    window.alert("Page in progress")
  }

  render() {
    let head = null
    if(window.innerWidth > 420){
      head = <h2>Home</h2>
    }
    else{
      head = 
        <h2>
          <div className="topIconDiv">
            <PermIdentityIcon classname="topIcon" onClick={this.profileClick}/>
            <SearchIcon classname="topIcon" onClick={this.exploreClick}/>
            <MoreHorizIcon classname="topIcon" onClick={this.moreClick}/>
          </div>
        </h2>
    }

    return (
      <div className="feed" onScroll={this.handleScroll}>
        <div className="feed__header">
          {head}
        </div>
        <FlipMove>
          {this.state.posts.map((post, index) => (
            <Post
              key={index}
              username={post.username}
              displayName={post.displayName}
              verified={post.verified}
              text={post.text}
              explanation={post.explanation}
              avatar={post.avatar}
              media={post.media}
              img={post.img}
            />
          ))}
        </FlipMove>
        {/* <button onClick={()=>this.addPost()}>click</button> */}
        </div>
    );
  }
}


export default Feed;
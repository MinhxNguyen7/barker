import React from "react";
import axios from "axios"

import settings from "./settings"

import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

import {randomUser} from "./utils"


class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: false, queue: false, posts: [], idList: [], viewedList: []};
    this.homeClick = this.homeClick.bind(this);
    this.exploreClick = this.exploreClick.bind(this);
    this.profileClick = this.profileClick.bind(this);
  }

  // Only update DOM when things aren't loading
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !this.state.loading;
  }
  
  componentDidMount(){
    this.addPost()
  }

  componentDidUpdate(prevProps){
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

      const viewerURL = settings.GET_IDs_FROM_VIEWER_URL + this.props.viewer + "/"
      console.log("Getting IDs from: " + viewerURL)
      axios
        .get(viewerURL)
        .then((reponse)=>{
          const data = reponse.data
          console.log(data)
  
          this.setState({idList: data})
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
          let post = reponse.data;
          // console.log(post)

          // For random name generation
          if(post['username'].startsWith("random:")){
            const fake_user = randomUser()

            post['username'] = fake_user['username'];
            post['displayName'] = fake_user['displayName'];
          }

          // If the post's image URL contains API redirect, set image url to the API's answer
          if(post['image'].startsWith('api:')){
            axios
              .get(post['image'].substring(4))
              .then(image_response => post['image'] = image_response.data)
              .catch(err => console.log(err + "—retrieving from " + post['image'].substring(4)))

            // Sets image url to a loading gif while waiting for photo
            post['image'] = "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
          }

          // If post's text starts with [repeat] tag, put post id back into idList
          if(post['text'].startsWith('[repeat]')){
            post['text'] = post['text'].substring(8)
            this.state.idList.push(id)
          }

          // Adds the post into the state
          this.setState({posts: this.state.posts.concat(post), loading: false});
        })
        .catch((err) => "Error retrieving post: " + err)
    }
    
  }

  handleScroll = (element) => {
    element.preventDefault()
    const height_target = Math.round(element.target.scrollHeight - element.target.scrollTop)

    // Check if there are any posts left
    if(this.state.idList.length > 0){
      // checks if the user has scrolled to the bottom of the element
      if (height_target <= Math.ceil(element.target.clientHeight) + 300) {
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

  homeClick(){
    console.log("Clicked homeClick")
    this.updateIdList()
    // Idk why, but only scrolling once doesn't go all the way
    window.scrollTo(0,0)
    window.scrollTo(0,0)
  }

  exploreClick(){
    console.log("Clicked exploreClick")
  }

  profileClick(){
    console.log("Clicked profileClick")
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
            <HomeIcon classname="topIcon" onClick={this.homeClick}/>
            <SearchIcon classname="topIcon" onClick={this.exploreClick}/>
            <PermIdentityIcon classname="topIcon" onClick={this.profileClick}/>
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
              image={post.image}
            />
          ))}
        </FlipMove>
        <button onClick={()=>this.forceUpdate} color="--twitter-color"> click </button>
        </div>
    );
  }
}


export default Feed;
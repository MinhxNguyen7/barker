import React from "react";
import axios from "axios"

import settings from "./settings"

import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";

import mocker from 'mocker-data-generator'


class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: false, queue: false, posts: [], idList: [], viewedList: []};
  }

  /*
  // Only update DOM when things aren't loading
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !this.state.loading;
  }
  */

  componentDidMount(){
    this.addPost()
  }

  componentDidUpdate(prevProps){
    if(this.state.queue == true){
      this.addPost()
      this.state.queue = false
    }
    // Check if Viewer has been changed
    if(prevProps.viewer !== this.props.viewer){
      this.setState({posts: [], loading: true})

      const viewerURL = settings.GET_IDs_FROM_VIEWER_URL + this.props.viewer + "/"
      console.log("Getting IDs from: " + viewerURL)
      axios
        .get(viewerURL)
        .then((reponse)=>{
          const data = reponse.data
          console.log(data)

          this.setState({idList: data})

          for (let i = 0; i < 6; i++) {
            this.addPost();
          }

          this.setState({loading: false})
        })
        .catch(err=>{console.log(err)})
    }
  }

  
  addPost = (n=1) => {
    for(let i=0;i<n && this.state.idList.length > 0;i++){
      console.log("Adding post")
      this.setState({loading: true});

      // Gets a random ID and removes it from idList
      const id = this.state.idList.splice(Math.floor(Math.random() * this.state.idList.length), 1)

      const postURL = settings.GET_POST_FROM_ID + id + "/"
      console.log("Getting post from: " + postURL)
      
      axios
        .get(postURL)// gets the tweet, including the poster's username
        .then(response => {
          let post = response.data[0];
          const poster_url = settings.GET_POSTER_INFO_URL + post['poster'] + '/'

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

          axios
            .get(poster_url) // gets the poster's info from their username that was acquired above
            .then(poster_response => {
              const userInfo = poster_response.data[0];
              post['username'] = userInfo['username'];
              post['displayName'] = userInfo['displayName'];
              post['avatar'] = userInfo['avatar']
              post['verified'] = userInfo['verified'];

              // For random name generation
              if(post['username'].startsWith("random:")){
                const fake_user = getRandomUser()

                post['username'] = fake_user['username'];
                post['displayName'] = fake_user['displayName'];
              }

              // Adds the post info into the state
              this.setState({posts: this.state.posts.concat(post), loading: false});
              this.forceUpdate()
            })
            .catch(err2 => {
              console.log("axios error with getting user info: " + err2);
              this.setState({loading: false});
              })
        })
        .catch(err => {console.log("axios error: " + err); this.setState({loading: false});})
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
          if(this.state.queue == false){ // Loading and not queuing
            this.state.queue = true
          }
        }
        else { // If not loading
          for(let i=0;i<3 && this.state.idList.length > 0;i++)
            this.addPost()
        } 
      }
    }
    else{
      console.log("Out of posts!")
       // Do something when it runs out of posts
    }
  }

  handleClick = () =>{
    this.forceUpdate()
  }
  
  render() {
    return (
      <div className="feed" onScroll={this.handleScroll}>
        <div className="feed__header">
          <h2>Home</h2>
        </div>
        <TweetBox/>
        <FlipMove>
          {this.state.posts.map((post, index) => (
            <Post
              key={index}
              username={post.username}
              displayName={post.displayName}
              verified={post.verified}
              text={post.text}
              avatar={post.avatar}
              image={post.image}
            />
          ))}
        </FlipMove>
        <button onClick={this.handleClick} color="--twitter-color"> ooh button! </button>
        </div>
    );
  }
}

// Function for getting random user using mocker-data-generator
// This is way too complicated
function getRandomUser(){
  const mocker_schema = {
    firstName: {faker: 'name.firstName'},
    lastName: {faker: 'name.lastName'},
    username: {function: function() {
      return (this.object.firstName+this.object.lastName)
    }},
    displayName: {function: function() {
      return (this.object.firstName + " " + this.object.lastName)
    }}
  }

  const fake_user = mocker().schema('user', mocker_schema, 1).buildSync()['user'][0]
  //console.log(fake_user)

  return fake_user
}

export default Feed;
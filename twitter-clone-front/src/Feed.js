import React from "react";
import axios from "axios"

import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";

import mocker from 'mocker-data-generator'


class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, posts: []};
  }

  componentDidMount() {
    // loads 5 posts first
    for (let i = 0; i < 6; i++) {
      this.addPost();
    }
  }

  // Only update DOM when things aren't loading
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    //return !this.state.loading;
    return true
  }


  addPost = () => {
    const API_URL = "/api/"

    const tweet_url = API_URL + "getRandomTweet/";
    let poster_url = API_URL + "getUserInfo/";
    this.setState({loading: true});

    axios
      .get(tweet_url)// gets the tweet, including the poster's username
      .then(response => {
        let post;
        post = response.data[0];
        poster_url = poster_url + post['poster'] + '/'

        // If the post returns an API redirect, set image url to the API's answer
        if(post['image'].startsWith('api:')){
          // Sets image url to a loading gif while InspiroBot returns a photo
          post['image'] = "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"

          axios
            .get(post['image'].substring(4))
            .then(image_response => post['image'] = image_response.data)
            .catch(err1 => console.log("axios error with image api: " + err1))
        }

        axios
          .get(poster_url) // gets the poster's info from their username that was acquired above
          .then(poster_response => {
            const userInfo = poster_response.data[0];
            post['username'] = userInfo['username'];
            post['displayName'] = userInfo['displayName'];
            post['avatar'] = userInfo['avatar']
            post['verified'] = userInfo['verified'];

            // For random username/displayName generation
            if(post['username'].startsWith("random:")){
              const fake_user = getRandomUser()

              post['username'] = fake_user['username'];
              post['displayName'] = fake_user['displayName'];
            }

            // Adds the post info into the state
            this.setState({posts: this.state.posts.concat(post)});
            this.setState({loading: false});
          })
          .catch(err2 => {
            console.log("axios error with getting user info: " + err2);
            this.setState({loading: false});
            })

      })
      .catch(err => {console.log("axios error: " + err); this.setState({loading: false});})
    }

  handleScroll = (e) => {
    e.preventDefault()
    const height_target = Math.round(e.target.scrollHeight - e.target.scrollTop)

    // checks if the user has scrolled to the bottom of the element
    // only add post if a post isn't already loading
    if (this.state.loading === false && height_target <= Math.ceil(e.target.clientHeight) + 300) {
      // console.log("loading new post, triggered by scrolling")
      for(let i=0;i<3;i++){this.addPost()}
    }
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
        <button onClick={this.addPost}> load next post </button>
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
      return (this.object.firstName+this.object.lastName+Math.floor(Math.random() * 10))
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
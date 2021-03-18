import React from "react";
import axios from "axios"

import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";


class Feed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: false, page: 0, posts: []};
    // loads 5 posts first
    for (let i = 0; i < 5; i++) {
      this.addPost();
    }
  }


  // Only update DOM when things aren't loading
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !this.state.loading;
  }

  addPost = () =>{
    const API_URL = "/api/"

    const tweet_url = API_URL + "getRandomTweet/";
    let poster_url = API_URL + "getUserInfo/";
    this.setState({page: this.state.page + 1, loading: true});

    axios
      .get(tweet_url)// gets the tweet, including the poster's username
      .then(response => {
        let post;
        post = response.data[0];
        poster_url = poster_url + post['poster'] + '/'

        // If the post returns an API redirect, set image url to the API's answer
        if(post['image'].startsWith('api:')){
          axios
            .get(post['image'].substring(4))
            .then(response1 => post['image'] = response1.data)
            .catch(err1 => console.log("axios error1: " + err1))
          // Sets image url to a loading gif while InspiroBot returns a photo
          post['image'] = "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
        }

        axios
          .get(poster_url) // gets the poster's info from their username that was acquired above
          .then(response2 => {
            const userInfo = response2.data[0];
            post['username'] = userInfo['username'];
            post['displayName'] = userInfo['displayName'];
            post['avatar'] = userInfo['avatar']
            post['verified'] = userInfo['verified'];
            // console.log(post);
            // Adds the post info into the state
            this.setState({posts: this.state.posts.concat(post)});
            this.setState({loading: false});
          })
          .catch(err2 => {console.log("axios error2: " + err2); this.setState({loading: false});})

      })
      .catch(err => {console.log("axios error: " + err); this.setState({loading: false});})
    }

  handleScroll = (e) => {
    e.preventDefault()
    const height_target = Math.round(e.target.scrollHeight - e.target.scrollTop)

    // checks if the user has scrolled to the bottom of the element
    // only add post if a post isn't already loading
    if (this.state.loading === false && height_target <= Math.ceil(e.target.clientHeight) + 100) {
      // console.log("loading new post, triggered by scrolling")
      this.addPost()
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

export default Feed;

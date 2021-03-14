import React from "react";
import axios from "axios"

import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";


class Feed extends React.Component {


  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {loading: false, page: 0, posts: []};
    // loads 5 posts first
    for (let i = 0; i < 5; i++) {
      this.addPost();
    }
  }


  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !this.state.loading;
  }

  addPost = () =>{
    if(this.state.loading === false) {
      const API_URL = "http://localhost:8000/api/"

      const tweet_url = API_URL + "getRandomTweet/";
      let poster_url = API_URL + "getUserInfo/";
      this.setState({page: this.state.page + 1, loading: true});

      axios
        .get(tweet_url)
        .then(response1 => {
          let post;
          post = response1.data[0];
          poster_url = poster_url + post['poster'] + '/'
          axios
            .get(poster_url)
            .then(response2 => {
              let userInfo = response2.data[0]
              post['username'] = userInfo['username'];
              post['displayName'] = userInfo['displayName'];
              post['avatar'] = userInfo['avatar']
              post['verified'] = userInfo['verified'];
              console.log(post);
              this.setState({posts: this.state.posts.concat(post)});
              this.setState({loading: false});
            })
            .catch(err2 => {console.log("axios error2: " + err2); this.setState({loading: false});})
        })
        .catch(err1 => {console.log("axios error1: " + err1); this.setState({loading: false});})
    }
  }

  handleScroll = (e) => {
    e.preventDefault()
    const height_target = Math.round(e.target.scrollHeight - e.target.scrollTop)

    // checks if the user has scrolled to the bottom of the element
    // only add post if a post isn't already loading
    if (this.state.loading === false && height_target <= Math.ceil(e.target.clientHeight) + 100) {
      console.log("loading new post, triggered by scrolling")
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

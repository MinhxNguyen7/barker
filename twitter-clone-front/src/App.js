import React from "react";
import settings from "./settings"

import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import Article from "./Article"

import "./App.css";
import axios from "axios";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {viewerNum: 0, viewersList:[]}
    this.nextViewer = this.nextViewer.bind(this)
  }

  componentDidMount(){
    if(window.location.pathname === "/"){ // Only add new posts on main screen
      axios
        .get(settings.GET_VIEWERS_URL)
        .then(response =>{
          this.setState({viewersList: response.data})
          console.log("Recieved users: " + this.state.viewersList)
        })
        .catch(err => console.log("Error retrieving viewers list: " + err))
    }
  }

  nextViewer(){
    window.scrollTo(0,0)
    // Increments viewerNum
    // Wraps back to 0 when index exceeds length of viewersList
    if(this.state.viewerNum <= this.state.viewersList.length-2){
      this.setState({viewerNum: this.state.viewerNum+1})
    }
    else{
      this.setState({viewerNum: 0})
    }
    console.log("Changed viewer to " + this.state.viewersList[this.state.viewerNum])
  }

  render(){
    const pathname = window.location.pathname

    let body = null
    if(pathname === "/"){
      body = (
              <div className="app">
                <Sidebar nextViewer={this.nextViewer}/>
                <Feed viewer={this.state.viewersList[this.state.viewerNum]}/>
                <Widgets />
              </div>
              )
    }
    else if(pathname.startsWith("/news/")){
      let id = pathname.substr(6)
      // Remove trailing slash in article ID
      if(id.endsWith("/")){
        id = id.substr(0,id.length-1)
      }

      body = <Article id={id}/>
    }
    else{
      body=<div>
        Error 404: Not Found
      </div>
    }

    return (
      // BEM
      <html lang="en">
        {body}
      </html>
    );
  }
}

export default App;

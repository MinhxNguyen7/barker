import React from "react";
import settings from "./functionals/settings"

import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import Article from "./Article"

import "./App.css";
import axios from "axios";


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {viewerNum: 0, viewersList:[]}
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

  setViewer = (viewerNum) => {
    window.scrollTo(0,0)
    this.setState({viewerNum: viewerNum})
  }

  render(){
    const pathname = window.location.pathname

    let body = null
    if(pathname === "/"){
      const viewersObj = {
        list: this.state.viewersList, num: this.state.viewerNum, setNum: this.setViewer}
      body = (
              <div className="app">
                <Sidebar viewers={viewersObj}/>
                <Feed viewers={viewersObj}/>
                <Widgets />
              </div>
              )
    }
    if(pathname.startsWith("/news/")){
      let id = pathname.substr(6)
      // Remove trailing slash in article ID
      if(id.endsWith("/")){
        id = id.substr(0,id.length-1)
      }
      body = <Article id={id}/>
    }
    if(body==null){
      body=<div style={{fontSize: "xx-large"}}>Error 404: Not Found</div>
    }

    return (
      // BEM
      <html lang="en">
        {body}
      </html>
    );
  }
}


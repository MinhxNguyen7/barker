import React from "react";
import settings from "./functionals/settings"

import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import Article from "./Article"
import ViewSelector from "./ViewSelector"

import "./App.css";
import axios from "axios";


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {viewerNum: 0, viewersList:[], switcherAnchor: false, loaded: false}
  }

  componentDidMount(){
    const pathname = window.location.pathname
    if(pathname === "/" || (pathname==="/explore"&&window.innerWidth<1024)){ // Only add new posts on main screen
      axios // Get List of viewers
        .get(settings.GET_VIEWERS_URL)
        .then(response =>{
          this.setState({viewersList: response.data.sort()}, // Sorts viewers in alphabetical order
            ()=>this.setState({loaded: true}, 
              ()=>console.log("Recieved users: " + this.state.viewersList)
            )
          )
        })
        .catch(err => console.log("Error retrieving viewers list: " + err))
    }
  }

  setViewer = (viewerNum) => {
    window.scrollTo(0,0)
    this.setState({viewerNum: viewerNum}, ()=>this.forceUpdate())
  }

  shouldComponentUpdate(prevProps, prevState){
    if(prevState.viewerNum !== this.state.viewerNum) console.log("Current viewerNum: "+String(this.state.viewerNum))
    if(prevState.viewersList !== this.state.viewersList) console.log("Current viewersList: "+String(this.state.viewersList))
    return true
  }

  switchClick = (e) =>{
    e.preventDefault()
    this.setState(
      {switcherAnchor: Boolean(this.state.switcherAnchor) ? false:e.currentTarget}
    )
  }

  render(){
    const pathname = window.location.pathname
    const viewer = String(this.state.viewersList[this.state.viewerNum])

    let body = null
    if(pathname === "/"){
      const viewersObj = {
        list: this.state.viewersList, num: this.state.viewerNum, setNum: this.setViewer}
      // console.log(window.innerWidth)
      
      let widgets // only load widgets if the screen big enough for it to be displayed
      if(window.innerWidth > 1024) widgets = <Widgets viewer={viewer}/>
      else widgets = null
      
      body = (
              <div className="app">
                <Sidebar switchClick={this.switchClick}/>
                <Feed viewer={viewer} switchClick={this.switchClick}/>
                {widgets}
                
                <ViewSelector 
                  anchorEl={this.state.switcherAnchor} 
                  setAnchorEl={(val)=>{{this.setState({switcherAnchor:val})}}}
                  viewerObj={viewersObj}
                />
              </div>
              )
    }
    if(pathname === "/explore") body = <div className="app"><Widgets viewer={viewer} max_length={100}/></div>
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


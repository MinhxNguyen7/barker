import React from "react";
import settings from "./settings"

import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";

import "./App.css";
import axios from "axios";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {viewerNum: 0, viewersList:[]}
    this.nextViewer = this.nextViewer.bind(this)
  }

  componentDidMount(){
    axios
      .get(settings.GET_VIEWERS_URL)
      .then(response =>{
        this.setState({viewersList: response.data})
        console.log("Recieved users: " + this.state.viewersList)
      })
      .catch(err => console.log("Error retrieving viewers list: " + err))
  }

  nextViewer(){
    // Increments viewerNum
    // Wraps back to 0 when index exceeds length of viewersList
    if(this.state.viewerNum <= this.state.viewersList.length-2){
      this.setState({viewerNum: this.state.viewerNum+1})
    }
    else{
      this.setState({viewerNum: 0})
    }
  }

  render(){
    return (
      // BEM
      <html lang="en">
        <div className="app">
          <Sidebar nextViewer={this.nextViewer}/>
          <Feed viewer={this.state.viewersList[this.state.viewerNum]}/>
          <Widgets />
        </div>
      </html>
    );
  }
}

export default App;

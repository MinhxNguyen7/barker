import React from "react";

import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";

import "./App.css";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {viewerNum: 0, viewersList:['a','b','c','d']}
    this.nextViewer = this.nextViewer.bind(this)
  }

  componentDidMount(){
    // Get list of viewers from API
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
    // console.log("Invoked nextViewer. Value: "+this.state.viewer)
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

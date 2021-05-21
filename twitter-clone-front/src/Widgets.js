import React from "react";
import axios from "axios"
import "./Widgets.css";
import FlipMove from "react-flip-move";

import NewsCard from "./NewsCard"
import settings from "./functionals/settings"

class Widgets extends React.Component {
  constructor(props){
    super(props)
    this.state = {idList:[]}
  }

  updateList = () => {
    const viewerObj = this.props.viewers
    const viewer = viewerObj.list[viewerObj.num===viewerObj.list.length-1?0:viewerObj.num+1]
    const viewerURL = settings.GET_IDs_FROM_VIEWER_URL + viewer + "/"
  
    console.log("Getting news IDs from: " + viewerURL)
    let newsOptions = []
    axios
      .get(viewerURL)
      .then((reponse)=>{
        const newsTweetIds = reponse.data.newsTweetIds
        console.log(newsTweetIds)
        newsTweetIds.splice(0,5).forEach(id => {
          newsOptions.push(<NewsCard id={id} key={"newsCard__"+id}/>)
        });

        this.setState({
          idList: newsTweetIds.splice(0,5),
          newsOptions: newsOptions
        })
        this.forceUpdate()
      })
      .catch(err=>{console.log(err)})
  }

  shouldComponentUpdate(prevProps, prevState){
    if(prevProps.viewers.num !== this.props.viewers.num){
      this.updateList()
      return true
    }
    if(prevState.idList !== this.state.idList){
      console.log("idList-powered update")
      return true
    }
    return false
  }

  render(){
    return (
    <div className="widgets">
      <div className="topTextContainer">
        <div className="topTextContainer__div">
          <h2 className="topText">Latest News</h2>
          <div className="NewsCards" style={{paddingTop: "10px"}}>
            <FlipMove>{this.state.newsOptions}</FlipMove>
          </div>
        </div>
      </div>
    </div>
  )
  }
}

export default Widgets;

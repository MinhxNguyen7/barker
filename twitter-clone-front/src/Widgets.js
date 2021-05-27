import React from "react";
import axios from "axios"
import "./Widgets.css";
import FlipMove from "react-flip-move";

import NewsCard from "./NewsCard"
import settings from "./functionals/settings"

class Widgets extends React.Component {
  constructor(props){
    super(props)
    this.state = {idList: [], needUpdate:true, loading: false}
  }

  componentDidUpdate(prevProps){
    if(prevProps.viewer !== this.props.viewer){
      this.updateIdList()
    }
  }

  componentDidMount(){
    this.updateIdList()
  }

  updateIdList = () => {
    this.setState({idList: [], loading: true})
      const currentViewer = this.props.viewer
      const viewerURL = settings.GET_IDs_FROM_VIEWER_URL + currentViewer + "/"
      console.log("Getting news IDs from: " + viewerURL)
      axios
        .get(viewerURL)
        .then((reponse)=>{
          let newsTweetIds = reponse.data.newsTweetIds
          // Limit to 8 ids
          newsTweetIds = newsTweetIds.slice(0,newsTweetIds.length>6?6:newsTweetIds.length)
          console.log(newsTweetIds)
  
          this.setState({idList: newsTweetIds})
          this.setState({loading: false})
        })
        .catch(err=>{console.log(err)})
  }


  render(){
    return (
    <div className="widgets">
      <div className="topTextContainer">
        <div className="topTextContainer__div">
          <h2 className="topText">Latest News</h2>
          <div className="NewsCards" style={{paddingTop: "10px"}}>
            <FlipMove>{
              this.state.idList.map((id, index)=>(
                <NewsCard id={id} key={index}/>
              ))
            }</FlipMove>
          </div>
        </div>
      </div>
    </div>
  )
  }
}

export default Widgets;

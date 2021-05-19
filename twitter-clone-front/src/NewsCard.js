import React from "react";
import "./NewsCard.css"

import {Card, CardImg, CardText, CardBody, Button} from 'reactstrap';

export default class NewsCard extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
  
  }

  render(){
    const bodyStyle = {
      padding:"20px", border:"0", 
      borderTop:"1px solid rgb(235, 238, 240)", borderBottom: "1px solid rgb(235, 238, 240)"
    }
    return(
      <Card body outline color="primary" style={bodyStyle}>
        {this.props.text}
      </Card>
    )
  }
}
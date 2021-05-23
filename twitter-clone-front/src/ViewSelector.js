import React from "react";
import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";

export default class ViewSelector extends React.Component{
  shouldComponentUpdate(prevProps){
    // console.log(this.props.anchorEl)
    if(prevProps.anchorEl !== this.props.anchorEl){
      return true
    }
    return false
  }

  render(){
    const {list, num, setNum} = this.props.viewerObj
    return(
    <Menu
      id="viewers-menu"
      anchorEl={this.props.anchorEl}
      open={Boolean(this.props.anchorEl)}
      disableEnforceFocus
      onClose={()=>this.props.setAnchorEl(false)}
    >{
      list.map((viewer, index) => (
      <MenuItem key={index}
      onClick={()=>{setNum(index);this.props.setAnchorEl(false)}}
      >
        <div class="viewerOptionAvatarDiv" style={{padding:"5px"}}>
          <Avatar src={"/api/img/Website/"+String(Math.round(Math.random()*1000))}/>
        </div>
        <div class="viewerOptionText">{viewer}</div>
      </MenuItem>
      ))
    }</Menu>
    )
  }
}
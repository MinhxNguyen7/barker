import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import ViewSelector from "./ViewSelector"

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
//import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
//import MailOutlineIcon from "@material-ui/icons/MailOutline";
//import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
//import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";

import PageIcon from "./media/BarkerLogo.png";
import {scramble} from "./functionals/utils"
import dog from "./media/dog.mp3"
import { GET_VIEWERS_URL } from "./functionals/settings";

class Sidebar extends React.Component {
  constructor(props){
    super(props)
    this.state = {anchorEl: false}
  }

  bark() {
    const audioEl = document.getElementsByClassName("bark-sound")[0]
    audioEl.play()
  }

  handleClick = (event) => {
    event.preventDefault()
    this.setState({anchorEl: Boolean(this.state.anchorEl) ? false:event.currentTarget})
  }

  render(){
    return (
      <div className="sidebar">
        <img className="sidebar__twitterIcon" src={PageIcon} style={{cursor:"pointer"}}
          onClick={()=>window.open("https://github.com/MinhTheMerciless/twitter_clone/wiki", "_blank")} alt="Barker Icon"/>

        <SidebarOption active Icon={HomeIcon} text="Home" />
        <SidebarOption Icon={SearchIcon} text={"Explore"} onClick={()=>{window.alert("Page in progress")}}/>
        <SidebarOption Icon={PermIdentityIcon} text="Profile" onClick={this.props.switchClick}/>
        <SidebarOption Icon={MoreHorizIcon} text="More" onClick={()=>window.open("https://github.com/MinhTheMerciless/twitter_clone/wiki", "_blank")}/>

        <Button variant="outlined" className="sidebar__tweet" onClick={this.bark}>
          Bark
        </Button>
        <audio className="bark-sound">
          <source src={dog}></source>
        </audio>
      </div>
    );
  }
}

export default Sidebar;

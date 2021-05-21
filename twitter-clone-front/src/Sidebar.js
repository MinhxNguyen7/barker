import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
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
    const viewers = this.props.viewers

    return (
      <div className="sidebar">
        <img className="sidebar__twitterIcon" src={PageIcon} alt="Barker Icon"/>

        <SidebarOption active Icon={HomeIcon} text={scramble("Home")} />
        <SidebarOption Icon={SearchIcon} text={"Explore"} />
        <SidebarOption Icon={PermIdentityIcon} text="Profile" onClick={this.handleClick}/>
        <SidebarOption Icon={MoreHorizIcon} text="More" onClick={()=>window.open("https://github.com/LeoLinRui/SSTP/wiki", "_blank")}/>

        <Button variant="outlined" className="sidebar__tweet" onClick={this.bark}>
          Bark
        </Button>
        <audio className="bark-sound">
          <source src={dog}></source>
        </audio>

        {/* Menu for changing viewers */}
        <Menu
          id="viewers-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          disableEnforceFocus
          onClose={()=>this.setState({anchorEl:false})}
        >{viewers.list.map((viewer, index) => (
          <MenuItem key={index}
          onClick={()=>viewers.setNum(index)}
          >
            <div class="viewerOptionAvatarDiv" style={{padding:"5px"}}>
              <Avatar src={"/api/img/Website/"+String(Math.round(Math.random()*1000))}/>
            </div>
            <div class="viewerOptionText">{viewer}</div>
          </MenuItem>
        ))}</Menu>
      </div>
    );
  }
}

export default Sidebar;

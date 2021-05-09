import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";

import PageIcon from "./media/BarkerLogo.png";
import {scramble} from "./utils"
import dog from "./media/dog.mp3"

class Sidebar extends React.Component {
  playAudio() {
    const audioEl = document.getElementsByClassName("bark-sound")[0]
    audioEl.play()
  }

  render(){
    return (
      <div className="sidebar">
        <img className="sidebar__twitterIcon" src={PageIcon}/>

        <SidebarOption Icon={HomeIcon} text={scramble("Home")} />
        <SidebarOption Icon={SearchIcon} text={scramble("Explore")} />
        <SidebarOption Icon={NotificationsNoneIcon} text={scramble("Notifications")} />
        <SidebarOption Icon={MailOutlineIcon} text={scramble("Messages")} />
        <SidebarOption Icon={BookmarkBorderIcon} text={scramble("Bookmarks")} />
        <SidebarOption Icon={ListAltIcon} text={scramble("Lists")} />
        <SidebarOption active Icon={PermIdentityIcon} text="Profile" onClick={this.props.nextViewer}/>

        <SidebarOption Icon={MoreHorizIcon} text={scramble("More")} />

        <Button variant="outlined" className="sidebar__tweet" onClick={this.playAudio}>
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

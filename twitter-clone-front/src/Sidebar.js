import React from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
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

import {scramble} from "./utils"

class Sidebar extends React.Component {
  render(){
    return (
      <div className="sidebar">
        <TwitterIcon className="sidebar__twitterIcon" />

        <SidebarOption Icon={HomeIcon} text={scramble("Home")} />
        <SidebarOption Icon={SearchIcon} text={scramble("Explore")} />
        <SidebarOption Icon={NotificationsNoneIcon} text={scramble("Notifications")} />
        <SidebarOption Icon={MailOutlineIcon} text={scramble("Messages")} />
        <SidebarOption Icon={BookmarkBorderIcon} text={scramble("Bookmarks")} />
        <SidebarOption Icon={ListAltIcon} text={scramble("Lists")} />
        <SidebarOption active Icon={PermIdentityIcon} text="Profile" onClick={this.props.nextViewer}/>

        <SidebarOption Icon={MoreHorizIcon} text={scramble("More")} />

        <Button variant="outlined" className="sidebar__tweet">
          Bark
        </Button>
      </div>
    );
  }
}

export default Sidebar;

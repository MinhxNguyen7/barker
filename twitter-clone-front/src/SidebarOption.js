import React from "react";
import "./SidebarOption.css";

function SidebarOption({ active, text, Icon, onClick }) {
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`} onClick={onClick}>
      <Icon />
      <h2 className={'text'}>{text}</h2>
    </div>
  );
}

export default SidebarOption;

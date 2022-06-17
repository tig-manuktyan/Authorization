import React, { useContext } from "react";
import { FormOutlined, LogoutOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import { Context } from "../../index";

// layout
import MenuBar from "../../layouts/Menu/Menu";

// images
import logo from "./../../assets/images/Logo.png";

// icons
import { IArrowLeft } from "../../assets/icons/IArrowLeft";
import { IArrowRight } from "../../assets/icons/IArrowRight";
import Avatar from "./../Avatar/Avatar";

interface SideBarProps {
  toggle: () => void;
  collapsed: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ toggle, collapsed }) => {
  const { store } = useContext(Context);

  return (
    <div>
      <div className="logo">
        <img src={logo} className="logoIcon" />
        <div className="avatarBlock">
          <Avatar />
          <p className="nameInfo">
            {store.user.profileName !== " "
              ? store.user.profileName
              : `${store.user.name} ${store.user.surname}`}
          </p>
          <NavLink
            to="/EditProfile"
            className={"editProfile"}
            style={{ width: collapsed ? "30%" : "100%" }}
          >
            {collapsed ? <FormOutlined /> : "Edit Profile"}
          </NavLink>
        </div>
        {!collapsed && (
          <div className="followingInfo">
            <div className="inFollow">
              <h3>46</h3>
              <p>Posts</p>
            </div>
            <div className="inFollow">
              <h3>2.6k</h3>
              <p>Followers</p>
            </div>
            <div className="inFollow">
              <h3>526</h3>
              <p>Following</p>
            </div>
          </div>
        )}
      </div>
      <MenuBar />
      <div className="borgerMenuBlock">
        <button className="borgerMenu" onClick={toggle}>
          {collapsed ? <IArrowRight /> : <IArrowLeft />}
        </button>
      </div>
      <div
        className="logout"
        style={{ paddingLeft: !collapsed ? "24px" : "27px" }}
      >
        <button onClick={() => store.logout()}>
          <LogoutOutlined />
          {!collapsed && <p className="logOutText">Log Out</p>}
        </button>
      </div>
    </div>
  );
};

export default SideBar;

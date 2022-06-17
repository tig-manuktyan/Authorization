import React from "react";

import { NavLink } from "react-router-dom";
import { Menu } from "antd";

//icons
import {
  AppstoreOutlined,
  MessageOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const MenuBar: React.FC = () => {
  return (
    <Menu
      style={{ backgroundColor: "#282B34" }}
      mode="inline"
      defaultSelectedKeys={["1"]}
    >
      <Menu.Item key="1">
        <NavLink to={"/"}>
          <AppstoreOutlined />
          <span>Feed</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <SearchOutlined />
        <span>Explore</span>
      </Menu.Item>
      <Menu.Item key="3">
        <UserOutlined />
        <span>Notifications</span>
      </Menu.Item>
      <Menu.Item key="4">
        <NavLink to={"/direct"}>
          <MessageOutlined />
          <span>Direct</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="5">
        <UserOutlined />
        <span>IG Tv</span>
      </Menu.Item>
      <Menu.Item key="6">
        <NavLink to={"/settings"}>
          <SettingOutlined />
          <span>Settings</span>
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default MenuBar;

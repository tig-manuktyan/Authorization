import React, { useContext, useState } from "react";
import { Layout } from "antd";

import { Context } from "./../../index";

// css
import SideBar from "../../components/SideBar/SideBar";
import "./index.css";
const { Footer, Sider } = Layout;

interface HomeProps {
  children?: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }) => {
  const { store } = useContext(Context);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider
        style={{ backgroundColor: "#282B34" }}
        className={"mainSideBar"}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <SideBar toggle={toggle} collapsed={collapsed} />
      </Sider>
      <Layout className={"MainBar"}>
        {children}
        <Footer style={{ backgroundColor: "#3C3F52", textAlign: "center" }}>
          ATE ©2022 Created by ATE AMD
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;

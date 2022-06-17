import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Routes, Route } from "react-router-dom";
import { Context } from "./index";
import { LoadingOutlined } from "@ant-design/icons";

import { Spin } from "antd";

// components
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm";

// Pages
import Home from "./pages/Home/Home";
import EditProfile from "./pages/Home/components/EditProfile/EditProfile";
import Main from "./pages/Home/components/Main/Main";
import Settings from "./pages/Home/components/Settings/Settings";
import Direct from "./pages/Home/components/Direct/Direct";
import Profile from "./pages/Home/components/Profile/Profile";
import "./services/i18n/i18n";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { store } = useContext(Context);
  const { i18n } = useTranslation();

  function handleClick(lang: string) {
    i18n.changeLanguage(lang);
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <div>
      {/* <button onClick={() => handleClick("en")}>EN</button> */}
      {/* <button onClick={() => handleClick("ru")}>Ru</button> */}
      {store.isAuth ? (
        <>
          <Home>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/EditProfile" element={<EditProfile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/direct" element={<Direct />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Main />} />
            </Routes>
          </Home>
        </>
      ) : store.isLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>
      )}
    </div>
  );
};

export default observer(App);

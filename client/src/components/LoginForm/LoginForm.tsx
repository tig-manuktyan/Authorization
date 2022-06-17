import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { Context } from "../../index";

// css
import "./index.css";
import { useTranslation } from "react-i18next";

const LoginForm: React.FC = () => {
  const { store } = useContext(Context);
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className={"loginForm"}>
      <div className="loginFormBlock">
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 27 }}>
          <Form.Item
            name="email"
            style={{ backgroundColor: "transparent" }}
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              style={{ backgroundColor: "transparent", color: "#FFFFFF" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              style={{ backgroundColor: "transparent", color: "#FFFFFF" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 7 }}>
            <Button
              onClick={() => store.login(email, password)}
              type="primary"
              htmlType="submit"
            >
              {t("login")}
            </Button>
          </Form.Item>
        </Form>
        <Link to="/register">register</Link>
      </div>
    </div>
  );
};

export default observer(LoginForm);

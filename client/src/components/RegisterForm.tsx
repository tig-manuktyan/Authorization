import React, { useState, useContext } from "react";
import { Form, Input, Button, Select } from "antd";
import { Context } from "../index";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
const { Option } = Select;

const RegisterForm: React.FC = () => {
  const { store } = useContext(Context);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birthday, setBirthday] = useState<string >("");
  const [gender, setGender] = useState<string>("");
  const onGenderChange = (value: string) => {
    switch (value) {
      case "male":
        setGender("male");
        return;

      case "female":
        setGender("female");
        return;
    }
  };
  return (
    <div className="loginForm">
      <div className="loginFormBlock">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              style={{ backgroundColor: "transparent", color: "#FFFFFF" }}
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="surname"
            rules={[{ required: true, message: "Please input your SurName!" }]}
          >
            <Input
              style={{ backgroundColor: "transparent", color: "#FFFFFF" }}
              placeholder="LastName"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="Email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              style={{ backgroundColor: "transparent", color: "#FFFFFF" }}
              placeholder="Email"
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
          <Form.Item
            name="birthday"
            rules={[{ required: true, message: "Please input your birthday!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              style={{ backgroundColor: "transparent", color: "#FFFFFF" }}
              type={"date"}
              min="14"
              max="100"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              onClick={() =>
                store.registration(email, name, surname, birthday, gender, password)
              }
              type="primary"
              htmlType="submit"
            >
              Registration
            </Button>
          </Form.Item>
        </Form>
        <Link to="/">login</Link>
      </div>
    </div>
  );
};

export default observer(RegisterForm);

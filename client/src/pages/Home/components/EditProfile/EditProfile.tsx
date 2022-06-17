import React, { useContext, useState } from "react";
import { Select } from "antd";
import { Context } from "../../../../index";
import Avatar from "./../../../../components/Avatar/Avatar";

import "./index.css";
const { Option } = Select;

const EditProfile: React.FC = () => {
  const { store } = useContext(Context);
  const [name, setName] = useState<string>(store.user.name);
  const [surname, setSurname] = useState<string>(store.user.surname);
  const [profileName, setProfileName] = useState<string>(
    store.user.profileName
  );
  const [email, setEmail] = useState<string>(store.user.email);
  const [gender, setGender] = useState<string>(store.user.gender);


  const onGenderChange = (value: any) => {
    switch (value) {
      case "male":
        setGender("male");
        return;

      case "female":
        setGender("female");
        return;
    }
  };

  const changeHandler = (e: any) => {
    const file = e.target.files[0];
    store.uploadAvatar(file);
  };

  return (
    <div className="editProfilePage">
      <div className="avatar">
        <div className="EditavatarBlock">
          <div>
            <Avatar />
          </div>
          <div>
            <p className="editprofileName">{store.user.profileName}</p>
            <input
              accept="image/"
              className=""
              onChange={(e) => changeHandler(e)}
              type="file"
              placeholder="Изменить фото профиля"
            />
          </div>
        </div>
      </div>
      <div className="modalContent">
        <button onClick={() => store.deleteAvatar()}>
          Удалить текущее фото
        </button>
      </div>
      <form action="" className="editPageForm">
        <div>
          <label className="editPageLabel">Имя</label>
          <input
            type={"text"}
            className="editPageInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="editPageLabel">Имя пользователя</label>
          <input
            type={"text"}
            className="editPageInput"
            placeholder="ProfileName"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
          <button onClick={() => store.uploadProfileName(profileName)}>
            Send Profile Name
          </button>
        </div>
        <div>
          <label className="editPageLabel">Surn Name</label>
          <input
            type={"text"}
            className="editPageInput"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div>
          <label className="editPageLabel">Эл. адрес</label>
          <input
            className="editPageInput"
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="editPageLabel">Пол</label>
          <Select onChange={onGenderChange} value={gender} allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

import React, { useContext } from "react";
import { Context } from "../..";
import avatarImg from "./../../assets/images/avatar.png";

interface AvatarProps {}

const Avatar: React.FC<AvatarProps> = () => {
  const { store } = useContext(Context);

  const avatar = store.user.avatar
    ? `${"http://localhost:5000/" + store.user.avatar}`
    : avatarImg;
  return <img src={avatar} className="avatar" />;
};

export default Avatar;

import React, { useEffect, useState } from "react";
import UserService from "../../../../services/UserService";
import { IUser } from "../../../../models/IUser";

// components
import { SearchInput } from "../../../../components/ui-components/SearchInput/SearchInput";
import PostItem from "../../../../components/PostItem/PostItem";

// icons
import {
  BellOutlined,
  PlusCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";

// css
import "./index.css";

const Main: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getUsers();
  }, []);
  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const filterUsers = users.filter((user: IUser) =>
    user.profileName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div>
      <div
        style={{
          backgroundColor: "#3C3F52",
          padding: "20px 35px",
          borderTopLeftRadius: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SearchInput
          value={search}
          onSearch={(e: any) => setSearch(e.target.value)}
        />
        <div className="rightBlockHeader">
          <BellOutlined className="rightBlockHeaderIcon" />
          <SendOutlined className="rightBlockHeaderIcon send" />
          <button className="addPhoto">
            <PlusCircleOutlined />
            <p>Add photo</p>
          </button>
        </div>
      </div>
      <div className="content">
        <div>
          <h2 style={{ color: "#ffffff" }}>Stories</h2>
          <div className="scroller">
            {users.map((user: IUser) => {
              const avatar = `${"http://localhost:5000/" + user.avatar}`;
              return (
                <div className="scroller-item" key={user.id}>
                  <img src={avatar} />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 style={{ color: "#ffffff" }}>Feed</h2>
          <div className="FeedPostsBlock">
            {filterUsers.map((user: IUser) => {
              const avatar = `${"http://localhost:5000/" + user.avatar}`;
              return (
                <PostItem
                  key={user.id}
                  postImg={avatar}
                  postItemAvatar={avatar}
                  name={user.profileName}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

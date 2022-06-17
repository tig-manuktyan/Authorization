import React from "react";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";
import "./index.css";

interface PostItemProps {
  likeCount?: number;
  commentCount?: number;
  postImg: string | undefined;
  name?: string;
  postItemAvatar: string | undefined;
}

const PostItem: React.FC<PostItemProps> = ({
  likeCount = 0,
  commentCount = 0,
  name,
  postImg,
  postItemAvatar,
}) => {
  return (
    <div className="PostItemBlock">
      <img src={postImg} alt={"postImg"} className="postImg" />
      <div className="PostItemfooter">
        <div className="userInfo flex">
          <img src={postItemAvatar} alt="avatar" className="postItemAvatar" />
          <p className="postItemUserName postItemText">{name}</p>
        </div>
        <div className="footerRightBlock">
          <button>Follow</button>
          {/* <div className="postItemLike flex">
            <HeartOutlined className="postItemIcons" />
            <p className="postItemText ">{likeCount}</p>
          </div>
          <div className="postItemComment flex">
            <MessageOutlined className="postItemIcons" />
            <p className="postItemText">{commentCount}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PostItem;

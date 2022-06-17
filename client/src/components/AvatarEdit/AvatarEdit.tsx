import React, { useState } from "react";
import Avatar from "react-avatar-edit";

export const AvatarEdit: React.FC = () => {
  const [preview, setPreview] = useState<string>("");

  const onClose = () => {
    setPreview("");
  };

  const onCrop = (preview: any) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (elem: any) => {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  return (
    <div>
      <Avatar
        width={390}
        height={295}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        // src={src}
      />
      <img src={preview} />
    </div>
  );
};

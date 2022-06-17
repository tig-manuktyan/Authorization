import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./index.css";

interface SearchInputProps {
  value: string;
  onSearch: any;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onSearch,
}) => {
  return (
    <div className="searchInput">
      <SearchOutlined style={{ color: "#FFFFFF" }} />
      <input placeholder="Search" value={value} onChange={onSearch} />
    </div>
  );
};

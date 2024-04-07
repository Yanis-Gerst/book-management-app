"use client";
import React from "react";
import { useToggle } from "usehooks-ts";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SearchBar = () => {
  const [openCommand, toogleOpenCommand] = useToggle(false);
  return (
    <form>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="All Catagories"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fantasy">Fantasy</SelectItem>
          <SelectItem value="romance">Romance</SelectItem>
        </SelectContent>
      </Select>
      <input
        type="search"
        name="search-bar"
        placeholder="Search by title, author"
      />
    </form>
  );
};

export default SearchBar;

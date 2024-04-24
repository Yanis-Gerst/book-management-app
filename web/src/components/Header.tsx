"use client";
import React from "react";
import { Search } from "lucide-react";
import IconButton from "./IconButton";
import { useToggle } from "usehooks-ts";
import SearchBar from "./SearchBar";
import BasketIcon from "./BasketIcon";

const Header = () => {
  const [openCommand, toogleOpenCommand] = useToggle(false);

  return (
    <div className="w-full flex justify-end gap-2 px-4 mt-4 items-center h-[50px] md:justify-center mb-4 md:mb-16">
      <div className="mx-auto md:hidden">
        {" "}
        {openCommand && <SearchBar className="mx-auto" />}
      </div>
      <div className="hidden md:block md:ml-auto">
        <SearchBar className="min-w-[500px]" />
      </div>

      <IconButton onClick={toogleOpenCommand} className="md:hidden">
        <Search />
      </IconButton>
      <BasketIcon />
    </div>
  );
};

export default Header;

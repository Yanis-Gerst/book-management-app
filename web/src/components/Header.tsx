"use client";
import React, { useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import IconButton from "./IconButton";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "./ui/command";
import { useToggle } from "usehooks-ts";

const Header = () => {
  const [openCommand, toogleOpenCommand] = useToggle(false);
  const [searchValue, setSearchValue] = useState<String>("");

  return (
    <div className="w-full flex justify-end gap-2 px-4 mt-4">
      <CommandDialog open={openCommand} onOpenChange={toogleOpenCommand}>
        <CommandInput
          placeholder="Search by title, author"
          onValueChange={(value) => setSearchValue(value)}
          onSubmit={() => console.log("gest")}
        />
        <CommandList></CommandList>
      </CommandDialog>
      <IconButton onClick={toogleOpenCommand}>
        <Search />
      </IconButton>
      <IconButton>
        <ShoppingCart />
      </IconButton>
    </div>
  );
};

export default Header;

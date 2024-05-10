"use client";
import React from "react";
import { Search, User } from "lucide-react";
import IconButton from "./IconButton";
import { useToggle } from "usehooks-ts";
import SearchBar from "./SearchBar";
import BasketIcon from "./BasketIcon";
import { useRouter } from "next/navigation";
import { getLoggedAccount } from "@/lib/services/account";

const Header = () => {
  const [openCommand, toogleOpenCommand] = useToggle(false);
  const router = useRouter();
  const navigateToUserPage = () => {
    const account_id = getLoggedAccount();
    if (account_id) {
      router.push(`/account/${account_id}`);
      return;
    }
    router.push("/login");
  };

  return (
    <div className="w-full flex justify-end gap-2 px-4 mt-4 items-center h-[50px] md:justify-center mb-4 md:mb-16">
      <div className="mx-auto md:hidden">
        {" "}
        {openCommand && <SearchBar className="mx-auto" />}
      </div>
      <div className="hidden md:block md:ml-auto md:mr-auto">
        <SearchBar className="min-w-[500px]" />
      </div>

      <IconButton onClick={toogleOpenCommand} className="md:hidden">
        <Search />
      </IconButton>
      <div className="flex gap-4">
        <IconButton onClick={navigateToUserPage}>
          <User />
        </IconButton>
        <BasketIcon />
      </div>
    </div>
  );
};

export default Header;

"use client";
import React from "react";
import { Button } from "./ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

interface Props {
  children: React.ReactNode;
}

const ProHeader: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <div className="justify-center  items-center lg:relative flex mb-16">
        <Button
          variant="secondary"
          size={"sm"}
          className="mr-auto gap-2 flex lg:absolute left-0  top-0 translate-y-1/4"
          onClick={() => router.back()}
        >
          <MoveLeft width={16} height={16} />
          <p>Retour</p>
        </Button>
        <div className="max-w-[70%] mx-auto">
          <h1 className="lg:text-5xl sm:text-2xl text-xs font-bold text-center px-8">
            {children}
          </h1>
        </div>
      </div>
      {/* <SearchBar className="mt-16 bg-white max-w-[500px] mx-auto rounded-lg mb-32"></SearchBar> */}
    </>
  );
};

export default ProHeader;

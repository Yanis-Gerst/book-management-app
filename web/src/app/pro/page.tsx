import ProSpaceLink from "@/components/ProSpaceLink";
import { Archive, BookUp, FileClock } from "lucide-react";
import React from "react";

const page = async () => {
  return (
    <main className="bg-gray-100 h-screen">
      <div className="max-w-[1200px] flex flex-col justify-center items-center mx-auto pt-32">
        {" "}
        <h1 className="font-bold text-5xl mb-16">
          Bievenue sur votre Espace Pro
        </h1>
        <div className="flex justify-between w-4/5">
          <ProSpaceLink href="/pro/stocks">
            <Archive width={48} height={48} />
            <p>Stocks</p>
          </ProSpaceLink>
          <ProSpaceLink href="/pro/reservation">
            <BookUp width={48} height={48} />
            <p>Réservations</p>
          </ProSpaceLink>
          <ProSpaceLink href="/pro/loan">
            <FileClock width={48} height={48} />
            <p>Emprunt</p>
          </ProSpaceLink>
        </div>
      </div>
    </main>
  );
};

export default page;

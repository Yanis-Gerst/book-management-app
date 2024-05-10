"use client";
import ProSpaceLink from "@/components/ProSpaceLink";
import { Archive, BookUp, FileClock } from "lucide-react";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const accountId = Cookies.get("account_id");
  const router = useRouter();

  if (!accountId || parseInt(accountId) !== 11) router.push("/");
  return (
    <main className="bg-gray-100 h-screen">
      <div className="max-w-[1200px] flex flex-col justify-center text-center items-center mx-auto pt-32">
        {" "}
        <h1 className="font-bold text-2xl lg:text-5xl mb-16">
          Bievenue sur votre Espace Pro
        </h1>
        <div className="flex flex-col gap-8 lg:justify-between w-4/5 lg:flex-row">
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

export default Page;

import Articles from "@/components/Articles/Articles";
import Header from "@/components/Header";

import { fetchDataFromGetUrl } from "@/lib/services/commonServices";
import { IAccount } from "@/types/data";

import React from "react";
import AccountForm from "./AccountForm";

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: { id: string } }) => {
  const account = await fetchDataFromGetUrl<IAccount>(`account/${params.id}`);

  return (
    <main>
      <Header />
      <section className="flex gap-32 justify-center flex-col lg:flex-row px-4">
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Informations personelles</h2>
          <AccountForm account={account} />
        </div>
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Récentes activités</h2>
          <div className="flex flex-col gap-4">
            {account.locations.map((location) => (
              <div
                key={location.location_id}
                className="border-slate-200 border rounded p-3"
              >
                <h3 className="mb-2">Emprunt n°{location.location_id}</h3>
                <p className="mb-2">
                  À rendre le:{" "}
                  <span className="font-bold">{location.dateOfEnd}</span>
                </p>
                <p>Articles:</p>
                <Articles articles={location.articles} />
              </div>
            ))}
            {account.reservations.map((reservation) => (
              <div
                key={reservation.reservation_id}
                className="border-slate-200 border rounded p-3"
              >
                <h3 className="mb-2">
                  Reservation n°{reservation.reservation_id}
                </h3>
                <p className="mb-2">Fait le: {reservation.reservationDate}</p>
                <p>Articles:</p>
                <Articles articles={reservation.articles} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;

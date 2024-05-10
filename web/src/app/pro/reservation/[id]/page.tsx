import ProLayout from "@/app/ProLayout";
import Articles from "@/components/Articles/Articles";
import BookReservation from "@/components/BookReservation";
import CentralCard from "@/components/CentralCard";
import DateDisplayer from "@/components/DateDisplayer";
import DeleteItemButton from "@/components/DeleteItemButton";
import ModifyReservationForm from "@/components/MultipleSectionForm/Forms/ModifyReservationForm";
import ProHeader from "@/components/ProHeader";
import { Button } from "@/components/ui/button";
import { fetchDataFromGetUrl } from "@/lib/services/commonServices";
import { Book, IReservation } from "@/types/data";
import { BookUp, BookX } from "lucide-react";
import React from "react";

export const dynamic = "force-dynamic";

export type IFullReservationData = IReservation & {
  books: Book[];
};

const Page = async ({ params }: { params: { id: string } }) => {
  const reservation = await fetchDataFromGetUrl<IReservation>(
    `reservation/${params.id}`
  );

  if (!reservation) return;

  const reservationDate = new Date(reservation.reservationDate);

  return (
    <ProLayout>
      <ProHeader>
        Gestion de la réservation N° {reservation.reservation_id}
      </ProHeader>
      <CentralCard className="flex gap-32 items-start lg:flex-row flex-col px-2">
        <ModifyReservationForm reservation={reservation} />
        <div className="">
          <h2 className="mb-4 font-bold text-3xl">
            Récapitulatif de la réservation
          </h2>
          <p className="mb-4">
            <span className="font-bold">Date de réservation: </span>
            <DateDisplayer date={reservationDate} />
          </p>
          <h3 className="font-bold text-lg mb-2">Articles</h3>
          <Articles articles={reservation.articles} />
          <div className="flex flex-col gap-2 w-3/4 ">
            <BookReservation id={params.id} />
            <DeleteItemButton
              variant={"secondary"}
              apiEndpoint={`reservation/${params.id}`}
            >
              <BookX /> Annuler la réservation
            </DeleteItemButton>
          </div>
        </div>
      </CentralCard>
    </ProLayout>
  );
};

export default Page;

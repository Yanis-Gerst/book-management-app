import ProLayout from "@/app/ProLayout";
import Articles from "@/components/Articles";
import CentralCard from "@/components/CentralCard";
import DateDisplayer from "@/components/DateDisplayer";
import ModifyReservationForm from "@/components/MultipleSectionForm/Forms/ModifyReservationForm";
import ProHeader from "@/components/ProHeader";
import { Button } from "@/components/ui/button";
import { fetchDataFromGetUrl } from "@/lib/services/commonServices";
import { Book, IReservation } from "@/types/data";
import { BookUp, BookX } from "lucide-react";
import React from "react";

export type IFullReservationData = IReservation & {
  books: Book[];
};

const page = async ({ params }: { params: { id: string } }) => {
  const reservation = await fetchDataFromGetUrl<any>(
    `reservation/${params.id}`
  );

  console.log(reservation);
  const reservationDate = new Date(reservation.reservationDate);

  return (
    <ProLayout>
      <ProHeader>
        Gestion de la réservation de {reservation.client_name}
      </ProHeader>
      <CentralCard className="flex gap-32 items-start">
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
          <Articles books={reservation.books} />
          <div className="flex flex-col gap-2 w-3/4 ">
            <Button className="gap-2">
              <BookUp /> Emprunter les articles
            </Button>
            <Button variant="secondary" className="gap-2">
              <BookX /> Annuler la réservation
            </Button>
          </div>
        </div>
      </CentralCard>
    </ProLayout>
  );
};

export default page;

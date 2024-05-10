import ProLayout from "@/app/ProLayout";
import Articles from "@/components/Articles/Articles";
import CentralCard from "@/components/CentralCard";
import DateDisplayer from "@/components/DateDisplayer";
import DeleteItemButton from "@/components/DeleteItemButton";
import ModifyReservationForm from "@/components/MultipleSectionForm/Forms/ModifyReservationForm";
import ProHeader from "@/components/ProHeader";
import { Button } from "@/components/ui/button";
import { fetchDataFromGetUrl } from "@/lib/services/commonServices";
import { ILoan } from "@/types/data";
import { BookDown, BookUp } from "lucide-react";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const location: ILoan = await fetchDataFromGetUrl(`location/${params.id}`);
  if (!location) return;
  const locationDateStart = new Date(location.dateOfStart);
  const locationDateEnd = new Date(location.dateOfEnd);

  return (
    <ProLayout>
      <ProHeader>Gestion de l&apos;emprunt N° {location.location_id}</ProHeader>
      <CentralCard className="flex gap-32 items-start lg:flex-row flex-col px-2">
        <ModifyReservationForm reservation={location} />
        <div className="">
          <h2 className="mb-4 font-bold text-3xl">
            Récapitulatif de la location
          </h2>
          <p className="mb-4">
            <span className="font-bold">Date de début: </span>
            <DateDisplayer date={locationDateStart} />
          </p>
          <p className="mb-4">
            <span className="font-bold">Date de début: </span>
            <DateDisplayer date={locationDateEnd} />
          </p>
          <h3 className="font-bold text-lg mb-2">Articles</h3>
          <Articles articles={location.articles} />
          <div className="flex flex-col gap-2 w-3/4 ">
            <DeleteItemButton
              className="gap-2"
              apiEndpoint={`location/${params.id}`}
            >
              <BookDown /> Confirmer le rendu
            </DeleteItemButton>
          </div>
        </div>
      </CentralCard>
    </ProLayout>
  );
};

export default page;

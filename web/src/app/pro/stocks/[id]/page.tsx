import ProLayout from "@/app/ProLayout";
import CentralCard from "@/components/CentralCard";
import DataTable from "@/components/DataTable";
import ModifyBookForm from "@/components/MultipleSectionForm/Forms/ModifyBookForm";
import ProHeader from "@/components/ProHeader";
import { fetchDataFromGetUrl } from "@/lib/services/commonServices";
import { Book } from "@/types/data";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

const columns: ColumnDef<Record<string, any>>[] = [
  {
    accessorKey: "state",
    header: "État",
  },
  {
    accessorKey: "available",
    header: "Disponible",
  },
  {
    accessorKey: "loaned",
    header: "Emprunter",
  },
  {
    accessorKey: "reserved",
    header: "Réserver",
  },
];

const page = async ({ params }: { params: { id: string } }) => {
  const book = await fetchDataFromGetUrl<Book>(`book/${params.id}`);

  return (
    <ProLayout className="lg:px-8 px-2">
      <ProHeader>Modification manuelle du livre {book.title}</ProHeader>
      <CentralCard className="gap-2">
        <ModifyBookForm book={book} />
        <DataTable
          columns={columns}
          data={Object.keys(book.stocks_per_state).map((state: any) => {
            const copy = { ...book.stocks_per_state[state] };
            copy["state"] = state;
            return copy;
          })}
        />
      </CentralCard>
    </ProLayout>
  );
};

export default page;

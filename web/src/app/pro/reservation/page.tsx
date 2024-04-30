import DataTable from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import ProHeader from "@/components/ProHeader";
import ProLayout from "@/app/ProLayout";
import { renamesKeys } from "@/utils/conversion";
import {
  fetchDataFromGetUrl,
  fetchDataWithQueryFrom,
} from "@/lib/services/commonServices";

const columns: ColumnDef<Record<string, any>>[] = [
  {
    accessorKey: "client_name",
    header: "Nom",
  },
  {
    accessorKey: "mobileNumber",
    header: "N°téléphone",
  },
  {
    accessorKey: "reservationDate",
    header: "Date de réservation",
  },
];

const page = async () => {
  const all_reservation_data = await fetchDataWithQueryFrom<any>(
    "/reservation/all",
    {
      limit: 20,
    }
  );

  return (
    <ProLayout>
      <ProHeader>Gestion des stocks</ProHeader>

      <DataTable
        data={renamesKeys(all_reservation_data, "reservation_id", "id")}
        columns={columns}
      />
    </ProLayout>
  );
};

export default page;

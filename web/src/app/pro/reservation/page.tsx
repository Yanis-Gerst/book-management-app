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

export const dynamic = "force-dynamic";

const columns: ColumnDef<Record<string, any>>[] = [
  {
    accessorKey: "account_id",
    header: "accountID",
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

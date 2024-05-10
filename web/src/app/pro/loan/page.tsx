import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { ILoan, ProBook } from "@/types/data";
import { ColumnDef } from "@tanstack/react-table";
import { MoveLeft, Plus } from "lucide-react";
import React from "react";
import Link from "next/link";
import ProHeader from "@/components/ProHeader";
import ProLayout from "@/app/ProLayout";
import { renamesKeys } from "@/utils/conversion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchDataFromGetUrl,
  fetchDataWithQueryFrom,
} from "@/lib/services/commonServices";

export const dynamic = "force-dynamic";

const columns: ColumnDef<Record<string, any>>[] = [
  {
    accessorKey: "dateOfStart",
    header: "Date début",
  },
  {
    accessorKey: "dateOfEnd",
    header: "Date fin",
  },
  {
    accessorKey: "account_id",
    header: "accountID",
  },
];

const page = async () => {
  const allLocations = await fetchDataWithQueryFrom<any>("/location/all", {
    limit: 20,
  });
  const locationToRender = await fetchDataFromGetUrl<any>(
    "/location/to-render"
  );

  return (
    <ProLayout>
      <ProHeader>Gestion des stocks</ProHeader>

      <section className="mt-32 mb-8"></section>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Toutes les locations</TabsTrigger>
          <TabsTrigger value="toRender">Les locations à rendre</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <DataTable
            data={renamesKeys(allLocations, "location_id", "id")}
            columns={columns}
          />
        </TabsContent>
        <TabsContent value="toRender">
          <DataTable
            data={renamesKeys(locationToRender, "location_id", "id")}
            columns={columns}
          />
        </TabsContent>
      </Tabs>
    </ProLayout>
  );
};

export default page;

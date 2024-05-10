import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import Link from "next/link";
import ProHeader from "@/components/ProHeader";
import ProLayout from "@/app/ProLayout";
import { renamesKeys } from "@/utils/conversion";
import { Plus } from "lucide-react";
import { fetchDataWithQueryFrom } from "@/lib/services/commonServices";

export const dynamic = "force-dynamic";

const columns: ColumnDef<Record<string, any>>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "total_stocks",
    header: "stocks",
  },
  {
    accessorKey: "price",
    header: "Prix",
  },
  {
    accessorKey: "id",
    header: "ID Livre",
  },
];

const page = async () => {
  // DataRow: Book -> 5 article -> title etat emprunt dispo
  const allBooks = await fetchDataWithQueryFrom<any>("book/pro", {
    limit: 20,
  });

  return (
    <ProLayout className="px-0">
      <ProHeader>Gestion des stocks</ProHeader>

      <section className="mt-32 mb-8 px-8">
        <div className="flex flex-col gap-4">
          <Link href="/pro/stocks/add">
            <Button className="gap-2">
              <Plus width={16} height={16} /> <p>Ajouter un nouveau Livre</p>
            </Button>
          </Link>
          <Link href="/pro/stocks/article/add">
            <Button className="gap-2" variant={"secondary"}>
              <Plus width={16} height={16} /> <p>Ajouter un nouvelle Article</p>
            </Button>
          </Link>
        </div>
      </section>
      <div className="px-8">
        <DataTable
          data={renamesKeys(allBooks, "book_id", "id")}
          columns={columns}
        />
      </div>
    </ProLayout>
  );
};

export default page;

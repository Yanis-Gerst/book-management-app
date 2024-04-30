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

const columns: ColumnDef<Record<string, any>>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "stocks",
    header: "Stock",
  },
  {
    accessorKey: "loan_number",
    header: "Emprunt",
  },
  {
    accessorKey: "to_render_number",
    header: "À rendre",
  },
  {
    accessorKey: "price",
    header: "Prix",
  },
];

const page = async () => {
  const allBooks = await fetchDataWithQueryFrom<any>("book/pro", {
    limit: 20,
  });

  console.log(allBooks);

  return (
    <ProLayout>
      <ProHeader>Gestion des stocks</ProHeader>

      <section className="mt-32 mb-8">
        <Link href="/pro/stocks/add">
          <Button className="gap-2">
            <Plus width={16} height={16} /> <p>Ajouter un nouveau produit</p>
          </Button>
        </Link>
      </section>
      <DataTable
        data={renamesKeys(allBooks, "book_id", "id")}
        columns={columns}
      />
    </ProLayout>
  );
};

export default page;

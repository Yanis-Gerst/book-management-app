import SearchBar from "@/components/SearchBar";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { fetchAllsStocksBooks } from "@/lib/service";
import { ProBook } from "@/types/data";
import { ColumnDef } from "@tanstack/react-table";
import { MoveLeft, Plus } from "lucide-react";
import React from "react";

const columns: ColumnDef<ProBook>[] = [
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
    accessorKey: "price",
    header: "prix",
  },
];

const page = async () => {
  const all_books_data = await fetchAllsStocksBooks({ limit: 50 });
  return (
    <main className="min-h-screen bg-gray-100 pt-16 px-16">
      <div className="justify-center  items-center relative">
        <Button
          variant="secondary"
          className="mr-auto gap-2 absolute left-0  top-0 translate-y-1/4"
        >
          <MoveLeft width={16} height={16} />
          <p>Retour</p>
        </Button>
        <h1 className="text-5xl font-bold text-center">Gestion des stocks</h1>
      </div>

      <SearchBar className="mt-16 bg-white max-w-[500px] mx-auto rounded-lg"></SearchBar>

      <section className="mt-32">
        <Button className="gap-2">
          <Plus width={16} height={16} /> <p>Ajouter un nouveau produit</p>
        </Button>
      </section>
      <DataTable data={all_books_data} columns={columns} />
    </main>
  );
};

export default page;

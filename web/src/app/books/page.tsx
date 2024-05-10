import Header from "@/components/Header";
import Product from "@/components/ProductsUI/Product";
import { Button } from "@/components/ui/button";
import { fetchBooksBySearchQuery } from "@/lib/services/books";

import { ISearchUrlParms } from "@/types/data";
import { Filter } from "lucide-react";
import React from "react";

interface Props {
  searchParams: ISearchUrlParms;
}

const SearchPage = async ({ searchParams }: Props) => {
  const books = await fetchBooksBySearchQuery(searchParams);

  return (
    <main className="pb-32">
      <Header />
      <section className="mx-4 mt-24">
        <p className="text-center">&quot;{searchParams.search}&quot;</p>
        <div className="flex w-full justify-between items-center mb-8">
          <h1 className="font-bold text-lg">
            Résultat<span className="font-normal">{` (${books.length})`}</span>
          </h1>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter width={16} height={16} /> Filtres
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-auto gap-8">
          {books.map((book) => (
            <Product className="basis-1/2" key={book.book_id} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default SearchPage;

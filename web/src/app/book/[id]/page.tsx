import AddToBasket from "@/components/AddToBasket/AddToBasket";
import AddToBasketButton from "@/components/AddToBasketButton";
import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import ProductListLabel from "@/components/ProductsUI/ProductListLabel";

import { fetchDataFromGetUrl } from "@/lib/services/commonServices";

import { Book, allStates } from "@/types/data";
import { Heart } from "lucide-react";
import React from "react";

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: { id: string } }) => {
  const book = await fetchDataFromGetUrl<Book>(`book/${params.id}`);

  return (
    <main className="mx-4">
      <Header />
      <div className="sm:max-w-[700px] sm:mx-auto">
        <section className="mb-12 mt-8 flex flex-col gap-4 sm:flex-row">
          <div className="grid place-items-center p-8 rounded-lg bg-brown-50 ">
            <img
              src={book.coverSrc}
              alt="book cover"
              className="rounded sm:max-w-[200px]"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between w-full mb-4 items-center">
              <p className="text-slate-400 font-bold text-sm">{book.genre}</p>
            </div>
            <h1 className="font-bold text-xl mb-2">{book.title}</h1>
            <p className="text-xs text-slate-500 truncate">
              By {book.authors.map((author) => author.last_name + " ")}
            </p>
            <AddToBasket book={book} />
          </div>
        </section>
        <section className="mb-20">
          <h2 className="font-bold text-xl mb-4">Synopsis</h2>
          <p>{book.resume}</p>
        </section>
        {/* <ProductListLabel
          className="p-0 m-0"
          books={sameAuthorsBooks}
          title="From the same author"
        /> */}
      </div>
    </main>
  );
};

export default page;

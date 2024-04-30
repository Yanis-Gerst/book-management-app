import AddToBasketButton from "@/components/AddToBasketButton";
import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import ProductListLabel from "@/components/ProductsUI/ProductListLabel";
import {
  fetchBookById,
  fetchBooksByAuthor,
  fetchItemById,
} from "@/lib/service";
import { Book } from "@/types/data";
import { Heart } from "lucide-react";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const book = await fetchItemById<Book>("book", params.id);
  // TODO: Fix this useless fetch
  const sameAuthorsBooks = await fetchBooksByAuthor(book.author.last_name);
  console.log(book);
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
              <div className="flex gap-6">
                <IconButton>
                  <Heart />
                </IconButton>
                <IconButton>
                  <Heart />
                </IconButton>
              </div>
            </div>
            <h1 className="font-bold text-xl mb-2">{book.title}</h1>
            <p className="text-sm mb-4">
              by {book.author.first_name} {book.author.last_name}
            </p>
            <div className="mt-auto">
              <AddToBasketButton book={book} />
            </div>
          </div>
        </section>
        <section className="mb-20">
          <h2 className="font-bold text-xl mb-4">Synopsis</h2>
          <p>{book.resume}</p>
        </section>
        <ProductListLabel
          className="p-0 m-0"
          books={sameAuthorsBooks}
          title="From the same author"
        />
      </div>
    </main>
  );
};

export default page;

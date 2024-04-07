import { Book } from "@/types/api";
import React from "react";

interface Props {
  promoBooks: Book[];
}
const PromoBanner: React.FC<Props> = ({ promoBooks }) => {
  return (
    <div className="bg-brown-50 px-4 py-8 mt-4 mb-12 flex gap-4 flex-col lg:flex-row">
      <div className="lg:min-w-[300px] xl:min-w-[500px]">
        <h1 className="font-bold text-2xl mb-2">Collection Manga 2023</h1>
        <p className="font-bold text-brown-700">
          -15% sur tous les tomes sur une séléction de manga
        </p>
      </div>
      <div className="flex gap-4 lg:justify-between flex-wrap">
        {promoBooks.map((promoBook) => (
          <img
            key={promoBook.book_id}
            src={promoBook.coverSrc}
            alt="Book cover"
            className="w-2/5 sm:w-1/5"
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;

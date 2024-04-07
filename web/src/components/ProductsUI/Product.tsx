import { Heart } from "lucide-react";
import React from "react";
import IconButton from "../IconButton";
import { Book } from "@/types/api";

interface Props {
  book: Book;
}

const Product: React.FC<Props> = ({ book }) => {
  return (
    <div className="">
      <div className="w-full">
        <img src={book.coverSrc} alt="book cover" className="mb-2 w-full" />
      </div>
      <div className="w-full">
        <div className="flex w-full justify-between items-center mb-2">
          <p className="font-bold text-xs text-slate-500">{book.genre}</p>
          <IconButton>
            <Heart className="w-[14px] h-[14px]" />
          </IconButton>
        </div>
        <h2 className="text-sm font-bold mb-1">{book.title}</h2>
        <p className="text-xs text-slate-500">By The Author</p>
      </div>
    </div>
  );
};

export default Product;

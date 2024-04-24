import { Heart } from "lucide-react";
import React from "react";
import IconButton from "../IconButton";
import { Book } from "@/types/data";
import Link from "next/link";

interface Props {
  book: Book;
  className?: string;
}

const Product: React.FC<Props> = ({ book, className }) => {
  return (
    <Link href={`/book/${book.book_id}`} className={className}>
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
        <p className="text-xs text-slate-500">
          By {book.author.first_name} {book.author.last_name}
        </p>
      </div>
    </Link>
  );
};

export default Product;

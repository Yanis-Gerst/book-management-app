import { Book } from "@/types/data";
import React from "react";

interface Props {
  books: Book[];
}
const Articles: React.FC<Props> = ({ books }) => {
  return (
    <ul className="list-disc pl-4 mb-8">
      {books.map((book) => (
        <li key={book.book_id}>
          {book.title} ({book.state})
        </li>
      ))}
    </ul>
  );
};

export default Articles;

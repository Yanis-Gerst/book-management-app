import React from "react";
import ProductList from "./ProductList";
import { Book } from "@/types/data";

interface Props {
  title: string;
  books: Book[];
  className?: string;
  listClassName?: string;
}
const ProductListLabel: React.FC<Props> = ({
  title,
  books,
  className,
  listClassName,
}) => {
  return (
    <section className={className}>
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <ProductList className={listClassName} books={books} />
    </section>
  );
};

export default ProductListLabel;

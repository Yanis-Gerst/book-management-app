import React from "react";
import ProductList from "./ProductList";
import { Book } from "@/types/api";

interface Props {
  title: string;
  books: Book[];
}
const ProductListLabel: React.FC<Props> = ({ title, books }) => {
  return (
    <section>
      <h1 className="text-xl font-bold ml-4 mb-4">{title}</h1>
      <ProductList books={books} />
    </section>
  );
};

export default ProductListLabel;

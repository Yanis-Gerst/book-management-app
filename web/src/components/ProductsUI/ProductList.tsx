import React from "react";
import Product from "./Product";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Book } from "@/types/api";

interface Props {
  books: Book[];
}

const ProductList: React.FC<Props> = ({ books: products }) => {
  return (
    <Carousel className="ml-4">
      <CarouselContent>
        {products.map((book) => (
          <CarouselItem
            className="basis-2/5 md:basis-1/3 lg:basis-1/5 "
            key={book.book_id}
          >
            <Product book={book} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductList;

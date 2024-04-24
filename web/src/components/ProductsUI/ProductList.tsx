import React from "react";
import Product from "./Product";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Book } from "@/types/data";
import { cn } from "@/lib/utils";

interface Props {
  books: Book[];
  className?: string;
}

const ProductList: React.FC<Props> = ({ books: products, className }) => {
  return (
    <Carousel className={className}>
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

"use client";
import { IBasketBook, updateLocalStorage, useBasketStore } from "@/lib/basket";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import BasketItem from "./BasketItem";
import Recap from "./Recap";

const Basket = () => {
  const { basket, updateBasket } = useBasketStore((state) => state);

  useEffect(() => {
    const basketStorage = localStorage.getItem("basket") || "[]";
    updateBasket(JSON.parse(basketStorage));
  }, [updateBasket]);

  return (
    <div className="mt-4 lg:flex-row lg:flex-nowrap lg:flex lg:justify-between">
      {basket.length == 0 ? (
        <>
          {" "}
          <h1 className="font-bold text-2xl mb-2 uppercase">
            Votre panier est vide
          </h1>
          <p className="mb-4">
            Lorsque votre rajouter un article dans votre panier, il apparaîtra
            ici.
          </p>
          <Link href={"/"}>
            {" "}
            <Button className="gap-2">
              C&apos;est parti <ArrowRight width={16} height={16} />{" "}
            </Button>
          </Link>{" "}
        </>
      ) : (
        <>
          {" "}
          <div className="flex flex-col gap-12 mb-20 basis-2/3">
            {basket.map((book) => (
              <BasketItem
                updateBasket={updateBasket}
                key={book.book_id}
                book={book}
              />
            ))}
          </div>
          <Recap basket={basket} />
        </>
      )}
    </div>
  );
};

export default Basket;

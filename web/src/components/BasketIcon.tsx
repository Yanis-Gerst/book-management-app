"use client";
import {
  IAddToBasketEvent,
  getBasketFromLocalStorage,
  useBasketStore,
} from "@/lib/basket";
import Link from "next/link";
import React, { useEffect } from "react";
import IconButton from "./IconButton";
import { ShoppingCart } from "lucide-react";

const BasketIcon = () => {
  const { basket, updateBasket } = useBasketStore((state) => state);

  useEffect(() => {
    const onNewItemInBasket = (e: CustomEvent<IAddToBasketEvent>) => {
      console.log("You add something in the basket", e);
    };
    updateBasket(getBasketFromLocalStorage());
    window.addEventListener("addToBasket", onNewItemInBasket as EventListener);

    return () =>
      window.removeEventListener(
        "addToBasket",
        onNewItemInBasket as EventListener
      );
  }, []);
  return (
    <Link href="/basket" className="md:ml-auto">
      <IconButton className="relative">
        <ShoppingCart />
        {basket.length > 0 && (
          <div className="absolute grid place-items-center right-0 bottom-0 bg-brown-400 h-5 w-5 text-xs text-brown-50 translate-x-[45%] translate-y-[45%] rounded-full">
            {basket.length}
          </div>
        )}
      </IconButton>
    </Link>
  );
};

export default BasketIcon;

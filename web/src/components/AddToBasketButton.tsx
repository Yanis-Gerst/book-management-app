"use client";
import { Book } from "@/types/data";
import React from "react";
import { Button } from "./ui/button";
import { useBasketStore } from "@/lib/basket";
import { Dialog, DialogTrigger } from "./ui/dialog";
import CardBasketNotification from "./CardBasketNotification";

interface Props {
  book: Book;
}

const AddToBasketButton: React.FC<Props> = ({ book }) => {
  const updateBasket = useBasketStore((state) => state.updateBasket);

  const addToBasket = (book: Book) => {
    const basketItem = {
      ...book,
      quantity: 1,
    };
    const addToBasketEvent = new CustomEvent("addToBasket", {
      detail: book,
    });
    dispatchEvent(addToBasketEvent);
    const basketLocalStorage = localStorage.getItem("basket");
    if (!basketLocalStorage) {
      updateBasket([basketItem]);
      return;
    }
    const currentBasket = JSON.parse(basketLocalStorage);
    const bookInBasket = currentBasket.find(
      (item: any) => item.book_id == book.book_id
    );
    if (bookInBasket) {
      bookInBasket.quantity += 1;
      updateBasket([...currentBasket]);
      return;
    }
    updateBasket([...currentBasket, basketItem]);
  };
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <Button onClick={() => addToBasket(book)}>
          Ajouter à votre Panier
        </Button>
      </DialogTrigger>
      <CardBasketNotification book={book} />
    </Dialog>
  );
};

export default AddToBasketButton;

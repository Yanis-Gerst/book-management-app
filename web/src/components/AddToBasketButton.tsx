"use client";
import { Book, IState } from "@/types/data";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { IBasketBook, useBasketStore } from "@/lib/basket";
import { Dialog, DialogTrigger } from "./ui/dialog";
import CardBasketNotification from "./CardBasketNotification";
import { availableParallelism } from "os";

interface Props {
  book: Book;
  setError: (message: string) => void;
  state?: IState;
}

const AddToBasketButton: React.FC<Props> = ({ book, state, setError }) => {
  const updateBasket = useBasketStore((state) => state.updateBasket);
  const [basketItem, setBasketItem] = useState<IBasketBook>();
  const [openDialog, setOpenDialog] = useState(false);

  const addToBasket = (book: Book) => {
    if (!state) return;
    if (book.stocks_per_state[state].available < 1) return;
    const newBasketItem = (({ articles, ...object }) => ({
      ...object,
      state,
      quantity: 1,
    }))(book);
    setBasketItem(newBasketItem);

    const addToBasketEvent = new CustomEvent("addToBasket", {
      detail: book,
    });
    dispatchEvent(addToBasketEvent);
    const basketLocalStorage = localStorage.getItem("basket");
    if (!basketLocalStorage) {
      updateBasket([newBasketItem]);
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
    updateBasket([...currentBasket, newBasketItem]);
  };
  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        if (!state) {
          setError("Veillez séléctionner l'état que vous souhaitez");
          return;
        }
        setOpenDialog(open);
      }}
    >
      <DialogTrigger>
        {" "}
        <Button onClick={() => addToBasket(book)}>
          Ajouter à votre Panier
        </Button>
      </DialogTrigger>
      {basketItem && <CardBasketNotification book={basketItem} />}
    </Dialog>
  );
};

export default AddToBasketButton;

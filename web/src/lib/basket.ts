import { Book } from "@/types/data";
import { create } from "zustand";

export type IBasketBook = Book & { quantity: number };

export type IAddToBasketEvent = {
  detail: Book;
};

export const getBasketFromLocalStorage = (): IBasketBook[] => {
  const basketStorage = localStorage.getItem("basket");
  if (!basketStorage) return [];

  const basketData = JSON.parse(basketStorage);
  return basketData;
};

export const updateLocalStorage = (updateBasket: IBasketBook[]) => {
  localStorage.setItem("basket", JSON.stringify(updateBasket));
};

export const removeBasketBook = (bookId: number): IBasketBook[] => {
  const basketData = getBasketFromLocalStorage();
  return basketData.filter((item: IBasketBook) => item.book_id !== bookId);
};

interface IBasketState {
  basket: IBasketBook[];
  updateBasket: (updatedBasked: IBasketBook[]) => void;
}

export const useBasketStore = create<IBasketState>()((set) => ({
  basket: [],
  updateBasket: (updateBasket: IBasketBook[]) => {
    updateLocalStorage(updateBasket);
    set({ basket: updateBasket });
  },
}));

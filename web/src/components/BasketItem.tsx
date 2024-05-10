import { Book, IState } from "@/types/data";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Trash } from "lucide-react";
import IconButton from "./IconButton";
import {
  IBasketBook,
  getBasketFromLocalStorage,
  removeBasketBook,
} from "@/lib/basket";
import AuthorsNames from "./AuthorsNames";
import SelectContentAvaibleState from "./SelectContentAvaibleState";

interface Props {
  book: IBasketBook;
  updateBasket: (updateBasket: IBasketBook[]) => void;
}

const BasketItem: React.FC<Props> = ({ book, updateBasket }) => {
  const [quantity, setQuantity] = useState(book.quantity);
  const [bookState, setBookState] = useState(book.state);

  const updateField = <T extends keyof IBasketBook>(
    book: IBasketBook,
    key: T,
    value: IBasketBook[T]
  ) => {
    if (key === "quantity") setQuantity(value as number);
    if (key === "state") {
      if (quantity > book.stocks_per_state[value as IState].available)
        updateField(
          book,
          "quantity",
          book.stocks_per_state[value as IState].available
        );
      setBookState(value as IState);
    }
    book[key] = value;
    const basketStorage = getBasketFromLocalStorage();
    const updateBasketStorage = basketStorage.map((item: IBasketBook) =>
      item.book_id == book.book_id ? book : item
    );
    updateBasket(updateBasketStorage);
  };

  return (
    <div className="text-sm sm:text-base flex gap-4  ">
      <div className="max-w-[150px]">
        <img src={book.coverSrc} alt="book cover" />
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-slate-500 mb-1">{book.genre}</p>
        <h2 className="text-base font-bold mb-2 sm:text-lg">{book.title}</h2>
        <AuthorsNames authors={book.authors} />
        <Select
          value={quantity.toString()}
          onValueChange={(value) =>
            updateField(book, "quantity", parseInt(value))
          }
        >
          <SelectTrigger className="w-[100px] focus:ring-opacity-0 border-0  p-0">
            Quantité: <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from(
              Array(
                Math.min(book.stocks_per_state[bookState].available, 5)
              ).keys()
            ).map((number) => (
              <SelectItem key={number + 1} value={(number + 1).toString()}>
                {number + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={bookState}
          onValueChange={(value: IState) => updateField(book, "state", value)}
        >
          <SelectTrigger className="flex gap-1  focus:ring-opacity-0 outline-none w-min border-0 p-0">
            État: <p>{bookState}</p>
          </SelectTrigger>
          <SelectContentAvaibleState book={book} />
        </Select>
        <IconButton
          className="mt-auto w-min"
          onClick={() => {
            const updateBasketItems = removeBasketBook(book.book_id);
            updateBasket(updateBasketItems);
          }}
        >
          <Trash width={16} height={16} />
        </IconButton>
      </div>
    </div>
  );
};

export default BasketItem;

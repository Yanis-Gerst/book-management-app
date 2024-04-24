import { Book } from "@/types/data";
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
  updateLocalStorage,
} from "@/lib/basket";

interface Props {
  book: IBasketBook;
  updateBasket: (updateBasket: IBasketBook[]) => void;
}

const BasketItem: React.FC<Props> = ({ book, updateBasket }) => {
  const [quantity, setQuantity] = useState(book.quantity);

  const updateQuantity = (book: IBasketBook, quantity: number) => {
    setQuantity(quantity);
    book.quantity = quantity;
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
        <p className="text-slate-500">
          By {book.author.first_name} {book.author.last_name}
        </p>
        <Select
          value={quantity.toString()}
          onValueChange={(value) => updateQuantity(book, parseInt(value))}
        >
          <SelectTrigger className="w-[100px] border-0 p-0">
            Quantité: <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
          </SelectContent>
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

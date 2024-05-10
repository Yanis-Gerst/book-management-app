"use client";
import React, { useState } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Book, IState, allStates } from "@/types/data";
import AddToBasketButton from "../AddToBasketButton";
import SelectContentAvaibleState from "../SelectContentAvaibleState";

interface Props {
  book: Book;
}

const AddToBasket: React.FC<Props> = ({ book }) => {
  const [selectState, setSelectState] = useState<IState>();
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      {" "}
      <Select
        onValueChange={(value: IState) => {
          if (error) setError(null);
          setSelectState(value);
        }}
      >
        <SelectTrigger className={`mt-4 ${error ? "border-red-500" : ""}`}>
          <SelectValue placeholder="Sélectionner l'état souhaiter" />
        </SelectTrigger>
        <SelectContentAvaibleState book={book} />
      </Select>
      {error && (
        <p className="text-red-500 font-bold text-sm w-full mt-2">{error}</p>
      )}
      <div className="mt-auto">
        <AddToBasketButton
          book={book}
          state={selectState}
          setError={setError}
        />
      </div>
    </>
  );
};

export default AddToBasket;

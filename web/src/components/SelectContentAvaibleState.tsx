import React from "react";
import { SelectContent, SelectItem } from "./ui/select";
import { Book, allStates } from "@/types/data";

interface Props {
  book: Pick<Book, "stocks_per_state">;
}

const SelectContentAvaibleState: React.FC<Props> = ({ book }) => {
  const availableState = allStates.filter(
    (state) => book.stocks_per_state[state].available > 0
  );
  return (
    <SelectContent>
      {availableState.map((state) => (
        <SelectItem key={state} value={state}>
          {state} ({book.stocks_per_state[state].available})
        </SelectItem>
      ))}
    </SelectContent>
  );
};

export default SelectContentAvaibleState;

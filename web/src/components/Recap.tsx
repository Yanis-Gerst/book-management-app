import { IBasketBook } from "@/lib/basket";
import React from "react";
import Divider from "./Divider";
import ReservationButton from "./ReservationButton";

interface Props {
  basket: IBasketBook[];
}
const Recap: React.FC<Props> = ({ basket }) => {
  return (
    <div className="flex flex-col lg:basis-1/2 lg:ml-4">
      <h2 className="font-bold text-xl mb-4">Récapitulatif</h2>
      <div className="flex gap-4 flex-col">
        {basket.map((book) => (
          <div className="flex w-full justify-between" key={book.book_id}>
            <p>
              {book.quantity}x {book.title} ({book.state}){" "}
            </p>
            <p className="ml-4">{book.price * book.quantity}$</p>
          </div>
        ))}
      </div>
      <Divider className="my-4" />
      <div className="flex w-full justify-between font-bold">
        <p>Total</p>
        <p>
          {`${basket
            .map((book) => book.price * book.quantity)
            .reduce((acc, current) => acc + current, 0)}`}
          $
        </p>
      </div>
      <Divider className="my-4" />
      <ReservationButton basket={basket} />
    </div>
  );
};

export default Recap;

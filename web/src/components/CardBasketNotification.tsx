import { Book } from "@/types/data";
import { DialogHeader, DialogOverlay } from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import React from "react";
import { Card } from "./ui/card";
import { BookCheck } from "lucide-react";
import { Button } from "./ui/button";
import AuthorsNames from "./AuthorsNames";
import { IBasketBook } from "@/lib/basket";

interface Props {
  book: IBasketBook;
}

const CardBasketNotification: React.FC<Props> = ({ book }) => {
  return (
    <DialogOverlay className="grid justify-end px-8 top-[80px]">
      {" "}
      <DialogContent className="">
        <Card className="max-w-[500px] p-4 rounded-none rounded-b">
          <DialogHeader className="mb-4">
            <p className="flex gap-2 items-center">
              {" "}
              <BookCheck
                width={16}
                height={16}
                className="stroke-green-500"
              />{" "}
              Vous avez ajouté à votre panier :{" "}
            </p>
          </DialogHeader>
          <div className="flex gap-4 mb-8">
            <div>
              {" "}
              <img src={book.coverSrc} alt="book" className="max-w-[100px]" />
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-bold">{book.title}</p>
              <p className="text-sm text-slate-500">{book.genre}</p>
              <AuthorsNames
                authors={book.authors}
                className="text-sm text-slate-500"
              />
              <p className="text-sm text-slate-500">Etat: {book.state}</p>

              <p className="mt-auto">{book.price}$</p>
            </div>
          </div>

          <Button variant={"secondary"} className="w-full">
            Afficher le panier
          </Button>
        </Card>
      </DialogContent>
    </DialogOverlay>
  );
};

export default CardBasketNotification;

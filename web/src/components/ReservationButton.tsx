"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { IBasketBook, useBasketStore } from "@/lib/basket";
import { sendBookReservation } from "@/lib/services/reservation";
import { getLoggedAccount } from "@/lib/services/account";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  clientName: z.string().includes(" ").min(3),
  phoneNumber: z.string().min(10).max(10).regex(new RegExp("^[0-9]*$")),
});

interface Props {
  basket: IBasketBook[];
}

const ReservationButton: React.FC<Props> = ({ basket }) => {
  const router = useRouter();
  const updateBasket = useBasketStore((state) => state.updateBasket);
  const onSubmit = async () => {
    const account_id = getLoggedAccount();
    if (!account_id) {
      router.push("/login");
      return;
    }
    const body = {
      account_id,
      basket_books: basket.map((basketItem) => ({
        book_id: basketItem.book_id,
        quantity: basketItem.quantity,
        state: basketItem.state,
      })),
    };

    const res = await sendBookReservation(body);
    if (!res["success"]) return;
    updateBasket([]);
  };

  return (
    <Button className="w-full bg-brown-500" onClick={onSubmit} size={"lg"}>
      Réserver vos livres
    </Button>
  );
};

export default ReservationButton;

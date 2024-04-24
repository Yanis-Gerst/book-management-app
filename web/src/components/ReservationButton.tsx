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
import { sendBookReservation } from "@/lib/service";
import { IBasketBook } from "@/lib/basket";

const formSchema = z.object({
  clientName: z.string().includes(" ").min(3),
  phoneNumber: z.string().min(10).max(10).regex(new RegExp("^[0-9]*$")),
});

interface Props {
  basket: IBasketBook[];
}

const ReservationButton: React.FC<Props> = ({ basket }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    const body = {
      client_name: e.clientName,
      client_phone_number: e.phoneNumber,
      books_id: basket.map((basketItem) => basketItem.book_id),
    };

    sendBookReservation(body);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full bg-brown-500" size={"lg"}>
          Réserver vos livres
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Réserver vos livres</DialogTitle>
          <DialogDescription>
            On vous envoie un message lors que votre commande est prête.
            N&aépos; oubliez pas de ramener votre carte d&apos;identité
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="John doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="06 15 15 15 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-brown-500">
              Réserver
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationButton;

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import MultipleSectionForm, { IColumnFormConfig } from "../MultipleSectionForm";
import { Book } from "@/types/data";

const formSchema = z.object({
  title: z.string().min(2),
  categorie: z.string(),
  price: z.string().regex(new RegExp("^[0-9]*$")),
});

const ColumnsFormConfig: IColumnFormConfig[] = [
  {
    title: "Informations Produits",
    fieldsNames: ["title", "categorie"],
  },
  {
    title: "Gestion des prix",
    fieldsNames: ["price"],
  },
];

type IFormSchema = z.infer<typeof formSchema>;

interface Props {
  book: Book;
}
const ModifyBookForm: React.FC<Props> = ({ book }) => {
  const onSubmit = (values: IFormSchema) => {
    console.log(values);
  };

  const defaultValues = {
    title: book.title,
    categorie: book.genre,
    price: book.price,
  };
  return (
    <MultipleSectionForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      columnFormConfigs={ColumnsFormConfig}
      defaultValues={defaultValues}
      className="lg:grid-cols-2 flex gap-12 flex-col"
    >
      <Button type="submit" className=" lg:col-span-2">
        Enregister les modifications
      </Button>
    </MultipleSectionForm>
  );
};

export default ModifyBookForm;

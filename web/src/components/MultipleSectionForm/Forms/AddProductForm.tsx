"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import MultipleSectionForm, { IColumnFormConfig } from "../MultipleSectionForm";

const formSchema = z.object({
  title: z.string().min(2),
  categorie: z.string(),
  stock: z.string().regex(new RegExp("^[0-9]*$")),
  price: z.string().regex(new RegExp("^[0-9]*$")),
});

const ColumnsFormConfig: IColumnFormConfig[] = [
  {
    title: "Informations Produits",
    fieldsNames: ["title", "categorie", "stock"],
  },
  {
    title: "Gestion des prix",
    fieldsNames: ["price"],
  },
];

type IFormSchema = z.infer<typeof formSchema>;

const AddProductForm = () => {
  const onSubmit = (values: IFormSchema) => {
    console.log(values);
  };

  return (
    <MultipleSectionForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      columnFormConfigs={ColumnsFormConfig}
    >
      <Button type="submit">Ajouter un nouveau Produit</Button>
    </MultipleSectionForm>
  );
};

export default AddProductForm;

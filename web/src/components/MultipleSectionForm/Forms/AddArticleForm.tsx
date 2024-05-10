"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
    fieldsNames: ["etat", "stock", "place", "ID Book"],
  },
];

const AddArticleForm = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <MultipleSectionForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      columnFormConfigs={ColumnsFormConfig}
      className="lg:flex flex-col gap-2 px-2"
    >
      <Button type="submit">Ajouter un nouveau Produit</Button>
    </MultipleSectionForm>
  );
};

export default AddArticleForm;

"use client";
import React from "react";
import { z } from "zod";
import MultipleSectionForm, { IColumnFormConfig } from "../MultipleSectionForm";
import { Button } from "@/components/ui/button";

const formKeys = ["name", "phone_number", "DateOfStart", "DateOfEnd"] as const;
const formSchema = z.object({
  name: z.string().min(2),
  phone_number: z.string(),
  DateOfStart: z.string(),
  DateOfEnd: z.string(),
});

const ColumnsFormConfig: IColumnFormConfig[] = [
  {
    title: "Information Clients",
    fieldsNames: ["name", "phone_number"],
  },
  {
    title: "Récapitulatif des locations",
    fieldsNames: ["DateOfStart", "DateOfEnd"],
  },
];

type IFormSchema = z.infer<typeof formSchema>;

const AddLocationForm = () => {
  const onSubmit = (values: IFormSchema) => {
    console.log(values);
  };

  return (
    <MultipleSectionForm
      columnFormConfigs={ColumnsFormConfig}
      formSchema={formSchema}
      onSubmit={onSubmit}
    >
      <Button type="submit" className=" col-span-2">
        Ajouter un nouveau emprunt
      </Button>
    </MultipleSectionForm>
  );
};

export default AddLocationForm;

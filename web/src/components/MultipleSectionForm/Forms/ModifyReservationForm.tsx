"use client";
import React from "react";
import { z } from "zod";
import { Button } from "../../ui/button";
import MultipleSectionForm, { IColumnFormConfig } from "../MultipleSectionForm";
import { IReservation } from "@/types/data";

const formSchema = z.object({
  title: z.string().min(2),
  categorie: z.string(),
  stock: z.string().regex(new RegExp("^[0-9]*$")),
  price: z.string().regex(new RegExp("^[0-9]*$")),
});

const ColumnsFormConfig: IColumnFormConfig[] = [
  {
    title: "Informations Clients",
    fieldsNames: ["name", "phone_number"],
  },
];

type IFormSchema = z.infer<typeof formSchema>;

interface Props {
  reservation: IReservation;
}
const ModifyReservationForm: React.FC<Props> = ({ reservation }) => {
  const onSubmit = (values: IFormSchema) => {
    console.log(values);
  };

  const defaultValues = {
    name: reservation.client_name,
    phone_number: reservation.mobileNumber,
  };
  return (
    <MultipleSectionForm
      className="grid-cols-1"
      formSchema={formSchema}
      onSubmit={onSubmit}
      columnFormConfigs={ColumnsFormConfig}
      defaultValues={defaultValues}
    >
      <Button variant="outline" type="submit">
        Enregistrer les modifications
      </Button>
    </MultipleSectionForm>
  );
};

export default ModifyReservationForm;

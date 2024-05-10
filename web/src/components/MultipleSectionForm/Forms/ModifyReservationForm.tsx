"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "../../ui/button";
import MultipleSectionForm, { IColumnFormConfig } from "../MultipleSectionForm";
import { IAccount, IReservation } from "@/types/data";
import { fetchDataFromGetUrl } from "@/lib/services/commonServices";

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
  const [account, setAccount] = useState<IAccount | null>();

  useEffect(() => {
    const fetchAccount = async () => {
      const currentAccount = await fetchDataFromGetUrl<IAccount>(
        `account/${reservation.account_id}`
      );
      setAccount(currentAccount);
    };
    fetchAccount();
  }, []);

  const onSubmit = (values: IFormSchema) => {
    console.log(values);
  };

  const defaultValues = {
    name: account?.first_name,
    phone_number: account?.phone_number,
  };
  return (
    <>
      {account && (
        <MultipleSectionForm
          className="flex flex-col gap-4  lg:flex "
          formSchema={formSchema}
          onSubmit={onSubmit}
          columnFormConfigs={ColumnsFormConfig}
          defaultValues={defaultValues}
        >
          <Button variant="outline" type="submit">
            Enregistrer les modifications
          </Button>
        </MultipleSectionForm>
      )}
    </>
  );
};

export default ModifyReservationForm;

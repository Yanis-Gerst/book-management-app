"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import VerticalFormFields from "@/components/VerticalFormFields";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IAccount } from "@/types/data";

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(10),
  mail: z.string().min(2),
});

interface Props {
  account: IAccount;
}

const AccountForm: React.FC<Props> = ({ account }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: account.first_name,
      lastName: account.last_name,
      phoneNumber: account.phone_number,
      mail: account.mail,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <VerticalFormFields
          form={form}
          fieldsConfigs={[
            { label: "Prénom", key: "firstName" },
            { label: "Nom", key: "lastName" },
            {
              label: "N°téléphone",
              key: "phoneNumber",
              inputType: "tel",
            },
            { label: "Mail", key: "mail" },
          ]}
          className="gap-6 grid-cols-2 [&>*:not(:first-child):not(:nth-child(2))]:col-span-2"
        />
      </form>
      <Button type="submit" className="mt-8 ">
        Enregister les modifications
      </Button>
    </Form>
  );
};

export default AccountForm;

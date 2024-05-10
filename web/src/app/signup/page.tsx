"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import VerticalFormFields from "@/components/VerticalFormFields";
import { signupAccount } from "@/lib/services/account";

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(10),
  mail: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (values.password !== values.confirmPassword) {
      return;
    }
    const res = await signupAccount(values);
  };
  return (
    <main className="max-w-[600px] mx-auto mt-48 px-8">
      <h1 className="font-bold text-3xl mb-16">Création d&apos;un compte</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <VerticalFormFields
            form={form}
            fieldsConfigs={[
              { label: "Prénom", key: "firstName" },
              { label: "Nom", key: "lastName" },
              { label: "N°téléphone", key: "phoneNumber", inputType: "tel" },
              { label: "Mail", key: "mail" },
              { label: "Mot de passe", key: "password", inputType: "password" },
              {
                label: "Confirmer votre mot de passe",
                key: "confirmPassword",
                inputType: "password",
              },
            ]}
            className="gap-6 grid-cols-2 [&>*:not(:first-child):not(:nth-child(2))]:col-span-2"
          />
          <div className="flex flex-col gap-2 items-center">
            {" "}
            <Button type="submit" className="w-full">
              Connexion
            </Button>
            <Link href="/login">
              {" "}
              <Button variant={"ghost"} className="underline">
                Vous avez déjà compte ?
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default Page;

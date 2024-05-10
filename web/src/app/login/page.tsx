"use client";
import VerticalFormFields from "@/components/VerticalFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { logAccount } from "@/lib/services/account";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  mail: z.string().min(2),
  password: z.string().min(4),
});
const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await logAccount(values);
    if (!response.error) {
      Cookies.set("account_id", response.account_id);
    }
    router.push("/");
  };
  return (
    <main className="max-w-[600px] mx-auto mt-48 px-8">
      <h1 className="font-bold text-3xl mb-16">Connexion à un compte</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <VerticalFormFields
            form={form}
            fieldsConfigs={[
              { label: "Mail", key: "mail" },
              { label: "Mot de passe", key: "password", inputType: "password" },
            ]}
            className="gap-4"
          />
          <div className="flex flex-col gap-2 items-center">
            {" "}
            <Button type="submit" className="w-full">
              Connexion
            </Button>
            <Link href="/signup">
              {" "}
              <Button variant={"ghost"} className="underline">
                Créer un compte ?
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default Page;

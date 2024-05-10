"use client";
import React from "react";
import { Form } from "../ui/form";
import ColumnForm from "./ColumnForm";
import { Button } from "../ui/button";
import { ZodRawShape, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

interface Props<T extends ZodRawShape> {
  children?: React.ReactNode;
  formSchema: z.ZodObject<T>;
  columnFormConfigs: IColumnFormConfig[];
  onSubmit: (value: z.infer<z.ZodObject<T>>) => void;
  className?: string;
  defaultValues?: any;
}

export type IColumnFormConfig = {
  title: string;
  fieldsNames: string[];
};

const MultipleSectionForm = <T extends ZodRawShape>({
  formSchema,
  onSubmit,
  columnFormConfigs,
  className,
  children,
  defaultValues = {},
}: Props<T>) => {
  const form = useForm<z.infer<z.ZodObject<T>>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "lg:grid grid-cols-2 grid-rows-3 gap-y-8 my-4  lg:gap-x-32 lg:gap-y-16 lg:grid-cols-2 flex gap-12 flex-col ",
          className
        )}
      >
        {columnFormConfigs.map((columnFormConfig) => (
          <ColumnForm
            form={form}
            key={columnFormConfig.title}
            fieldsName={columnFormConfig.fieldsNames}
            title={columnFormConfig.title}
          />
        ))}
        {children}
      </form>
    </Form>
  );
};

export default MultipleSectionForm;

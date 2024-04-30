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
          "grid grid-cols-2 grid-rows-2 gap-x-32 gap-y-16",
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

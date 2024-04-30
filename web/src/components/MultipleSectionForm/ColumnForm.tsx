import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  fieldsName: string[];
  form: any;
  title: string;
}
const ColumnForm: React.FC<Props> = ({ fieldsName, form, title }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="mb-2 font-bold text-2xl">{title}</h2>
      {fieldsName.map((fieldName) => (
        <FormField
          control={form.control}
          name={fieldName}
          key={fieldName}
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2 items-center">
                <FormLabel className="capitalize font-bold">
                  {fieldName}:
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default ColumnForm;

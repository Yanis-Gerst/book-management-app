import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

type IFieldsConfig = {
  label: string;
  key: string;
  inputType?: React.HTMLInputTypeAttribute;
};

interface Props {
  fieldsConfigs: IFieldsConfig[];
  form: any;
  className?: string;
}

const VerticalFormFields: React.FC<Props> = ({
  fieldsConfigs,
  form,
  className,
}) => {
  return (
    <div className={cn("grid", className)}>
      {fieldsConfigs.map((fieldConfig) => (
        <FormField
          control={form.control}
          name={fieldConfig.key}
          key={fieldConfig.key}
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2">
                <FormLabel className="">{fieldConfig.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={
                      fieldConfig.inputType ? fieldConfig.inputType : "text"
                    }
                  />
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

export default VerticalFormFields;

import React from "react";
import { ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props extends ButtonProps {
  children: React.ReactNode;
}
const IconButton: React.FC<Props> = ({ children, className, ...args }) => {
  return (
    <button {...args} className={cn("p-2 bg-gray-100 rounded-full", className)}>
      {children}
    </button>
  );
};

export default IconButton;

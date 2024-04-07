import React from "react";
import { ButtonProps } from "./ui/button";

interface Props extends ButtonProps {
  children: React.ReactNode;
}
const IconButton: React.FC<Props> = ({ children, ...args }) => {
  return (
    <button {...args} className="p-2 bg-gray-100 rounded-full">
      {children}
    </button>
  );
};

export default IconButton;

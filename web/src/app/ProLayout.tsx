import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const ProLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <main
      className={cn("min-h-screen bg-gray-100 pt-16 pb-32 px-16", className)}
    >
      {children}
    </main>
  );
};

export default ProLayout;

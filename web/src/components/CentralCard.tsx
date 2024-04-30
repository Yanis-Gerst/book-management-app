import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CentralCard: React.FC<Props> = ({ children, className }) => {
  return (
    <Card
      className={cn(
        "mt-16 px-24 pt-8 pb-8 gap-32 grid place-items-center w-fit mx-auto ",
        className
      )}
    >
      {children}
    </Card>
  );
};

export default CentralCard;

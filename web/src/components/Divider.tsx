import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className: string;
}
const Divider: React.FC<Props> = ({ className }) => {
  return <span className={cn("w-full h-[1px] bg-slate-200", className)} />;
};

export default Divider;

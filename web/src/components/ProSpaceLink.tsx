import React from "react";
import { Card } from "./ui/card";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  href: string;
}
const ProSpaceLink: React.FC<Props> = ({ children, href }) => {
  return (
    <Link href={href}>
      <Card className="flex flex-col items-center gap-4 px-12 py-6 font-bold text-3xl">
        {children}
      </Card>
    </Link>
  );
};

export default ProSpaceLink;

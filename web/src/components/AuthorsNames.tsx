import { cn } from "@/lib/utils";
import { IAuthor } from "@/types/data";
import React from "react";

interface Props {
  authors: IAuthor[];
  className?: string;
}

const AuthorsNames: React.FC<Props> = ({ authors, className }) => {
  return (
    <p className={cn("truncate", className)}>
      By {authors.map((author) => `${author.last_name} ${author.first_name}, `)}
    </p>
  );
};

export default AuthorsNames;

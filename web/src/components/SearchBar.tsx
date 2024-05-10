"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const formSchema = z.object({
  search: z.string(),
  categorie: z.enum([
    "fantasy",
    "science-fiction",
    "dystopie",
    "réaliste",
    "romance",
    "all",
  ]),
});

const SearchBar: React.FC<Props> = ({ className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      categorie: "all",
    },
  });
  const router = useRouter();
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/books?search=${data.search}&categorie=${data.categorie}`);
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="categorie"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="rounded-r-none h-full bg-brown-100 text-brown-500 border-0 w-[60px] sm:w-[100px]">
                    <SelectValue placeholder="All"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="romance">Romance</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="sm:w-full">
              <FormControl>
                <div className="flex py-3 px-4 border-y border-r border-slate-200 gap-2 items-center rounded-r-lg">
                  <Search width={16} height={16} />
                  <input
                    {...field}
                    className="outline-0 w-full text-xs sm:text-base"
                    placeholder="Search by title, author"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchBar;

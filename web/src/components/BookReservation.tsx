"use client";
import React from "react";
import { Button } from "./ui/button";
import { BookUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchDataFromGetUrl } from "@/lib/services/commonServices";

interface Props {
  id: string;
}
const BookReservation: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const bookReservation = async () => {
    const res = await fetchDataFromGetUrl<{ success: boolean }>(
      `reservation/book/${id}`,
      "POST"
    );
    console.log(res);
    if (!res.success) return;
    router.back();
    router.refresh;
  };
  return (
    <Button className="gap-2" onClick={bookReservation}>
      <BookUp /> Emprunter les articles
    </Button>
  );
};

export default BookReservation;

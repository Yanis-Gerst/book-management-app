"use client";
import { fetchDataFromGetUrl } from "@/lib/services/commonServices";
import { useRouter } from "next/navigation";
import React from "react";
import { Button, ButtonProps } from "./ui/button";

type Props = {
  apiEndpoint: string;
  children: React.ReactNode;
} & ButtonProps;

const DeleteItemButton: React.FC<Props> = ({
  apiEndpoint,
  id,
  children,
  ...props
}) => {
  const router = useRouter();
  const deleteItem = async () => {
    const res = await fetchDataFromGetUrl<{ success: boolean }>(
      `${apiEndpoint}`,
      "DELETE"
    );
    if (!res.success) return;
    router.back();
    router.refresh();
  };
  return (
    <Button {...props} onClick={deleteItem}>
      {children}
    </Button>
  );
};

export default DeleteItemButton;

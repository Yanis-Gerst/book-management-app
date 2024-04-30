import ProLayout from "@/app/ProLayout";
import CentralCard from "@/components/CentralCard";
import ModifyBookForm from "@/components/MultipleSectionForm/Forms/ModifyBookForm";
import ProHeader from "@/components/ProHeader";
import { fetchItemById } from "@/lib/service";
import { Book } from "@/types/data";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const book = await fetchItemById<Book>("book", params.id);

  return (
    <ProLayout>
      <ProHeader>Modification manuelle du livre {book.title}</ProHeader>
      <CentralCard>
        <ModifyBookForm book={book} />
      </CentralCard>
    </ProLayout>
  );
};

export default page;

import React from "react";
import AddLocationForm from "@/components/MultipleSectionForm/Forms/AddLocationFrom";
import AddProductForm from "@/components/MultipleSectionForm/Forms/AddProductForm";
import CentralCard from "@/components/CentralCard";
import ProHeader from "@/components/ProHeader";
import ProLayout from "@/app/ProLayout";
import AddArticleForm from "@/components/MultipleSectionForm/Forms/AddArticleForm";

const page = () => {
  return (
    <ProLayout>
      <ProHeader>Ajouter un nouvelle Article</ProHeader>
      <CentralCard>
        <AddArticleForm />
      </CentralCard>
    </ProLayout>
  );
};

export default page;

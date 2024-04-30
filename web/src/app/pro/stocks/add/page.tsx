import ProLayout from "@/app/ProLayout";
import AddLocationForm from "@/components/MultipleSectionForm/Forms/AddLocationFrom";
import AddProductForm from "@/components/MultipleSectionForm/Forms/AddProductForm";
import CentralCard from "@/components/CentralCard";
import ProHeader from "@/components/ProHeader";
import React from "react";

const page = () => {
  return (
    <ProLayout>
      <ProHeader>Ajouter un nouveau produit</ProHeader>
      <CentralCard>
        <AddProductForm />
      </CentralCard>
    </ProLayout>
  );
};

export default page;

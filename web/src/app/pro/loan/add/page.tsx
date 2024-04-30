import ProLayout from "@/app/ProLayout";
import AddLocationForm from "@/components/MultipleSectionForm/Forms/AddLocationFrom";
import AddProductForm from "@/components/MultipleSectionForm/Forms/AddProductForm";
import CentralCard from "@/components/CentralCard";
import ProHeader from "@/components/ProHeader";
import { Card } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <ProLayout>
      <ProHeader>Ajouter un nouveau emprunt</ProHeader>
      <CentralCard>
        <AddLocationForm />
      </CentralCard>
    </ProLayout>
  );
};

export default page;

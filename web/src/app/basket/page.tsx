import Basket from "@/components/Basket";
import Header from "@/components/Header";
import React from "react";
import ProductListLabel from "@/components/ProductsUI/ProductListLabel";
import { getTop5Of } from "@/lib/service";

const Page = async () => {
  const top5Romance = await getTop5Of("Romance");

  return (
    <main>
      <Header />
      <section className="flex flex-col mx-4 sm:mx-16 lg:gap-32 gap-16 md:mb-32">
        <Basket />
        <ProductListLabel title="You might Like" books={top5Romance} />
      </section>
    </main>
  );
};

export default Page;

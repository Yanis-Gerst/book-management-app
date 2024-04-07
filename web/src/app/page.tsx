import Header from "@/components/Header";
import ProductListLabel from "@/components/ProductsUI/ProductListLabel";
import PromoBanner from "@/components/PromoBanner";
import { Book } from "@/types/api";
import { apiUrl } from "@/utils/temps";
import Image from "next/image";

async function getPromoBooks(): Promise<Book[]> {
  const res = await fetch(`${apiUrl}/book/promo`);

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

async function getTop5Fantasy(): Promise<Book[]> {
  const res = await fetch(`${apiUrl}/book/top-5/Fantasy`);

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

export default async function Home() {
  const promoBooks = await getPromoBooks();
  const top5FantasyBooks = await getTop5Fantasy();

  return (
    <main className="">
      <Header />
      <PromoBanner promoBooks={promoBooks} />
      <ProductListLabel title="Top 5 Fantasy" books={top5FantasyBooks} />
    </main>
  );
}

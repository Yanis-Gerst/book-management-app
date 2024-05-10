import Header from "@/components/Header";
import ProductListLabel from "@/components/ProductsUI/ProductListLabel";
import PromoBanner from "@/components/PromoBanner";
import { getPromoBooks, getTop5Of } from "@/lib/services/books";

export default async function Home() {
  const promoBooks = await getPromoBooks();
  const top5FantasyBooks = await getTop5Of("Fantasy");

  return (
    <main className="">
      <Header />
      <PromoBanner promoBooks={promoBooks} />
      <ProductListLabel
        title="Top 5 Fantasy"
        books={top5FantasyBooks}
        className="ml-4"
      />
    </main>
  );
}

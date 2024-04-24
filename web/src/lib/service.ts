import { Book, ICategorie, ISearchUrlParms, ProBook } from "@/types/data";
import { apiUrl } from "./temps";

export async function getTop5Of(categorie: ICategorie): Promise<Book[]> {
  const res = await fetch(`${apiUrl}/book/top-5/${categorie}`);

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

export async function getPromoBooks(): Promise<Book[]> {
  const res = await fetch(`${apiUrl}/book/promo`);

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

export const fetchBookById = async (id: string): Promise<Book> => {
  const res = await fetch(`${apiUrl}/book/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const fetchBooksBySearchQuery = async (
  params: ISearchUrlParms
): Promise<Book[]> => {
  const res = await fetch(`${apiUrl}/book/search`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: params.search,
      categorie: params.categorie === "all" ? "" : params.categorie,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const fetchBooksByAuthor = async (authorLastName: string) => {
  const res = await fetch(`${apiUrl}/book/search`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: authorLastName,
      categorie: "",
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const sendBookReservation = async (body: any) => {
  const res = await fetch(`${apiUrl}/reservation`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};

export type IQuery = {
  limit?: number;
};
export const fetchAllsStocksBooks = async (
  query: IQuery
): Promise<ProBook[]> => {
  const res = await fetch(`${apiUrl}/book/pro`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify(query),
  });
  return await res.json();
};

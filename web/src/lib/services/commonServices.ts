import { IQuery } from "@/types/data";
import { apiUrl } from "../temps";

export const fetchDataFromGetUrl = async <T>(apiEndpoint: string) => {
  const res = await fetch(`${apiUrl}/${apiEndpoint}`, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<T>;
};

export const fetchDataWithQueryFrom = async <T>(
  apiEndpoint: string,
  query: IQuery
): Promise<T> => {
  const res = await fetch(`${apiUrl}/${apiEndpoint}`, {
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

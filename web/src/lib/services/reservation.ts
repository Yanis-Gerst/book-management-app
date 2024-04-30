import { apiUrl } from "../temps";

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

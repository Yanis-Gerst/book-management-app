export type IState = "bon" | "mauvais" | "moyen" | "excellent";
export const allStates: IState[] = ["mauvais", "moyen", "bon", "excellent"];

export type ICategorie =
  | "Réaliste"
  | "Science-fiction"
  | "Fantasy"
  | "Dystopie"
  | "Romance";

export type IStockPerState = {
  [key in IState]: {
    reserved: number;
    loaned: number;
    available: number;
  };
};

export type Book = {
  book_id: number;
  coverSrc: string;
  genre: string;
  price: number;
  publicationDate: string;
  title: string;
  authors: IAuthor[];
  articles: IArticle[];
  resume: string;
  total_stocks: number;
  stocks_per_state: IStockPerState;
};

export type IArticle = {
  article_id: number;
  state: IState;
  place: number;
  book_id: number;
  reservation_id: number;
  location_id: number;
  book: Book;
};

export type IAuthor = {
  author_id: number;
  first_name: string;
  last_name: string;
};

export type ISearchUrlParms = {
  search: string;
  categorie: string;
};

export type IAccount = {
  account_id: number;
  role: "admin" | "user";
  first_name: string;
  last_name: string;
  phone_number: string;
  mail: string;
  password: string;
  locations: ILoan[];
  reservations: IReservation[];
};

export type IReservation = {
  reservation_id: number;
  reservationDate: string;
  account_id: number;
  articles: IArticle[];
};

export type ILoan = {
  location_id: number;
  dateOfStart: string;
  dateOfEnd: string;
  articles: IArticle[];
};

export type IQuery = {
  limit?: number;
};

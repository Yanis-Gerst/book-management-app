export type Book = {
  author_id: number;
  avgStar: number;
  book_id: number;
  coverSrc: string;
  genre: string;
  price: number;
  publicationDate: string;
  state: string;
  stocks: number;
  title: string;
  author: IAuthor;
  resume: string;
};

export type ProBook =
  | Book & {
      loan_number: number;
      reservation_number: number;
    };

export type IAuthor = {
  author_id: number;
  first_name: string;
  last_name: string;
};

export type ICategorie =
  | "Réaliste"
  | "Science-fiction"
  | "Fantasy"
  | "Dystopie"
  | "Romance";

export type ISearchUrlParms = {
  search: string;
  categorie: string;
};

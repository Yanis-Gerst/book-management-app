"use client";
import { fetchDataFromGetUrl } from "@/lib/services/commonServices";
import { Book, IArticle } from "@/types/data";
import React, { useEffect, useState } from "react";

interface Props {
  article: IArticle;
}
const Article: React.FC<Props> = ({ article }) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    const fetchBookTitle = async () => {
      setTitle(
        (await fetchDataFromGetUrl<Book>(`book/${article.book_id}`)).title
      );
    };
    fetchBookTitle();
  }, []);

  return (
    <li key={article.article_id}>
      {title} ({article.state})
    </li>
  );
};

export default Article;

import { Book, IArticle } from "@/types/data";
import React from "react";
import Article from "./Article";

interface Props {
  articles: IArticle[];
}
const Articles: React.FC<Props> = ({ articles }) => {
  return (
    <ul className="list-disc pl-4 mb-8">
      {articles.map((article) => (
        <Article key={article.article_id} article={article} />
      ))}
    </ul>
  );
};

export default Articles;

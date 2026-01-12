"use client";

import Link from "next/link";
import { BlogPostMetadata } from "../types/blog";

type ArticleListProps = {
  articles: BlogPostMetadata[];
  title?: string;
};

export function ArticleList({ articles, title }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">記事がまだ投稿されていません。</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{title}</h2>}
      {articles.map((article) => (
        <article
          key={article.slug}
          className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-shadow"
        >
          <Link href={`/articles/${article.slug}`}>
            <h3 className="text-lg sm:text-xl font-semibold text-blue-600 hover:text-blue-800">
              {article.title}
            </h3>
          </Link>
          <div className="text-xs sm:text-sm text-gray-500 mt-2 flex flex-wrap gap-2">
            <span>{new Date(article.date).toLocaleDateString("ja-JP")}</span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
              {article.category}
            </span>
          </div>
          {article.excerpt && (
            <p className="text-sm sm:text-base text-gray-600 mt-3">{article.excerpt}</p>
          )}
        </article>
      ))}
    </div>
  );
}

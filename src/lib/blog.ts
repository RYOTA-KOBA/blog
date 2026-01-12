import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { BlogPost, BlogPostMetadata } from "../types/blog";

const ARTICLES_DIR = path.join(process.cwd(), "public/articles");

export const getArticles = async (): Promise<BlogPostMetadata[]> => {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith(".md"));

  const articles = files.map((file) => {
    const filePath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);

    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title || "No Title",
      date: data.date || new Date().toISOString().split("T")[0],
      category: data.category || "Uncategorized",
      excerpt: data.excerpt || "",
    };
  });

  // 日付の新しい順でソート
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getArticle = async (slug: string): Promise<BlogPost | null> => {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const { data, content: markdownContent } = matter(content);

  const htmlContent = await marked(markdownContent);

  return {
    slug,
    title: data.title || "No Title",
    date: data.date || new Date().toISOString().split("T")[0],
    category: data.category || "Uncategorized",
    excerpt: data.excerpt || "",
    content: htmlContent,
  };
};

export const getArticlesByCategory = async (category: string): Promise<BlogPostMetadata[]> => {
  const articles = await getArticles();
  return articles.filter((article) => article.category === category);
};

export const getCategories = async (): Promise<string[]> => {
  const articles = await getArticles();
  const categories = new Set(articles.map((article) => article.category));
  return Array.from(categories).sort();
};

export const getArticlesByMonth = async (
  year: number,
  month: number,
): Promise<BlogPostMetadata[]> => {
  const articles = await getArticles();
  return articles.filter((article) => {
    const date = new Date(article.date);
    return date.getFullYear() === year && date.getMonth() === month - 1;
  });
};

export const getMonths = async (): Promise<Array<{ year: number; month: number }>> => {
  const articles = await getArticles();
  const months = new Set<string>();

  articles.forEach((article) => {
    const date = new Date(article.date);
    months.add(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`);
  });

  return Array.from(months)
    .sort()
    .reverse()
    .map((m) => {
      const [year, month] = m.split("-");
      return { year: parseInt(year), month: parseInt(month) };
    });
};

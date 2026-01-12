import { getArticlesByCategory, getCategories } from "../../../lib/blog";
import { ArticleList } from "../../../components/ArticleList";
import Link from "next/link";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export const generateStaticParams = async () => {
  const categories = await getCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
};

export const generateMetadata = async ({ params }: CategoryPageProps) => {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory} - カテゴリ`,
    description: `${decodedCategory}カテゴリの記事一覧`,
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const articles = await getArticlesByCategory(decodedCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-8">
        <Link
          href="/"
          className="text-sm sm:text-base text-blue-600 hover:text-blue-800 mb-6 sm:mb-8 inline-block"
        >
          ← トップページに戻る
        </Link>

        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          {decodedCategory}
        </h1>

        <ArticleList articles={articles} />
      </div>
    </main>
  );
};

export default CategoryPage;

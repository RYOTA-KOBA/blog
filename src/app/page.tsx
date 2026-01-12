import { getArticles, getCategories, getMonths } from "../lib/blog";
import { ArticleList } from "../components/ArticleList";
import { Sidebar } from "../components/Sidebar";

const Home = async () => {
  const articles = await getArticles();
  const categories = await getCategories();
  const months = await getMonths();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 py-4 sm:px-4 sm:py-8">
        {/* ヘッダー */}
        <header className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">My Blog</h1>
          <p className="text-sm sm:text-base text-gray-600">技術ブログ</p>
        </header>

        {/* メインコンテンツ + サイドバー */}
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-4 sm:gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-6">
            <ArticleList articles={articles} />
          </div>

          {/* サイドバー */}
          <Sidebar categories={categories} months={months} />
        </div>
      </div>
    </main>
  );
};

export default Home;

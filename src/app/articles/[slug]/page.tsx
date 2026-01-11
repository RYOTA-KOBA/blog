import { getArticle, getArticles } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateStaticParams = async () => {
  const articles = await getArticles();
  return articles.map(article => ({
    slug: article.slug,
  }));
};

export const generateMetadata = async ({ params }: ArticlePageProps) => {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: 'Not Found' };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
};

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-8">
        {/* 戻る */}
        <Link
          href="/"
          className="text-sm sm:text-base text-blue-600 hover:text-blue-800 mb-6 sm:mb-8 inline-block"
        >
          ← 記事一覧に戻る
        </Link>

        {/* 記事ヘッダー */}
        <article>
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {article.title}
            </h1>
            <div className="text-sm sm:text-base text-gray-600 space-y-2">
              <div>
                <span>{new Date(article.date).toLocaleDateString('ja-JP')}</span>
              </div>
              <div>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-xs sm:text-sm">
                  {article.category}
                </span>
              </div>
            </div>
          </header>

          {/* 記事本文 */}
          <div className="prose prose-sm max-w-none mb-8">
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              className="text-sm sm:text-base text-gray-800 leading-6 sm:leading-7"
            />
          </div>
        </article>

        {/* フッター */}
        <div className="border-t pt-6 sm:pt-8 mt-6 sm:mt-8">
          <Link
            href="/"
            className="text-sm sm:text-base text-blue-600 hover:text-blue-800"
          >
            ← 記事一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ArticlePage;

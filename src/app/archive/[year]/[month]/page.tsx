import { getArticlesByMonth, getMonths } from "@/lib/blog";
import { ArticleList } from "@/components/ArticleList";
import Link from "next/link";

type ArchivePageProps = {
  params: Promise<{
    year: string;
    month: string;
  }>;
};

const ArchivePage = async ({ params }: ArchivePageProps) => {
  const { year, month } = await params;
  const yearNum = parseInt(year);
  const monthNum = parseInt(month);

  // 不正な年月チェック
  if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-8">
          <p className="text-sm sm:text-base text-red-600">不正な年月です。</p>
          <Link href="/" className="text-sm sm:text-base text-blue-600 hover:text-blue-800">
            トップページに戻る
          </Link>
        </div>
      </main>
    );
  }

  const articles = await getArticlesByMonth(yearNum, monthNum);

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
          {yearNum}年{monthNum}月
        </h1>

        <ArticleList articles={articles} />
      </div>
    </main>
  );
};

export default ArchivePage;

export const generateStaticParams = async () => {
  const months = await getMonths();
  return months.map(({ year, month }) => ({
    year: year.toString(),
    month: String(month).padStart(2, "0"),
  }));
};

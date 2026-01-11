"use client";

import Link from "next/link";

type SidebarProps = {
  categories?: string[];
  months?: Array<{ year: number; month: number }>;
};

export function Sidebar({ categories = [], months = [] }: SidebarProps) {
  return (
    <aside className="lg:col-span-3">
      {/* カテゴリ一覧 */}
      {categories.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">カテゴリ</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/categories/${encodeURIComponent(category)}`}
                  className="text-sm sm:text-base text-blue-600 hover:text-blue-800"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* アーカイブ */}
      {months.length > 0 && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">アーカイブ</h3>
          <ul className="space-y-2">
            {months.map(({ year, month }) => (
              <li key={`${year}-${month}`}>
                <Link
                  href={`/archive/${year}/${String(month).padStart(2, "0")}`}
                  className="text-sm sm:text-base text-blue-600 hover:text-blue-800"
                >
                  {year}年{month}月
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

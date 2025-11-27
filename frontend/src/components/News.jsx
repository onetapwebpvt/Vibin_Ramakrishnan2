import React, { useState, useEffect } from "react";

function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => {
        setNewsItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading news...</div>;

  return (
    <aside className="space-y-6">
      <div className="relative">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Latest News
        </h2>
      </div>

      <div className="space-y-4">
        {newsItems.map((item) => (
          <article
            key={item.id}
            className="group bg-white rounded-xl border-2 border-gray-100 p-5 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="flex items-center gap-4">
              <div className="shrink-0 bg-linear-to-br from-blue-50 to-indigo-50 px-3 py-2 rounded-lg border border-blue-100">
                <time
                  dateTime={item.date}
                  className="text-sm text-blue-700 font-bold block"
                >
                  {item.date}
                </time>
              </div>

              <div className="hidden sm:block h-auto w-px bg-linear-to-b from-transparent via-gray-300 to-transparent self-stretch" />

              <div className="flex-1">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 group-hover:text-blue-600 font-semibold block transition-colors duration-200 leading-relaxed"
                >
                  {item.text}
                </a>
                {item.summary && (
                  <p className="mt-2 text-sm text-gray-600">{item.summary}</p>
                )}
              </div>

              <div className="shrink-0 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}

export default News;

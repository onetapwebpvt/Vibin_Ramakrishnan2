import React from "react";

const newsItems = [
  {
    date: "2024-24-07",
    text: "New Paper in Drug Delivery and Translational Research, ANSN Nanoscience and Nanotechnology",
    link: "https://fac.iitg.ac.in/vibin/page_news_details.php?n=UXZ6QTMzK0ROUGNFNHJ2K0J5NU5kQT09",
  },
  {
    date: "2024-14-06",
    text: "Vibin Elected as Fellow of The Indian Chemical Society",
    link: "https://fac.iitg.ac.in/vibin/page_news_details.php?n=MUQ0VXloclRrTEZpeHMwT3NEWU44Zz09",
  },
  {
    date: "2024-20-06",
    text: "Vibin Elected as the Fellow of Royal Society of Biology",
    link: "https://fac.iitg.ac.in/vibin/page_news_details.php?n=S1dLNVFyamgzNE1naWdwZXNTQ3Nldz09",
  },
  {
    date: "2024-09-05",
    text: "4 new patents filed",
    link: "https://fac.iitg.ac.in/vibin/page_news_details.php?n=ZXJjR3AzVHE2SXZSMk12ZllETDdpQT09",
  },
  {
    date: "2024-03-05",
    text: "Vibin elected as the Fellow of Royal Society of Chemistry",
    link: "https://fac.iitg.ac.in/vibin/page_news_details.php?n=d0M2ZE5CRHNRT1pHOStsb0w0bkFxQT09",
  },
];

function News() {
  return (
    <aside className="space-y-6">
      <div className="relative">
        <h2 className="text-4xl font-bold text-gray-900 mb-2 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text">
          Latest News
        </h2>
      </div>

      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <article
            key={index}
            className="group bg-white rounded-xl border-2 border-gray-100 p-5 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="flex items-center gap-4">
              {/* Date badge */}
              <div className="shrink-0 bg-linear-to-br from-blue-50 to-indigo-50 px-3 py-2 rounded-lg border border-blue-100">
                <time
                  dateTime={item.dateISO || item.date}
                  className="text-sm text-blue-700 font-bold block"
                >
                  {item.date}
                </time>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-auto w-px bg-linear-to-b from-transparent via-gray-300 to-transparent self-stretch" />

              {/* Text */}
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

              {/* Arrow indicator */}
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

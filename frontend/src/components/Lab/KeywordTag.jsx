import React from "react";

function KeywordTag({ keyword, colorIndex }) {
  const tagColors = [
    "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
    "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
    "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200",
  ];

  return (
    <span
      className={`${tagColors[colorIndex % 3]} px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default`}
    >
      {keyword}
    </span>
  );
}

export default KeywordTag;
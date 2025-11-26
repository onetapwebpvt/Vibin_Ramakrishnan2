import React from "react";
import PatentCard from "./PatentCard";

function CategorySection({ categoryData, index }) {
  // Different icon styles for each category
  const categoryIcons = {
    "International Patent": "🌍",
    "Indian Patents": "🇮🇳",
    "Computational Tools/Web servers": "💻",
  };

  const categoryColors = {
    "International Patent": {
      gradient: "from-amber-600 to-orange-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    "Indian Patents": {
      gradient: "from-emerald-600 to-teal-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    "Computational Tools/Web servers": {
      gradient: "from-cyan-600 to-blue-600",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
    },
  };

  const colors =
    categoryColors[categoryData.category] || categoryColors["Indian Patents"];

  return (
    <section className="mb-16">
      {/* Category Header */}
      <div className="relative mb-8">
        <div
          className={`inline-flex items-center gap-3 ${colors.bg} px-6 py-3 rounded-2xl border-2 ${colors.border} shadow-lg`}
        >
          <span className="text-3xl">
            {categoryIcons[categoryData.category] || "📄"}
          </span>
          <h2
            className={`text-3xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
          >
            {categoryData.category}
          </h2>
        </div>

        {/* Item count badge */}
        <div
          className={`inline-flex items-center gap-2 ml-4 px-4 py-2 rounded-full ${colors.bg} border ${colors.border}`}
        >
          <span className="text-sm font-semibold text-gray-700">
            {categoryData.items.length} {categoryData.items.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {/* Decorative line */}
        <div className="mt-4 flex items-center gap-2">
          <div
            className={`h-1 w-24 bg-gradient-to-r ${colors.gradient} rounded-full`}
          ></div>
          <div className="h-1 w-12 bg-gray-300 rounded-full"></div>
          <div className="h-1 w-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryData.items.map((item, itemIndex) => (
          <PatentCard
            key={itemIndex}
            item={item}
            index={itemIndex}
            categoryType={categoryData.category}
          />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
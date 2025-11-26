import React from "react";
import KeywordTag from "./KeywordTag";

function ProjectCard({ project, index }) {
  // Different gradient backgrounds for visual variety
  const gradients = [
    "from-blue-50 to-indigo-50",
    "from-purple-50 to-pink-50",
    "from-emerald-50 to-teal-50",
  ];

  const accentColors = [
    "bg-gradient-to-r from-blue-500 to-indigo-600",
    "bg-gradient-to-r from-purple-500 to-pink-600",
    "bg-gradient-to-r from-emerald-500 to-teal-600",
  ];

  return (
    <div
      className={`group relative bg-gradient-to-br ${gradients[index % 3]} rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-white/50 backdrop-blur-sm overflow-hidden`}
    >
      {/* Decorative gradient orb */}
      <div
        className={`absolute -top-10 -right-10 w-40 h-40 ${accentColors[index % 3]} rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`}
      ></div>

      {/* Accent bar */}
      <div
        className={`absolute left-0 top-0 w-1.5 h-full ${accentColors[index % 3]} rounded-r-full`}
      ></div>

      <div className="relative z-10">
        {/* Project number badge */}
        <div className="flex items-start justify-between mb-4">
          <span
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${accentColors[index % 3]} text-white font-bold text-sm shadow-lg`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
          {project.title}
        </h3>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Objective
          </p>
          <p className="text-gray-700 leading-relaxed">{project.objective}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Keywords
          </p>
          <div className="flex flex-wrap gap-2">
            {project.keywords.map((keyword, idx) => (
              <KeywordTag key={idx} keyword={keyword} colorIndex={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
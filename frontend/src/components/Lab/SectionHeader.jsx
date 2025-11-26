import React from "react";

function SectionHeader({ title, subtitle, accentColor = "blue" }) {
  const colors = {
    blue: "from-blue-600 to-indigo-600",
    purple: "from-purple-600 to-pink-600",
    emerald: "from-emerald-600 to-teal-600",
  };

  return (
    <div className="relative mb-12">
      {/* Decorative background element */}
      <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50"></div>

      <div className="relative">
        <h2
          className={`text-5xl font-bold mb-3 bg-gradient-to-r ${colors[accentColor]} bg-clip-text text-transparent`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-gray-600 font-light">{subtitle}</p>
        )}

        {/* Decorative underline */}
        <div className="mt-4 flex items-center gap-2">
          <div
            className={`h-1 w-20 bg-gradient-to-r ${colors[accentColor]} rounded-full`}
          ></div>
          <div className="h-1 w-10 bg-gray-300 rounded-full"></div>
          <div className="h-1 w-5 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default SectionHeader;
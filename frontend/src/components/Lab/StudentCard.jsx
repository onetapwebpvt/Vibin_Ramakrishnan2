import React from "react";

function StudentCard({ student, index }) {
  // Gradient overlays for images
  const overlayGradients = [
    "from-blue-600/80 to-indigo-600/80",
    "from-purple-600/80 to-pink-600/80",
    "from-emerald-600/80 to-teal-600/80",
    "from-orange-600/80 to-red-600/80",
  ];

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03]">
      {/* Image container with gradient overlay */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: "url('/prop-img.jpg')" }}
        ></div>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${overlayGradients[index % 4]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        ></div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-bl-3xl"></div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Decorative dot */}
        <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 mt-2 group-hover:text-blue-600 transition-colors duration-300">
          {student.name}
        </h3>

        <p className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
          {student.title}
        </p>

        <div className="pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
            Research Area
          </p>
          <p className="text-gray-700 font-medium">{student.field}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;
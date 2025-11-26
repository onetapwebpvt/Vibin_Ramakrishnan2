import React from "react";

function SubHero() {
  return (
    <div className="w-full flex items-center justify-center pb-16 px-8">
      <div className="flex gap-8">
        <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-green-800 bg-green-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
          <span className="font-semibold text-white group-hover:text-green-100 transition-colors">
            Teaching
          </span>
        </div>

        <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-green-900 bg-green-900 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
          <span className="font-semibold text-white group-hover:text-green-50 transition-colors">
            Resume
          </span>
        </div>

        <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-emerald-800 bg-emerald-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
          <span className="font-semibold text-white group-hover:text-emerald-100 transition-colors">
            MID Lab
          </span>
        </div>

        <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-teal-800 bg-teal-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
          <span className="font-semibold text-white group-hover:text-teal-50 transition-colors">
            Publications
          </span>
        </div>
      </div>
    </div>
  );
}

export default SubHero;

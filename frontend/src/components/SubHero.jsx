import React from "react";
import { Link } from "react-router-dom";

function SubHero() {
  const navItems = [
    { 
      name: "Teaching", 
      path: "/teaching",
      bgColor: "bg-green-800",
      borderColor: "border-green-800",
      hoverTextColor: "group-hover:text-green-100"
    },
    { 
      name: "Resume", 
      path: "/resume",
      bgColor: "bg-green-900",
      borderColor: "border-green-900",
      hoverTextColor: "group-hover:text-green-50"
    },
    { 
      name: "MID Lab", 
      path: "/mid-lab",
      bgColor: "bg-emerald-800",
      borderColor: "border-emerald-800",
      hoverTextColor: "group-hover:text-emerald-100"
    },
    { 
      name: "Publications", 
      path: "/publications",
      bgColor: "bg-teal-800",
      borderColor: "border-teal-800",
      hoverTextColor: "group-hover:text-teal-50"
    }
  ];

  return (
    <div className="w-full flex items-center justify-center pb-16 px-4 sm:px-8">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`
              w-28 h-28 
              sm:w-32 sm:h-32 
              md:w-36 md:h-36 
              lg:w-40 lg:h-40
              flex items-center justify-center 
              rounded-full 
              border-4 ${item.borderColor} ${item.bgColor}
              shadow-lg hover:shadow-xl 
              hover:scale-105 
              transition-all duration-300 
              cursor-pointer group
            `}
          >
            <span className={`
              font-semibold text-white 
              ${item.hoverTextColor}
              transition-colors
              text-base sm:text-lg md:text-xl
              text-center px-2
            `}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubHero;

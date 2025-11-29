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
    <div className="w-full max-w-7xl lg:justify-end flex items-center justify-center  pb-12 md:pb-16 px-4 sm:px-8">
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`
              w-32 h-32 
              sm:w-32 sm:h-32 
              md:w-32 md:h-32 
              lg:w-32 lg:h-32
              flex items-center justify-center 
              rounded-full 
              border-0
              ${item.bgColor}
              shadow-lg hover:shadow-2xl 
              hover:scale-105 
              transition-all duration-300 
              cursor-pointer group
            `}
          >
            <span className={`
              font-bold text-white 
              ${item.hoverTextColor}
              transition-colors
              text-1xl
              text-center px-3
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

import React from "react";
import ContactInfo from "./Footer/ContactInfo";
import SocialLinks from "./Footer/SocialLinks";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 pb-8">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mb-12">
          <ContactInfo />
          <SocialLinks />
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">© 2025 All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-1">
              Maintained by{" "}
              <span className="text-blue-400 font-semibold">
                Students' Web Committee, IIT Guwahati
              </span>
            </p>
          </div>
          {/* Quick links (now wraps on mobile) */}
          <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-6">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 px-2 py-1"
            >
              Privacy Policy
            </a>
            <span className="hidden sm:block text-gray-600">•</span>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 px-2 py-1"
            >
              Terms of Use
            </a>
            <span className="hidden sm:block text-gray-600">•</span>
            <a
              href="https://fac.iitg.ac.in/vibin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 px-2 py-1"
            >
              Official Site
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

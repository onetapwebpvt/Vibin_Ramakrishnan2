import React, { useState, useEffect } from "react";
import ContactInfo from "./Footer/ContactInfo";
import SocialLinks from "./Footer/SocialLinks";

function Footer() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/site-settings')
      .then(res => res.json())
      .then(data => {
        console.log('Footer received settings:', data);
        setSettings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch site settings:', err);
        setLoading(false);
      });
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 pb-8">
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mb-12">
              <ContactInfo settings={settings} />
              <SocialLinks settings={settings} />
            </div>

            <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400">
                  {settings?.copyrightText || "© 2025 All rights reserved."}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Maintained by{" "}
                  <a href="https://www.linkedin.com/in/ashish-more-2192b1288" target="_blank" rel="noopener noreferrer">
                    <span className="text-blue-400 font-semibold">Ashish More</span>
                  </a>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-6">
                <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 px-2 py-1">
                  Privacy Policy
                </a>
                <span className="hidden sm:block text-gray-600">•</span>
                <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 px-2 py-1">
                  Terms of Use
                </a>
                {settings?.officialSiteUrl && (
                  <>
                    <span className="hidden sm:block text-gray-600">•</span>
                    <a
                      href={settings.officialSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 px-2 py-1"
                    >
                      Official Site
                    </a>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}

export default Footer;

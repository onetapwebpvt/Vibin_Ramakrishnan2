import React from "react";

function ContactInfo() {
  const contactItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Office",
      value: "104, N Block, BSBE",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "+91 361 258 2227, 291 9160",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      label: "Fax",
      value: "+91 361 258 2249",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "vibin@iitg.ac.in",
      link: "mailto:vibin@iitg.ac.in",
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
        <span className="w-1 h-8 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full"></span>
        Contact Information
      </h3>
      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className="shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-500/30 transition-all duration-300">
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wide mb-1">
                {item.label}
              </p>
              {item.link ? (
                <a
                  href={item.link}
                  className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-white font-medium">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactInfo;
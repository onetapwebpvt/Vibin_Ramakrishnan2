import React, { useState, useEffect } from "react";
import { apiCall } from "../config/api";

// Helpers
const StatusBadge = ({ status }) => {
  const map = {
    Awarded: "bg-green-100 text-green-800 border-green-200",
    Published: "bg-blue-100 text-blue-800 border-blue-200",
    Filed: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Granted: "bg-purple-100 text-purple-800 border-purple-200",
    Unknown: "bg-gray-100 text-gray-700 border-gray-200",
  };
  const cls = map[status] || map.Unknown;
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      {status}
    </span>
  );
};

const PatentCard = ({ idx, title, inventors, number, date, status }) => (
  <article className="relative bg-white rounded-2xl border border-gray-100 p-6 shadow hover:shadow-lg transition-shadow duration-200">
    <div className="absolute -left-3 -top-3 w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
      {idx}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-700 mb-1">
      <span className="font-semibold">Inventors:</span> {inventors}
    </p>
    <p className="text-sm text-gray-700">
      <span className="font-semibold">Patent No.:</span> {number}
      {date ? <> • <span className="font-semibold">Date:</span> {date}</> : null}
    </p>
    <div className="mt-3">
      <StatusBadge status={status} />
    </div>
  </article>
);

function PatentsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiCall('/api/patents-page')
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching patents:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading patents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  const { internationalPatents, indianPatents, tools } = data;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold text-blue-900">Patents & Tools</h1>
          <p className="text-gray-600">
            Comprehensive list of international and Indian patents, plus computational tools developed by our lab.
          </p>
        </header>

        {/* International Patents */}
        {internationalPatents && internationalPatents.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-indigo-900">
              International Patent{internationalPatents.length > 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {internationalPatents.map((p, i) => (
                <PatentCard
                  key={p.id}
                  idx={i + 1}
                  title={p.title}
                  inventors={p.inventors}
                  number={p.patentNo}
                  date={p.date}
                  status={p.status}
                />
              ))}
            </div>
          </section>
        )}

        {/* Indian Patents */}
        {indianPatents && indianPatents.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-indigo-900">Indian Patents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {indianPatents.map((p, i) => (
                <PatentCard
                  key={p.id}
                  idx={(internationalPatents?.length || 0) + i + 1}
                  title={p.title}
                  inventors={p.inventors}
                  number={p.patentNo}
                  date={p.date}
                  status={p.status}
                />
              ))}
            </div>
          </section>
        )}


      </div>
    </div>
  );
}

export default PatentsPage;

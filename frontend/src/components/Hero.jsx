import React, { useState, useEffect } from "react";
import SubHero from "./SubHero";

function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/hero')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch hero data');
        }
        return res.json();
      })
      .then(data => {
        setHeroData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching hero data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
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

  if (!heroData || !heroData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
        <div className="text-center">
          <p className="text-gray-600">No profile data available</p>
          <p className="text-sm text-gray-500 mt-2">Please add data in the admin panel</p>
        </div>
      </div>
    );
  }

  // Split comma-separated departments
  const departmentsList = heroData.departments 
    ? heroData.departments.split(',').map(d => d.trim()).filter(d => d.length > 0)
    : [];

  return (
    <div className="min-w-full bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
  <div className="w-full flex items-center justify-start py-20 px-8 md:px-16 lg:px-24">
    <div className="w-84 h-84 rounded-full overflow-hidden shadow-2xl ring-4 ring-gray-100 ring-offset-4 ring-offset-slate-200 flex-shrink-0">
      {heroData.profileImage ? (
        <img
          src={heroData.profileImage}
          alt={heroData.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400?text=Profile+Image';
          }}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gray-200">
          <span className="text-gray-400 text-4xl">{heroData.name.charAt(0)}</span>
        </div>
      )}
    </div>
    
    <div className="text pl-20 max-w-2xl">
      <h1 className="font-bold text-5xl pb-6 text-transparent bg-gradient-to-r from-gray-800 to-slate-900 bg-clip-text">
        {heroData.name}
      </h1>
      
      <div className="py-3 flex items-stretch gap-4 mb-4">
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide self-center">
          {heroData.designation}
        </p>
        
        {departmentsList.length > 0 && (
          <>
            <div className="w-px bg-slate-400 self-stretch"></div>
            <div className="flex flex-col gap-1">
              {departmentsList.map((dept, idx) => (
                <h3 key={idx} className="text-md font-semibold text-gray-800">
                  {dept}
                </h3>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="py-3 space-y-1">
        {heroData.office && (
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Office:</span> {heroData.office}
          </p>
        )}
        {heroData.email && (
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Email:</span>{" "}
            <a
              href={`mailto:${heroData.email}`}
              className="text-slate-700 hover:text-slate-900 hover:underline"
            >
              {heroData.email}
            </a>
          </p>
        )}
      </div>
      
      <div className="py-3 space-y-1">
        {heroData.phone && (
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Phone:</span> {heroData.phone}
          </p>
        )}
        {heroData.fax && (
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Fax:</span> {heroData.fax}
          </p>
        )}
        {heroData.websiteUrl && (
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">URL:</span>{" "}
            <a
              href={heroData.websiteUrl.startsWith('http') ? heroData.websiteUrl : `https://${heroData.websiteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-900 hover:underline"
            >
              {heroData.websiteUrl}
            </a>
          </p>
        )}
      </div>
      
      {heroData.researchAreas && (
        <div className="py-3 bg-gradient-to-r from-slate-100 to-gray-100 rounded-lg px-4 border border-slate-200">
          <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
            Research Areas
          </p>
          <p className="text-gray-700 leading-relaxed">
            {heroData.researchAreas}
          </p>
        </div>
      )}
    </div>
  </div>

  <SubHero />
</div>

  );
}

export default Hero;

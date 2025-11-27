import React, { useState, useEffect } from "react";
import { apiCall } from "../config/api";

const Teaching = () => {
  const [teachingData, setTeachingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiCall('/api/teaching')
      .then(data => {
        setTeachingData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teaching data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-6">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-6">
        <p className="text-center text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (teachingData.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-6">
        <p className="text-center text-gray-600">No teaching information available</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-6">
        Teaching
      </h1>
      
      {teachingData.map((dept, idx) => {
        const undergraduateCourses = dept.courses.filter(c => c.courseType === 'Undergraduate');
        const graduateCourses = dept.courses.filter(c => c.courseType === 'Graduate');
        const otherCourses = dept.courses.filter(c => c.courseType === 'Other');

        return (
          <div key={dept.id} className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${idx === 0 ? 'text-emerald-700' : 'text-sky-700'}`}>
              {dept.name}
            </h2>
            
            {undergraduateCourses.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-3">Undergraduate Courses</h3>
                <ul className="ml-4 mb-5 list-disc space-y-1">
                  {undergraduateCourses.map((course) => (
                    <li key={course.id} className="text-gray-800">
                      {course.courseCode} {course.courseName}
                    </li>
                  ))}
                </ul>
              </>
            )}
            
            {graduateCourses.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-3">Graduate Courses</h3>
                <ul className="ml-4 mb-5 list-disc space-y-1">
                  {graduateCourses.map((course) => (
                    <li key={course.id} className="text-gray-800">
                      {course.courseCode} {course.courseName}
                    </li>
                  ))}
                </ul>
              </>
            )}
            
            {otherCourses.length > 0 && (
              <ul className="ml-4 list-disc space-y-1">
                {otherCourses.map((course) => (
                  <li key={course.id} className="text-gray-800">
                    {course.courseCode} {course.courseName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Teaching;

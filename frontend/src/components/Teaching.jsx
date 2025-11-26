import React from "react";

const teachingData = [
  {
    section: "Department of Biosciences and Bioengineering",
    undergraduateCourses: [
      "BT 205 Biophysics",
      "BT 101 Modern Biology",
      "BT 301 Bioinformatics and Computational Biology",
      "BT 310 Bioinformatics and Computational Biology Laboratory",
      "BT 305 Computational Biology",
    ],
    graduateCourses: [
      "BT 601 Analytical Biotechnology",
      "BT 501 Biotechniques",
      "BT 530 Experimental Techniques in Bioengineering Laboratory",
      "BT 510 Bio-techniques Laboratory",
      "BT 617 Concepts and Methods in Proteomics",
    ],
  },
  {
    section: "Mehta Family School of Data Science & Artificial Intelligence",
    courses: ["DA 461 Bioinformatics"],
  },
];

const Teaching = () => (
  <div className="max-w-2xl mx-auto py-10 px-6">
    <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-6">
      Teaching
    </h1>
    {teachingData.map((dept, idx) => (
      <div key={idx} className="mb-8">
        <h2
          className={`text-2xl font-bold mb-4 ${
            idx === 0
              ? "text-emerald-700"
              : "text-sky-700"
          }`}
        >
          {dept.section}
        </h2>
        {dept.undergraduateCourses && (
          <>
            <h3 className="text-lg font-semibold mb-3">Undergraduate Courses</h3>
            <ul className="ml-4 mb-5 list-disc space-y-1">
              {dept.undergraduateCourses.map((course, uidx) => (
                <li key={uidx} className="text-gray-800">
                  {course}
                </li>
              ))}
            </ul>
          </>
        )}
        {dept.graduateCourses && (
          <>
            <h3 className="text-lg font-semibold mb-3">Graduate Courses</h3>
            <ul className="ml-4 mb-5 list-disc space-y-1">
              {dept.graduateCourses.map((course, gidx) => (
                <li key={gidx} className="text-gray-800">
                  {course}
                </li>
              ))}
            </ul>
          </>
        )}
        {dept.courses && (
          <ul className="ml-4 list-disc space-y-1">
            {dept.courses.map((course, cid) => (
              <li key={cid} className="text-gray-800">
                {course}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

export default Teaching;

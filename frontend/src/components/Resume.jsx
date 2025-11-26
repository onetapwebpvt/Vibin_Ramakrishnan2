import React from "react";

// Dummy data for demonstration. Replace with AdminJS/API data as needed.
const profileImage = "/images/vibin-profile.jpg";
const resumePDF = "/resume/vibin-ramakrishnan-resume.pdf";

const resumeData = {
  name: "Vibin Ramakrishnan",
  title: "Professor",
  departments: [
    "Department of Biosciences & Bioengineering, IIT Guwahati",
    "Mehta Family School of Data Science & Artificial Intelligence",
  ],
  contact: {
    email: "vibin@iitg.ac.in",
    phone: "+91-361-258 2227",
    url: "https://fac.iitg.ac.in/vibin/"
  },
  pdf: "/resume/vibin-ramakrishnan-resume.pdf",
  education: [
    {
      degree: "Ph.D.",
      field: "Computational Biology, Biophysics",
      institution: "IIT Bombay",
      year: "1999 - 2004"
    },
    {
      degree: "M.Sc.",
      field: "Applied Chemistry",
      institution: "Cochin University of Science and Technology",
      year: "1996 - 1998"
    }
  ],
  positions: [
    { title: "Professor", place: "IIT Guwahati", years: "2019 - present" },
    { title: "Associate Professor", place: "IIT Guwahati", years: "2015 - 2019" },
    { title: "Assistant Professor", place: "IIT Guwahati", years: "2011 - 2015" },
    { title: "Faculty Scientist/IYBA Fellow", place: "IBAB Bangalore & RGCB Thiruvananthapuram", years: "2007 - 2010" },
    { title: "Post-Doctoral Research Associate", place: "Rensselaer Polytechnic Institute, Troy NY, USA", years: "2006 - 2007" }
  ],
  researchInterests: [
    "Bio-nanotechnology",
    "Drug Delivery Vehicles",
    "Network medicine",
    "Peptide based antibiotics",
    "Computational Biology",
  ],
  awards: [
    "Innovative Young Biotechnologist Award (IYBA 2011-12), Ministry of Science and Technology",
    "Innovative Young Biotechnologist Award (IYBA 2007-08), Ministry of Science and Technology",
    "Post-Doctoral Fellowship, National Science Foundation, US",
    "Institute Research Fellowship, IIT Bombay",
    "CSIR-UGC Test, Graduate Aptitude Test in Engg. (GATE)"
  ],
  editorial: [
    {
      title: "Scientific Reports",
      journalImage: "/images/scientific-reports-logo.png", // replace with actual logo path/admin field
      publisher: "Nature Publishing Group, Springer Nature",
      since: "2018 onwards",
      impact: "4.996",
    },
    {
      title: "Journal of Controlled Release",
      journalImage: "/images/jcr-logo.jpg",
      publisher: "Elsevier",
      since: "2021 onwards",
      impact: "11.47",
    },
  ],
  teaching: [
    {
      section: "Department of Biosciences and Bioengineering",
      undergraduate: [
        "BT 101 Modern Biology",
        "BT 205 Biophysics",
        "BT 301 Bioinformatics and Computational Biology",
        "BT 310 Bioinformatics and Computational Biology Laboratory",
        "BT 305 Computational Biology",
      ],
      graduate: [
        "BT 601 Analytical Biotechnology",
        "BT 501 Biotechniques",
        "BT 510 Bio-techniques Laboratory",
        "BT 617 Concepts and Methods in Proteomics",
      ],
    },
    {
      section: "Mehta Family School of Data Science & Artificial Intelligence",
      undergraduate: ["DA 461 Bioinformatics"],
      graduate: [],
    },
  ],
  patents: [
    {
      title: "A device for non-invasive treatment of neurodegenerative diseases.",
      inventors: "Vibin Ramakrishnan, Gaurav Pandey, Harshal B. Nemade, Jahnu Saikia, Sajitha S, & Nitin Chaudhary",
      patentNo: "WO/2019/012556",
      status: "Published",
    },
    {
      title: "Generation and usage of Di-Histidine based stimulus responsive nanostructures",
      inventors: "Vibin Ramakrishnan, Sajitha S, Nitin Chaudhary & Gaurav Pandey",
      patentNo: "243/KOL/2015",
      status: "Published",
    },
  ],
  selectedPublications: [
    {
      id: 1,
      title: "Delivery of Small Molecules by Syndiotactic Peptides for Breast Cancer Therapy.",
      authors: "Gaurav Jerath, Pramod Darvin, Yvonne Christian, Vishal Trivedi, T. R. Santhosh Kumar, Vibin Ramakrishnan",
      venue: "Molecular Pharmaceutics",
      year: 2022,
      doi: "acs.molpharmaceut.2c00238",
      publisher: "ACS Publications"
    },
    {
      id: 2,
      title: "Anisotropic Ferromagnetic Organic Nanoflowers.",
      authors: "Sajitha Sasidharan, Sayandeep Ghosh, Rishi Sreedhar, Kalpana Kumari, Subhash Thota, Vibin Ramakrishnan",
      venue: "Journal of Physical Chemistry C",
      year: 2022,
      doi: "10.1021/acs.jpcc.2c01462",
      publisher: "ACS Publications"
    },
    {
      id: 3,
      title: "Geometry Encoded Functional Programming of Tumor Homing Peptides for Targeted Drug Delivery",
      authors: "Ruchika Goyal, Gaurav Jerath, Akhil R., Aneesh Chandrasekharan, Eswara Rao Puppala, Srikanth Ponneganti, Anupam Sarma, V.G.M. Naidu, T. R. Santhoshkumar, Vibin Ramakrishnanan",
      venue: "Journal of Controlled Release",
      year: 2021,
      doi: "10.1016/j.jconrel.2021.03.0101",
      publisher: "Elsevier"
    }
  ]
};

const SectionHeading = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-green-700 mt-10 mb-4">{children}</h2>
);

const Resume = () => (
  <div className="w-full bg-white min-h-screen">
    <div className="w-full flex justify-center py-8 px-2 md:px-0">
      <div className="w-full max-w-[1400px] px-4 md:px-12 lg:px-24">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-12 pb-8">
          <div className="mx-auto md:mx-0 flex-shrink-0">
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-green-300 bg-white flex items-center justify-center">
              <img src={profileImage} alt={resumeData.name} className="w-full h-full object-cover"/>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
              {resumeData.name}
            </h1>
            <p className="text-lg text-gray-600 mb-2">{resumeData.title}</p>
            {resumeData.departments.map((d,i) =>
              <div key={i} className="font-semibold text-blue-900">{d}</div>
            )}
            <div className="mt-2 text-gray-600 text-sm">
              <span>Email:</span>{" "}
              <a href={`mailto:${resumeData.contact.email}`} className="text-blue-700 hover:underline">{resumeData.contact.email}</a>{" | "}
              <span>Phone: {resumeData.contact.phone}</span>{" | "}
              <a href={resumeData.contact.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Faculty Page</a>
            </div>
            <div className="mt-6">
              <a href={resumePDF} download className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg transition-colors">
                Download Resume PDF
              </a>
            </div>
          </div>
        </div>

        {/* Education */}
        <SectionHeading>Education</SectionHeading>
        <ul className="mb-4 ml-4 list-disc space-y-1">
          {resumeData.education.map((e, i) => (
            <li key={i}>
              <span className="font-semibold">{e.degree}</span>, {e.field}, {e.institution} ({e.year})
            </li>
          ))}
        </ul>

        {/* Positions/Experience */}
        <SectionHeading>Positions & Employment</SectionHeading>
        <ul className="mb-4 ml-4 list-disc space-y-1">
          {resumeData.positions.map((exp, i) => (
            <li key={i}>
              <span className="font-semibold">{exp.title}</span>, {exp.place}
              <span className="text-gray-500"> ({exp.years})</span>
            </li>
          ))}
        </ul>

        {/* Research Interests */}
        <SectionHeading>Research Interests</SectionHeading>
        <ul className="mb-4 ml-4 list-disc space-y-1">
          {resumeData.researchInterests.map((interest, i) => (
            <li key={i}>{interest}</li>
          ))}
        </ul>

        {/* Awards */}
        <SectionHeading>Awards & Achievements</SectionHeading>
        <ul className="mb-4 ml-4 list-disc space-y-1">
          {resumeData.awards.map((award, i) => (
            <li key={i}>{award}</li>
          ))}
        </ul>

        {/* Editorial Board Memberships */}
        <SectionHeading>Editorial Board Membership</SectionHeading>
        {resumeData.editorial.map((e, i) => (
          <div key={i} className="mb-7">
            <div className="font-medium">
              {i + 1}. Editorial Board Member, <span className="font-bold">{e.title}</span>. {e.since}
            </div>
            <div className="my-1 text-gray-700">
              Publisher: <span className="font-bold">{e.publisher}</span>, Impact Factor: <span className="font-semibold">{e.impact}</span>
            </div>
            {e.journalImage && <img src={e.journalImage} alt={e.title + " logo"} className="w-56 h-24 object-contain mt-2 mb-4 bg-white shadow rounded" />}
          </div>
        ))}

        {/* Teaching */}
        <SectionHeading>Teaching</SectionHeading>
        {resumeData.teaching.map((dept, idx) => (
          <div key={idx} className="mb-4 ml-2">
            <h3 className="text-lg font-bold mb-2">{dept.section}</h3>
            {dept.undergraduate.length > 0 && (
              <>
                <p className="font-semibold">Undergraduate Courses:</p>
                <ul className="ml-5 mb-2 list-disc">
                  {dept.undergraduate.map((course, cid) => (
                    <li key={cid}>{course}</li>
                  ))}
                </ul>
              </>
            )}
            {dept.graduate.length > 0 && (
              <>
                <p className="font-semibold">Graduate Courses:</p>
                <ul className="ml-5 list-disc">
                  {dept.graduate.map((course, cid) => (
                    <li key={cid}>{course}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}

        {/* Patents */}
        <SectionHeading>Patents</SectionHeading>
        <ul className="mb-4 ml-4 list-disc space-y-1">
          {resumeData.patents.map((pat, i) => (
            <li key={i}>
              <span className="font-semibold">{pat.title}</span><br />
              <span className="text-gray-700">{pat.inventors}</span><br />
              Patent No: <span className="font-mono">{pat.patentNo}</span>, Status: {pat.status}
            </li>
          ))}
        </ul>

        {/* Selected Publications */}
        <SectionHeading>Selected Publications</SectionHeading>
        <div className="space-y-6">
          {resumeData.selectedPublications.map(pub => (
            <article
              key={pub.id}
              className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-1 rounded-full bg-blue-500 mt-1" aria-hidden="true" />
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">{pub.title}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {pub.authors} • {pub.venue},{" "}
                  <time dateTime={String(pub.year)}>{pub.year}</time>
                </p>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-semibold text-gray-700">DOI</span>
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                      aria-label={`Open DOI ${pub.doi}`}
                    >
                      {pub.doi}
                    </a>
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold">Publisher:</span>{" "}
                    {pub.publisher}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* You can add more sections if needed */}
      </div>
    </div>
  </div>
);

export default Resume;

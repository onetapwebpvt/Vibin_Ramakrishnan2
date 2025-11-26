import React from "react";

// Helpers
const StatusBadge = ({ status }) => {
  const map = {
    Awarded: "bg-green-100 text-green-800 border-green-200",
    Published: "bg-blue-100 text-blue-800 border-blue-200",
    Filed: "bg-yellow-100 text-yellow-800 border-yellow-200",
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

// DATA
const internationalPatents = [
  {
    title: "A device for non-invasive treatment of neurodegenerative diseases.",
    inventors:
      "Vibin Ramakrishnan, Gaurav Pandey, Harshal B. Nemade, Jahnu Saikia, Sajitha S, & Nitin Chaudhary",
    number: "WO/2019/012556",
    date: "",
    status: "Published",
  },
];

const indianPatents = [
  {
    title:
      "Generation and usage of Di-Histidine based stimulus responsive nanostructures",
    inventors: "Vibin Ramakrishnan, Sajitha S, Nitin Chaudhary & Gaurav Pandey",
    number: "243/KOL/2015",
    date: "09.03.2015",
    status: "Published",
  },
  {
    title: "Antimicrobial Peptides.",
    inventors:
      "Vibin Ramakrishnan, Prakash Kishore Hazam, Nitin Chaudhary, Vishal Trivedi and Gaurav Jerath",
    number: "333/KOL/2015",
    date: "26.03.2015",
    status: "Published",
  },
  {
    title: "Antimicrobial short peptides.",
    inventors:
      "Nitin Chaudhary, Karabi Saikia, Durga Sravani Yalavarthi and Vibin Ramakrishnan",
    number: "353/KOL/2015",
    date: "30.03.2015",
    status: "Published",
  },
  {
    title: "Magnetic hydrocarbon crystals",
    inventors:
      "Vibin Ramakrishnan, Sajitha S, Nitin Chaudhary & Gaurav Pandey",
    number: "201631011471",
    date: "31.03.2016",
    status: "Filed",
  },
  {
    title:
      "Peptide based Molecular Constructs for Tumor Homing and Cell Penetration",
    inventors: "Vibin Ramakrishnan, Ruchika Goyal and Gaurav Jerath",
    number: "TEMP/E-1/36058/2019-KOL",
    date: "23.08.2019",
    status: "Filed",
  },
  {
    title: "Peptide-based Drug Delivery Vectors",
    inventors: "Vibin Ramakrishnan and Gaurav Jerath",
    number: "TEMP/E-1/36087/2019-KOL",
    date: "23.08.2019",
    status: "Filed",
  },
  {
    title: "Peptide based modulators for amyloidogenic diseases",
    inventors: "Vibin Ramakrishnan, Gaurav Pandey and Vivek Prakash",
    number: "TEMP/E-1/36478/2019-KOL",
    date: "27.08.2019",
    status: "Filed",
  },
  {
    title:
      "Amalaki Rasayana constituents for the treatment of cardiac hypertrophy",
    inventors: "Vibin Ramakrishnan, Aparna Rai",
    number: "TEMP/E1/28937/2020-KOL",
    date: "22.06.2020",
    status: "Filed",
  },
  {
    title:
      "Repositioning of Existing Drug Molecules for Treatment of Cardiac Hypertrophy",
    inventors: "Vibin Ramakrishnan, Aparna Rai",
    number: "TEMP/E1/28939/2020-KOL",
    date: "22.06.2020",
    status: "Filed",
  },
];

// Tools/Web servers
const tools = [
  {
    id: 1,
    title: "Protein Barcode",
    description:
      "Tool for structure-based barcoding of proteins (MID IITG).",
    reference:
      "Structure Based Barcoding of Proteins — Rahul Metri, Gaurav Jerath, Govind Kailas, Nitin Gachhe, Adityabarna Pal & Vibin Ramakrishnan. Protein Science (2014) 23:117–120.",
  },
  {
    id: 2,
    title: "Basic Protein Engineering Toolkit (bPE Toolkit, MID IITG)",
    description: "Suite of six useful protein modeling tools.",
    reference:
      "bPE toolkit: Toolkit for Computational Protein Engineering — Gaurav Jerath, Prakash K. Hazam and Vibin Ramakrishnan. Systems and Synthetic Biology (2014) 8:337–341.",
  },
  {
    id: 3,
    title:
      "Geofold: Protein Unfolding Pathway prediction server (Bystroff Lab)",
    description: "Predicts protein unfolding pathways.",
    reference:
      "Vibin Ramakrishnan, Saeed Salem; Saipraveen Srinivasan, Mohammed Zaki, Suzanne Mathews, Wilfredo Colon and Christopher Bystroff. Proteins: Structure Function & Bioinformatics (2012) 80, 920-934.",
  },
  {
    id: 4,
    title: "IDEAS (Durani Lab)",
    description: "Software for protein inverse design.",
    reference:
      "Ranbhor Ranjit, Anil Kumar, Abhijit Tendulkar, Kirti Patel, Vibin Ramakrishnan*, and Susheel Durani. IDeAS: Automated Design Tool for Hetero-chiral Protein Folds. Physical Biology (2018). doi:10.1088/1478-3975/aacdc3",
  },
  {
    id: 5,
    title:
      "Time Piece model for Virtual Activity Profiling of Drug molecules (IBAB)",
    description: "Virtual activity profiling of drugs.",
    reference:
      "Aimy Sebastian, Andreas Bender and Vibin Ramakrishnan*; Virtual Activity Profiling of Bioactive Molecules by 1D Fingerprinting. Molecular Informatics (2010) 29, 773-779.",
  },
];

function PatentsPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold text-blue-900">Patents</h1>
          <p className="text-gray-600">
            Structured list of international and Indian patents with current status.
          </p>
        </header>

        {/* International Patents */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-indigo-900">International Patent</h2>
          <div className="grid grid-cols-1 gap-6">
            {internationalPatents.map((p, i) => (
              <PatentCard
                key={i}
                idx={i + 1}
                title={p.title}
                inventors={p.inventors}
                number={p.number}
                date={p.date}
                status={p.status}
              />
            ))}
          </div>
        </section>

        {/* Indian Patents */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-indigo-900">Indian Patents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {indianPatents.map((p, i) => (
              <PatentCard
                key={i}
                idx={i + 2} // continue numbering after international block
                title={p.title}
                inventors={p.inventors}
                number={p.number}
                date={p.date}
                status={p.status}
              />
            ))}
          </div>
        </section>

        {/* Computational Tools / Web Servers */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-900">Computational Tools / Web Servers</h2>
          <div className="space-y-5">
            {tools.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-lg font-bold text-gray-900">{t.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{t.description}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Reference:</span> {t.reference}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PatentsPage;

import React from "react";

// Sample research data structure - to be fetched from AdminJS backend
const researchData = [
  {
    id: 1,
    title: "Network Medicine",
    description:
      "Network medicine uses computational approaches to understand disease mechanisms and identify therapeutic targets through the analysis of molecular interaction networks. Our research focuses on developing novel algorithms for drug-target interaction mapping and multi-molecular therapeutic strategies.",
    imageUrl: "/api/images/network-medicine.jpg", // AdminJS will provide this URL
    publications: [
      {
        title:
          "Mapping drug-target interactions and synergy in multi-molecular therapeutics for pressure-overload cardiac hypertrophy",
        authors:
          "Aparna Rai, Vikas Kumar, Gaurav Jerath, C. C. Kartha & Vibin Ramakrishnan",
        journal: "npj Systems Biology and Applications",
        year: "2021",
        doi: "10.1038/s41540-021-00171-z",
      },
    ],
  },
  {
    id: 2,
    title: "Drug Delivery Vehicles",
    description:
      "Our research in drug delivery focuses on developing smart peptide-based nanostructures for targeted therapy. We explore syndiotactic peptides and stimulus-responsive materials for precise drug delivery to tumor sites and disease-affected areas.",
    imageUrl: "/api/images/drug-delivery.jpg",
    publications: [
      {
        title:
          "Delivery of Small Molecules by Syndiotactic Peptides for Breast Cancer Therapy",
        authors:
          "Gaurav Jerath, Pramod Darvin, Yvonne Christian, Vishal Trivedi, T. R. Santhosh Kumar and Vibin Ramakrishnan",
        journal: "Molecular Pharmaceutics",
        year: "2022",
        doi: "acs.molpharmaceut.2c00238",
      },
      {
        title: "Syndiotactic Peptides for Targeted Delivery",
        authors:
          "Gaurav Jerath, Ruchika Goyal, Vishal Trivedi T.R. Santhoshkumar and Vibin Ramakrishnan",
        journal: "Acta Biomaterialia",
        year: "2019",
        doi: "10.1016/j.actbio.2019.01.036",
      },
      {
        title:
          "Geometry Encoded Functional Programming of Tumor Homing Peptides for Targeted Drug Delivery",
        authors:
          "Ruchika Goyal, Gaurav Jerath, Akhil R., Aneesh Chandrasekharan, Eswara Rao Puppala, Srikanth Ponneganti, Anupam Sarma, V.G.M. Naidu, T. R. Santhoshkumar, and Vibin Ramakrishnanan",
        journal: "Journal of Controlled Release",
        year: "2021",
        doi: "10.1016/j.jconrel.2021.03.0101",
      },
    ],
  },
  {
    id: 3,
    title: "Bio-nano Catalysis",
    description:
      "Bio-nano catalysis combines biological systems with nanotechnology to create efficient catalytic materials. Our work explores anisotropic ferromagnetic organic nanostructures and their applications in various biomedical and industrial processes.",
    imageUrl: "/api/images/bio-nano.jpg",
    publications: [
      {
        title: "Anisotropic Ferromagnetic Organic Nanoflowers",
        authors:
          "Sajitha Sasidharan, Sayandeep Ghosh, Rishi Sreedhar, Kalpana Kumari, Subhash Thota, and Vibin Ramakrishnanan",
        journal: "Journal of Physical Chemistry C",
        year: "2022",
        doi: "10.1021/acs.jpcc.2c01462",
      },
    ],
  },
  {
    id: 4,
    title: "Computational Biology",
    description:
      "Our computational biology research encompasses protein engineering, structure-based analysis, and the development of web-based tools for molecular modeling. We create accessible platforms for researchers to perform complex protein analysis and drug design studies.",
    imageUrl: "/api/images/computational-bio.jpg",
    publications: [
      {
        title:
          "Electric Field Disrupts Amyloid Aggregation; Potential Non-invasive Therapy for Alzheimer's Disease",
        authors:
          "Jahnu Saikia, Gaurav Pandey, Sajitha Sasidharan, Ferrin Antony, Harshal B. Nemade, Sachin Kumar, Nitin Chaudhary, and Vibin Ramakrishnan",
        journal: "ACS Chemical Neuroscience",
        year: "2019",
        doi: "10.1021/acschemneuro.8b00490",
      },
    ],
  },
];

const ResearchCard = ({ research, index }) => {
  const isImageLeft = index % 2 === 0;

  return (
    <div className="mb-20">
      <div
        className={`flex flex-col ${
          isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-8 items-center`}
      >
        <div className="w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img
              src={research.imageUrl}
              alt={research.title}
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {research.title}
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {research.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-emerald-600 pb-2 inline-block">
              Publications
            </h3>
            <ul className="space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
              {research.publications.map((pub, pubIndex) => (
                <li
                  key={pubIndex}
                  className="bg-gray-50 p-4 rounded-lg border-l-4 border-emerald-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {pub.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">{pub.authors}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">{pub.journal}</span> (
                    {pub.year}) • DOI: {pub.doi}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function Outreach() {
  return (
    <div className="min-w-full bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {researchData.map((research, index) => (
          <ResearchCard key={research.id} research={research} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Outreach;

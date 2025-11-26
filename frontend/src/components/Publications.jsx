import React from "react";

const publications = [
  {
    id: 1,
    title:
      "Structural Aggregation Modelling of Peptide-based Drug Delivery Vectors for the Treatment of Triple Negative Breast Cancer",
    authors:
      "Christian, Arun Sainath Reddy, Neesari Sharma, Shine Varghese Jerry, Aneesh Chandrasekharan, P. R. Santhoshkumar and Vithin Komalanandhan",
    venue: "Drug Delivery and Translational Research",
    year: 2024,
    doi: "10.1007/s13346-024-00444-y",
    publisher: "Springer",
  },
  {
    id: 2,
    title:
      "Delivery of Small Molecules by Cyclization Peptides for Breast Cancer Therapy",
    authors:
      "Jainani, Pamela Garred, Christian, Vimal Christian, Vishal Trivedi, P. R. Santhosh Kumar and Vithin Komalanandhan",
    venue: "Molecular Pharmaceutics",
    year: 2023,
    doi: "10.1021/acs.molpharmaceut.2c00928",
    publisher: "American Chemical Society",
  },
  {
    id: 3,
    title: "Anisotropic Ferromagnetic Organic Nanoflowers",
    authors:
      "Sachidanan, Jagadeeswar Ghosh, Nidhi Shekhar, Kalpana Yadav, Subbarao Thota, and Vithin Komalanandhan",
    venue: "Journal of Physical Chemistry C",
    year: 2023,
    doi: "10.1021/acs.jpcc.2c07421",
    publisher: "American Chemical Society",
  },
  {
    id: 4,
    title:
      "Geometry Decoupled Functional Programming of Minor Tuning Peptides for Targeted Drug Delivery",
    authors:
      "Christian, Vijay Kumar, Keerthi, Aneesh Chandrasekharan, Somnath Bala Pimpale, Rikirthi Somangali, Anupam Goswami, M. G. M. Reddy, P. R. Santhoshkumar, and Vithin Komalanandhan",
    venue: "Journal of Controlled Release",
    year: 2023,
    doi: "10.1016/j.jconrel.2023.10.030",
    publisher: "Elsevier",
  },
  {
    id: 5,
    title:
      "Mapping drug-target interactions and synergy in molecular therapeutics for pressure-overload cardiac hypertrophy",
    authors:
      "Agarwal, Vijay Kumar, Keerthi, C. C. Kartha and Vithin Komalanandhan",
    venue: "npj Systems Biology and Applications",
    year: 2023,
    doi: "10.1038/s41540-023-00271-9",
    publisher: "Nature (npj)",
  },
  {
    id: 6,
    title:
      "Molecular hybridization combining minor tuning and targeting peptide libraries for cellular targeting",
    authors:
      "Christian, Vijay Kumar, Keerthi, Aneesh Chandrasekharan, Vimal Christian, P. R. Santhoshkumar, and Vithin Komalanandhan",
    venue: "Drug Delivery and Translational Research",
    year: 2023,
    doi: "10.1007/s13346-023-00205-z",
    publisher: "Springer",
  },
  {
    id: 7,
    title:
      "Electric Field Disrupted Amyloid Aggregation: Potential Non-Invasive Therapy for Alzheimer’s Disease",
    authors:
      "Jahnavi Sailaja, Gauren Pandey, Sainath Saikrishnan, Ferrin Antony, Menaldi, V. Narasimha, Sachin Kumar, Nitin Chaudhary and Vithin Komalanandhan",
    venue: "ACS Chemical Neuroscience",
    year: 2023,
    doi: "10.1021/acschemneuro.3c00490",
    publisher: "American Chemical Society",
  },
  {
    id: 8,
    title: "Delivery of Minor Tuning Peptides for Targeted Drug Delivery",
    authors:
      "Jainani, Pamela Garred, Vimal Christian, Vishal Trivedi and Vithin Komalanandhan",
    venue: "Acta Biomaterialia",
    year: 2023,
    doi: "10.1016/j.actbio.2023.01.056",
    publisher: "Elsevier",
  },
  {
    id: 9,
    title: "Structure-based Screening of Protests",
    authors:
      "Rahul Mehra, Gauren Pandey, Govind Gauri, Abhirama Pol and Vithin Komalanandhan",
    venue: "Proteins: Structure Function and Bioinformatics",
    year: 2023,
    doi: "10.1002/prot.26528",
    publisher: "Wiley",
  },
  {
    id: 10,
    title: "Developing a detailed mechanistic model for protein unfolding",
    authors:
      "Vithin Komalanandhan, Suresh Salkar, Sagnipersa Srinivasan, Mohammed Lal, Susanne Matthes, Wilfred Oloo and Christopher Bozym",
    venue: "Proteins: Structure Function and Bioinformatics",
    year: 2021,
    doi: "10.1002/prot.26094",
    publisher: "Wiley",
  },
  {
    id: 11,
    title:
      "Folded or Unfolded: Unraveling the Role of an Unfolded Marine Peptide Detected by Molecular Dynamics",
    authors: "Vithin Komalanandhan, Rajiv Kandhloor and Suneeti Dhavane",
    venue: "Journal of the American Chemical Society",
    year: 2021,
    doi: "10.1021/jacs.0c13233",
    publisher: "American Chemical Society",
  },
];

function Publications() {
  return (
    <section className="space-y-4 mb-10">
       <div>
    <h2 className="text-4xl font-bold text-gray-900">Publications</h2>
  </div>

      <div className="space-y-6">
        {publications.map((pub) => (
          <article
            key={pub.id}
            className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 h-full"
          >
            {/* Accent */}
            <div
              className="w-1 rounded-full bg-blue-500 mt-1"
              aria-hidden="true"
            />

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">
                {pub.title}
              </h3>

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
    </section>
  );
}

export default Publications;

import React from "react";

// Publications data (as given)
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

const books = [
  {
    id: 1,
    type: "Book",
    title: "De Novo Peptide Design: Principles and Applications",
    authors: "Vibin Ramakrishnan, Kirti Patel & Ruchika Goyal",
    isbn: "9780323999175",
    publisher: "Elsevier, UK",
    year: "2023",
    links: [
      { label: "Elsevier", url: "https://www.elsevier.com/books/de-novo-peptide-design/ramakrishnan/978-0-323-99917-5" },
      { label: "Amazon", url: "https://www.amazon.com/Novo-Peptide-Design-Principles-Applications/dp/0323999174" },
    ]
  },
  {
    id: 2,
    type: "Book",
    title: "Biophysical Characterization of Functional Peptides",
    authors: "Vibin Ramakrishnan",
    isbn: "978-1-0716-3404-2",
    publisher: "Springer Nature, USA",
    year: "",
    links: []
  }
];

const bookChapters = [
  {
    id: 1,
    ref: 1,
    title: "Peptide-Based Drug Delivery Systems",
    authors: "Ruchika Goyal & Vibin Ramakrishnan",
    book: "Characterization and Biology of Nanomaterials for Drug Delivery",
    publisher: "Elsevier",
    year: 2018,
    isbn: "978-0-12-814031-4",
    doi: ""
  },
  {
    id: 2,
    ref: 2,
    title: "Computational Biology Applications",
    authors: "Aimy Sebastian & Vibin Ramakrishnan",
    book: "Nutri Horti-culture. Ed. K. V. Peter. DPH New Delhi.",
    publisher: "NIPA",
    year: 2012,
    isbn: "",
    doi: ""
  },
  {
    id: 3,
    ref: 3,
    title: "Modeling and Simulation of peptides",
    authors: "Amay Redkar and Vibin Ramakrishnan",
    book: "De novo peptide design: Principles and Applications, Academic Press",
    publisher: "Elsevier",
    year: "",
    isbn: "9780323999175",
    doi: "10.1016/B978-0-323-99917-5.00009-3"
  },
  {
    id: 4,
    ref: 4,
    title: "Peptide Nanocatalysts",
    authors: "Jahnu Saikia and Vibin Ramakrishnan",
    book: "De novo peptide design: Principles and Applications, Academic Press",
    publisher: "Elsevier",
    year: "",
    isbn: "9780323999175",
    doi: "10.1016/B978-0-323-99917-5.00006-8"
  },
  {
    id: 5,
    ref: 5,
    title: "Peptide based antibiotics",
    authors: "Ruchika Goyal and Vibin Ramakrishnan",
    book: "De novo peptide design: Principles and Applications, Academic Press",
    publisher: "Elsevier",
    year: "",
    isbn: "9780323999175",
    doi: "10.1016/B978-0-323-99917-5.00006-4"
  },
  {
    id: 6,
    ref: 6,
    title: "Bioinspired functional molecular constructs",
    authors: "Vivek Prakash and Vibin Ramakrishnan",
    book: "De novo peptide design: Principles and Applications, Academic Press",
    publisher: "Elsevier",
    year: "",
    isbn: "9780323999175",
    doi: "10.1016/B978-0-323-99917-5.00006-2"
  }
];

function PublicationsSection() {
  return (
    <section className="space-y-8 mb-12">
      <div>
        <h2 className="text-4xl font-bold text-blue-900">Publications</h2>
      </div>
      <div className="space-y-6">
        {publications.map(pub => (
          <article
            key={pub.id}
            className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-6 shadow hover:shadow-lg transition-shadow duration-200"
          >
            <div className="w-1 rounded-full bg-blue-500 mt-1" aria-hidden="true" />
            <div className="flex-1 flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 leading-tight">
                {pub.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {pub.authors} • {pub.venue}, <time dateTime={String(pub.year)}>{pub.year}</time>
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

function BookCard({ book, refNumber }) {
  return (
    <div className="relative flex flex-col items-start gap-2 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl border-2 border-indigo-200 shadow-lg p-6 w-full max-w-lg mx-auto h-full">
      {/* Reference number in corner if provided */}
      {refNumber && (
        <span className="absolute top-2 right-3 text-lg font-bold text-indigo-400 opacity-70">[{refNumber}]</span>
      )}
      <h3 className="text-xl font-bold text-indigo-800 mb-1">{book.title}</h3>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Authors:</span> {book.authors}
      </p>
      {book.book && (
        <p className="text-sm text-blue-900 italic mb-1">{book.book}</p>
      )}
      <div className="flex flex-wrap gap-3 text-sm mt-2 items-center">
        {book.isbn && (
          <span className="text-gray-700 font-medium">ISBN: <span className="font-mono">{book.isbn}</span></span>
        )}
        {book.doi && (
          <span>
            DOI:{" "}
            <a href={`https://doi.org/${book.doi}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{book.doi}</a>
          </span>
        )}
        <span className="font-bold text-indigo-700">{book.publisher}</span>
        {book.year && <span className="text-gray-600">{book.year}</span>}
      </div>
      {/* Links if any */}
      {!!book.links && book.links.length > 0 && (
        <div className="flex gap-4 mt-2 flex-wrap">
          {book.links.map((lk, i) => (
            <a
              key={i}
              href={lk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-semibold underline hover:text-indigo-900"
            >
              {lk.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Books & Chapters Section
function BooksSection() {
  return (
    <section className="space-y-10">
      <h2 className="text-4xl font-bold text-indigo-900 mb-2">Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
        {books.map((book, idx) => (
          <BookCard key={book.id} book={book} refNumber={idx + 1} />
        ))}
      </div>
      <h2 className="text-3xl font-bold text-blue-900 mb-2 mt-12">Book Chapters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {bookChapters.map(chap => (
          <BookCard
            key={chap.id}
            book={chap}
            refNumber={chap.ref}
          />
        ))}
      </div>
    </section>
  );
}

function PublicationsPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <PublicationsSection />
        <BooksSection books={books} />
      </div>
    </div>
  );
}

export default PublicationsPage;

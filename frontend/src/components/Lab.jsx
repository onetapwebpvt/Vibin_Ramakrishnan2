import React, { useState, useEffect } from "react";
import ProjectCard from "./Lab/ProjectCard";
import StudentCard from "./Lab/StudentCard";

// Example carousel images
const projectImages = [
  "https://fac.iitg.ac.in/vibin/img/dfb50b90491749a491845044b29baad9.jpeg",
  "https://fac.iitg.ac.in/vibin/img/f55f590936d7618ed6f995c022ea9ef6.jpg",
  "https://fac.iitg.ac.in/vibin/img/d566be3d113bb7a0f0ed023d81d0db01.jpg",
  "https://fac.iitg.ac.in/vibin/img/1685c073cb852f912b9ce2e0dc09b194.jpg",
];

// Principal investigator data
const piProfile = {
  name: "Dr. Vibin Ramakrishnan",
  title: "Principal Investigator",
  photo: "https://www.iitg.ac.in/biotech/faculty/efcea3e7cb01341e611b1bb3337c0c91.jpg",
  description: "Professor, Department of Biosciences & Bioengineering, IIT Guwahati. Vibin leads the Molecular Interactions & Design Laboratory, focusing on network medicine, drug delivery, bio-nanotechnology, and the mentoring of a vibrant team of young researchers.",
  contact: {
    email: "vibin@iitg.ac.in",
    url: "https://fac.iitg.ac.in/vibin/"
  }
};

const projects = [
  {
    title: "Mapping Drug-Target Interactions and Synergy in Traditional Multimolecular Immunomodulators",
    objective: "Mapping drug target interactions of multi-molecular drug formulations.",
    keywords: ["Network Medicine", "Computational Biology", "Biochemical Informatics", "Systems Biology"],
    image: "/images/project1.jpg"
  },
  {
    title: "Design of peptide-based stimulus responsive nano-catalyst",
    objective: "Design, synthesize and characterize peptide based nano-materials for catalysis.",
    keywords: ["Biophysics", "Bio-nanotechnology", "Bio-organic chemistry"],
    image: "/images/project2.jpg"
  },
  {
    title: "Design of peptide-based drug delivery vehicles against resistant cancer",
    objective: "Design and functional characterization of drug delivery vehicles using in vitro and in vivo methods.",
    keywords: ["Biophysics", "Bio-nanotechnology", "Cancer therapy"],
    image: "/images/project3.jpg"
  }
];

const currentPhdStudents = [
  { name: "Yvonne Christian", title: "Senior Research Fellow", field: "Drug delivery vehicles",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Kalpana Kumari", title: "Prime Ministers Research Fellow", field: "Bio-nano catalysis",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Amay Sanjay Redkar", title: "Prime Ministers Research Fellow", field: "Network Medicine",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Mouli Sarkar", title: "Senior Research Fellow", field: "Network Medicine",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Naveen Kumar", title: "Prime Ministers Research Fellow", field: "Network Medicine",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Dikshita Hazarika", title: "Junior Research Fellow", field: "Drug delivery vehicles",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Kunal Das", title: "Junior Research Fellow", field: "Bionanotechnology, Bio-nano catalysis",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Sushmita Sen", title: "", field: "Network Medicine",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
];

const graduatedPhdStudents = [
  { name: "Prakash Kishore Hazam", field: "Peptide Antibiotics", presentPosition: "Academia Sinica Post Doctoral Fellow at Academia Sinica, Taiwan",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Arnish Chakaborty", field: "Infectious Diseases", presentPosition: "Co-Supervisor", note: "(Co-Supervisor)",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Gaurav Jerath", field: "Drug delivery vehicles", presentPosition: "Assistant Professor, Gujarat Biotech University, Gandhinagar & MD, Pepthera Laboratories Pvt. Ltd.",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Sajitha Sasidharan", field: "Functional Bio-nano assemblies", presentPosition: "oLife Post Doctoral Fellow, University of Groningen, Netherlands",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Gaurav Pandey", field: "Protein aggregation therapeutics", presentPosition: "Post Doctoral Fellow, SCRIPPS Research Institute, San Diego, CA, USA",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Debika Datta", field: "Protein Biophysics", presentPosition: "Post Doctoral Fellow, University of California at San Diego, CA, USA", note: "(Co-Supervisor)",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Ruchika Goyal", field: "Drug delivery vehicles", presentPosition: "Marie Curie Post Doctoral Fellow, University of Strathclyde, Glasgow, UK",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Sooram Banesh", field: "Biochemistry, Infectious Diseases", presentPosition: "Post Doctoral Fellow, University of California at San Diego, CA, USA", note: "(Co-Supervisor)",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Jahnu Saikia", field: "Functional Bio-nano assemblies", presentPosition: "Post Doctoral Fellow, Vanderbilt University, USA",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
  { name: "Vivek Prakash", field: "Functional Bio-nano assemblies", presentPosition: "Post Doctoral Fellow, Case Western Reserve University, Cleveland, Ohio, USA",photo:"https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" },
];

const mtechStudents = [
  { name: "Amit Verma", branch: "Biotechnology" },
  { name: "Sneha Reddy", branch: "Bioinformatics" },
  // ...add more as needed
];

const btechStudents = [
  { name: "Rahul Sharma", branch: "Biotechnology" },
  { name: "Priya Sinha", branch: "Biosciences" },
  // ...add more as needed
];


function SimpleStudentCard({ student }) {
  return (
    <div className="w-64 h-32 flex flex-col items-center justify-center bg-blue-50 rounded-xl shadow border-2 border-blue-200">
      <h3 className="text-lg font-bold text-blue-900">{student.name}</h3>
      <p className="text-md text-blue-700">{student.branch}</p>
    </div>
  );
}


function SimpleCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const size = images.length;

  const goNext = () => setCurrent((current + 1) % size);
  const goPrev = () => setCurrent((current - 1 + size) % size);

  // Auto-rotate every 4 seconds (interval set up once)
  useEffect(() => {
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [size]);

  return (
    <div className="w-full relative">
      <div className="flex items-center justify-center relative">
        <button
          onClick={goPrev}
          aria-label="Previous"
          className="text-gray-600 hover:text-blue-600 p-2 rounded-full bg-white shadow-md absolute left-2 z-10 top-1/2 -translate-y-1/2"
        >
          <svg width={28} height={28} fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 19l-7-7 7-7" /></svg>
        </button>
        <div className="mx-auto w-[31rem] md:w-[38rem] h-[23rem] md:h-[27rem] rounded-2xl overflow-hidden flex items-center bg-white shadow border border-blue-200 relative">
          <img
            key={current}
            src={images[current]}
            alt={`Carousel image ${current + 1}`}
            className="object-contain w-full h-full animate-fadeIn"
          />
        </div>
        <button
          onClick={goNext}
          aria-label="Next"
          className="text-gray-600 hover:text-blue-600 p-2 rounded-full bg-white shadow-md absolute right-2 z-10 top-1/2 -translate-y-1/2"
        >
          <svg width={28} height={28} fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="flex justify-center mt-3 space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border transition-all duration-300 ${current === idx ? "bg-blue-500 border-blue-500 scale-125" : "bg-gray-200 border-gray-300"}`}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
}

const PISection = ({ pi, images }) => (
  <section className="flex flex-col md:flex-row py-16 gap-10 items-center">
    {/* PI Profile */}
    <div className="flex flex-col items-center md:items-start w-full md:w-1/2 space-y-4">
      <img
        src={pi.photo}
        alt={pi.name}
        className="w-36 h-36 rounded-full border-4 border-purple-200 shadow-lg object-cover"
      />
      <h2 className="text-3xl font-bold text-indigo-900">{pi.name}</h2>
      <p className="font-semibold text-lg text-blue-700">{pi.title}</p>
      <p className="text-gray-700">{pi.description}</p>
      <div className="flex gap-5 text-blue-800 mt-2">
        <a href={`mailto:${pi.contact.email}`} className="hover:underline">{pi.contact.email}</a>
        <span>•</span>
        <a href={pi.contact.url} className="hover:underline" target="_blank" rel="noopener noreferrer">Profile</a>
      </div>
    </div>
    {/* Carousel */}
    <div className="w-full md:w-1/2 flex items-center justify-center py-6">
      <SimpleCarousel images={images} />
    </div>
  </section>
);

const ProjectSection = ({ projects }) => (
  <div className="space-y-20">
    {projects.map((project, index) => {
      const isImageLeft = index % 2 === 0;
      return (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${isImageLeft ? "" : "md:flex-row-reverse"} gap-10 items-center`}
        >
          <div className="w-full md:w-1/2">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-72 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h3 className="text-2xl font-bold text-blue-900">{project.title}</h3>
            <p className="text-gray-700 text-lg">{project.objective}</p>
            <div className="flex gap-2 flex-wrap">
              {project.keywords.map((kw, ki) => (
                <span key={ki} className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold">{kw}</span>
              ))}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

function PhdStudentCard({ student }) {
  return (
    <div className="w-72 h-80 rounded-3xl overflow-hidden shadow-xl relative flex items-end border-4 border-blue-200 bg-slate-200">
      {/* Full background image */}
      <img
        src={student.photo || "/images/students/placeholder.jpg"}
        alt={student.name}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      {/* Overlay text at the bottom */}
      <div className="w-full z-10 p-5 pb-6 bg-gradient-to-t from-blue-600/90 via-blue-400/60 to-blue-300/10">
        <h3 className="text-2xl font-bold text-white mb-1 drop-shadow">{student.name}</h3>
        {student.title && (
          <p className="text-md font-semibold text-white mb-0.5 drop-shadow">{student.title}</p>
        )}
        {student.field && (
          <p className="text-white/90">{student.field}</p>
        )}
        {student.presentPosition && (
          <p className="text-white/80 mt-2 text-sm">{student.presentPosition}</p>
        )}
      </div>
    </div>
  );
}



function SectionHeader({ title, subtitle, accentColor }) {
  const accent = accentColor === "blue"
    ? "text-blue-700"
    : accentColor === "purple"
      ? "text-purple-700"
      : "text-gray-800";
  return (
    <div className="mb-10">
      <h2 className={`text-3xl md:text-4xl font-bold ${accent}`}>{title}</h2>
      {subtitle && <p className="text-lg text-gray-600 mt-2">{subtitle}</p>}
    </div>
  );
}

function Lab() {
  return (
    <div className="min-w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-20 px-8">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border border-white/20">
            MID Lab @ IIT Guwahati
          </div>
          <h1 className="text-6xl font-bold mb-4 leading-tight">
            Molecular Interactions & Design Laboratory
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
            Pioneering research in network medicine, drug delivery systems, and bio-nanotechnology to advance healthcare and therapeutic solutions.
          </p>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        {/* PI + Carousel section */}
        <PISection pi={piProfile} images={projectImages} />
        {/* Projects Section */}
        <section className="mb-20">
          <SectionHeader
            title="Research Projects"
            subtitle="Cutting-edge research initiatives driving innovation in molecular medicine"
            accentColor="blue"
          />
          <ProjectSection projects={projects} />
        </section>
        {/* PhD Students */}
        <section>
          <div className="mb-8">
            <SectionHeader
              title="PhD Students"
              subtitle="Meet our researchers"
              accentColor="purple"
            />
          </div>
          {/* Current PhD Students */}
          <div className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {currentPhdStudents.map((student, idx) => (
    <PhdStudentCard student={student} key={idx} />
  ))}
</div>

          </div>
          {/* Graduated PhD Students */}
          <div className="mb-12">
            <SectionHeader
              title="Alumni"
              subtitle="Meet our accomplished alumni"
              accentColor="purple"
            />
          </div>
          <div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {graduatedPhdStudents.map((student, idx) => (
    <PhdStudentCard student={student} key={idx} />
  ))}
</div>

          </div>

          {/* MTech Students */}
<div className="mt-12 mb-12">
  <h3 className="text-2xl font-bold text-blue-800 mb-6">MTech Students</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
    {mtechStudents.map((student, idx) => (
      <SimpleStudentCard student={student} key={idx} />
    ))}
  </div>
</div>

{/* BTech Students */}
<div className="mb-12">
  <h3 className="text-2xl font-bold text-blue-800 mb-6">BTech Students</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
    {btechStudents.map((student, idx) => (
      <SimpleStudentCard student={student} key={idx} />
    ))}
  </div>
</div>

        </section>
      </div>
    </div>
  );
}

export default Lab;

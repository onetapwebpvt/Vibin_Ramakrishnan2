import React from "react";
import SubHero from "./SubHero";
import profileImage from "../assets/profile.jpg";

function Hero() {
  return (
    <div className="min-w-full bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      <div className="w-full flex items-center justify-center py-20 px-8">
        <div className="w-84 h-84 rounded-full overflow-hidden shadow-2xl ring-4 ring-gray-100 ring-offset-4 ring-offset-slate-200">
          <img
            src={profileImage}
            alt="Vibin Ramakrishnan"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text pl-20 max-w-2xl">
          <h1 className="font-bold text-5xl pb-6 text-transparent bg-gradient-to-r from-gray-800 to-slate-900 bg-clip-text">
            Vibin Ramakrishnan
          </h1>
          <div className="py-3 flex items-stretch gap-4 mb-4">
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide self-center">
              Professor
            </p>
            <div className="w-px bg-slate-400 self-stretch"></div>
            <div className="flex flex-col gap-1">
              <h3 className="text-md font-semibold text-gray-800">
                Biosciences & Bioengineering
              </h3>
              <h3 className="text-md font-semibold text-gray-800">
                Mehta Family School of Data Science & Artificial Intelligence
              </h3>
              <h3 className="text-md font-semibold text-gray-800">
                Example Title
              </h3>
            </div>
          </div>

          <div className="py-3 space-y-1">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Office:</span> 104,
              N Block, BSBE
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Email:</span>{" "}
              <a
                href="mailto:vibin@iitg.ac.in"
                className="text-slate-700 hover:text-slate-900 hover:underline"
              >
                vibin@iitg.ac.in
              </a>
            </p>
          </div>
          <div className="py-3 space-y-1">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Phone:</span> +91
              361 258 2227
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Fax:</span> +91 361
              258 2249
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">URL:</span>{" "}
              <a
                href="https://fac.iitg.ac.in/vibin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-slate-900 hover:underline"
              >
                fac.iitg.ac.in/vibin/
              </a>
            </p>
          </div>
          <div className="py-3 bg-gradient-to-r from-slate-100 to-gray-100 rounded-lg px-4 border border-slate-200">
            <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
              Research Areas
            </p>
            <p className="text-gray-700 leading-relaxed">
              Network Medicine, Drug Delivery Vehicles, Computational Biology,
              Peptide Materials
            </p>
          </div>
        </div>
      </div>

      <SubHero />
    </div>
  );
}

export default Hero;
  
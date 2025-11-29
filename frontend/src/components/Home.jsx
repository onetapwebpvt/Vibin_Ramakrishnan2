import React from "react";
import Hero from "./Hero";
import About from "./About";
import Publications from "./Publications";
import News from "./News";

function Home() {
  return (
    <div>
      <Hero />
      <About />
      <div className="min-w-full mx-auto px-20 py-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Publications />
        <News />
      </div>
    </div>
  );
}

export default Home;

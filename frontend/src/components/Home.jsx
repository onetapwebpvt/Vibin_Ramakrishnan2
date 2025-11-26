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
      <div className="max-w-350 mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Publications />
        <News />
      </div>
    </div>
  );
}

export default Home;

import Hero from "./components/Hero";
import { useState, useEffect } from "react";
import Portfolio from "./components/Portfolio";

function App() {
  const [atHero, setAtHero] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-[#151515] text-[#f4f2f0]">
      <Hero />
      <Portfolio />
    </div>
  );
}

export default App;

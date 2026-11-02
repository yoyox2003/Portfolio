import Content from "./components/Content";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-[#151515] text-[#f4f2f0]">
      <Hero />
      <div className="min-[801px]:flex min-[801px]:items-start">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

export default App;

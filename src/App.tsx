import Content from "./components/Content";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-[#151515] text-[#f4f2f0]">
      <Sidebar />
      <Content />
    </div>
  );
}

export default App;

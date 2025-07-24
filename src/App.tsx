import Header from "./components/dashboard/Header";
import MainContent from "./components/dashboard/MainContent";
import Sidebar from "./components/dashboard/Sidebar";

const App = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default App;

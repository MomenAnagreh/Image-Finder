import "./App.css";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import HistoryPage from "./components/HistoryPage";
import Search from "./components/Search";
import Results from "./components/ResultsPage";

function App() {
  return (
    <div className="App" style={{ flex: 1 }}>
      <TopBar />
      <header className="App-header" style={{ backgroundColor: "white" }}>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="history" element={<HistoryPage />} />
        </Routes>
      </header>
    </div>
  );
}
export default App;

import "./App.css";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import HistoryPage from "./components/HistoryPage";

function App() {
  return (
    <div className="App" style={{ flex: 1 }}>
      <header className="App-header" style={{ backgroundColor: "white" }}>
        <TopBar />
        <Routes>
          <Route path="/" element={<div style={{color: 'black'}}>home </div>} />
          <Route path="history" element={<HistoryPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

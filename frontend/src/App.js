import "./App.css";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import HistoryPage from "./components/HistoryPage";
import Search from "./components/Search";

function App() {
  return (
    <div className="App" style={{ flex: 1 }}>
      <TopBar />
      <header className="App-header" style={{ backgroundColor: "white" }}>
        <Routes>
          <Route path="/" element={Search()} />
          <Route path="history" element={<HistoryPage />} />
        </Routes>
      </header>
      <footer>
        <p>Copyright &copy; 2021 The Image finder</p>
      </footer>
    </div>
  );
}
export default App;

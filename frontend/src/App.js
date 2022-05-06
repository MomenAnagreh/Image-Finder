import "./App.css";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import HistoryPage from "./components/HistoryPage";
import Search from "./components/Search";
import Results from "./components/ResultsPage";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App({ signOut }) {
  return (
    <div className="App" style={{ flex: 1 }}>
      <TopBar signOut={signOut} />
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
export default withAuthenticator(App);

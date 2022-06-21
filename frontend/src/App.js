import "./App.css";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import HistoryPage from "./components/HistoryPage";
import Search from "./components/Search";
import Results from "./components/ResultsPage";
import { Users } from "./components/Users";
import { Amplify, Auth } from "aws-amplify";
import { Authenticator, Flex } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import { createUserApi } from "./api";
Amplify.configure(awsExports);

function App({ signOut }) {
  const services = {
    async handleSignUp(formData) {
      let { username, password, attributes } = formData;
      createUserApi(username);
      return Auth.signUp({
        username,
        password,
        attributes,
      });
    },
  };

  return (
    <Flex
      style={{
        border: "none",
        backgroundColor: "white",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(#1c92d2, #f2fcfe)",
      }}
    >
      <Authenticator
        services={services}
        socialProviders={["amazon", "apple", "facebook", "google"]}
      >
        <div className="App" style={{ flex: 1, backgroundColor: "white" }}>
          <TopBar signOut={signOut} />
          <header className="App-header" style={{ backgroundColor: "white" }}>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/results" element={<Results />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </header>
        </div>
      </Authenticator>
    </Flex>
  );
}
export default App;

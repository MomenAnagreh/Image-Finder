import { Authenticator, Flex, Grid } from "@aws-amplify/ui-react";
import { createUserApi } from "../api";
import { Auth } from "aws-amplify";
import TopBar from "./TopBar";
import { Routes, Route } from "react-router-dom";
import HistoryPage from "./HistoryPage";
import Search from "./Search";
import Results from "./ResultsPage";
import { Users } from "./Users";

export default function Login() {
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
    <Grid templateColumns={{ base: "1fr 0", medium: "1fr 1fr" }}>
      <Flex backgroundColor="blue" justifyContent="center">
        <Authenticator services={services}>
          {({ signOut, user }) => (
            <div className="App" style={{ flex: 1 }}>
              <TopBar signOut={signOut} />
              <header
                className="App-header"
                style={{ backgroundColor: "white" }}
              >
                <Routes>
                  <Route path="/" element={<Search />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="history" element={<HistoryPage />} />
                  <Route path="/users" element={<Users />} />
                </Routes>
              </header>
            </div>
          )}
        </Authenticator>
      </Flex>
    </Grid>
  );
}

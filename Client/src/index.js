import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ProjectProvider } from "./context/ProjectContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <ProjectProvider>
        <App />
      </ProjectProvider>
    </ChakraProvider>
  </BrowserRouter>
);

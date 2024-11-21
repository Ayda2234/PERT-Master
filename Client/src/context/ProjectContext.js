import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectsContext, setProjectsContext] = useState([]);
  return (
    <ProjectContext.Provider value={{ projectsContext, setProjectsContext }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  return useContext(ProjectContext);
};

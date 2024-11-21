import React from "react";
import { Routes, Route } from "react-router-dom";
import Project from "./pages/Project";
import Login from "./pages/login/index";
import SignUP from "./pages/register/index";
import "./App.css";
import GanttView from "./pages/GanttView";
import Home from "./pages/Home/index";
import ProfilePage from "./pages/ProfilePage.js";
import TasksPage from "./pages/tasks/index.js";
import Pert from "./Components/charts/pert/pert.js";
import { tasksTest } from "./Components/charts/pert/data.js";
import { useProject } from "./context/ProjectContext.js";

export default function App() {
  const { projectsContext } = useProject();

  function replaceParentIdsWithNames(tasks) {
    const taskMap = new Map(
      tasks.map((task) => [task._id.$oid, task.task_name])
    );

    return tasks.map((task) => {
      const parentNames = task.parent.map((parentId) =>
        taskMap.get(parentId.$oid)
      );
      return { ...task, parent: parentNames };
    });
  }

  const tasksWithNames = replaceParentIdsWithNames(tasksTest);
  // const tasksWithNames2 = replaceParentIdsWithNames(projectsContext.tasks);
  console.log("projectspert", projectsContext.tasks);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Project />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUP />} />
      <Route path="/graph/:projectId" element={<GanttView />} />
      <Route path="/tasks/:projectId" element={<TasksPage />} />
      <Route
        path="/pert/:projectId"
        element={<Pert tasks={tasksWithNames} />}
      />
    </Routes>
  );
}

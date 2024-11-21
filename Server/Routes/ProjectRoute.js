const { Router } = require("express");
const {
  addProject,
  fetchProjects,
  updateProject,
  deleteProject,
  addTaskToProject,
  removeTaskFromProject,
  editTaskInProject,
  fetchSingleProject,
  fetchTaskById,
  assignParentToTask,
} = require("../Controllers/ProjectController");
const { protect } = require("../Middleware/authMiddleware");

const routes = new Router();

// Add routes
routes.post("/", protect, addProject);
routes.put("/add", protect, addTaskToProject);
routes.put("/delete", protect, removeTaskFromProject);
routes.put("/edit", protect, editTaskInProject);
routes.get("/", protect, fetchProjects);
routes.get("/:id", protect, fetchSingleProject);
routes.put("/:id", protect, updateProject);
routes.delete("/:id", protect, deleteProject);
routes.get("/:projectId/tasks/:taskId", protect, fetchTaskById);
routes.post("/assign", assignParentToTask);

module.exports = routes;

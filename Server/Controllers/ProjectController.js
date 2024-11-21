const asyncHandler = require("express-async-handler");
const Project = require("../Models/ProjectModel");
const User = require("../Models/UserModel.js");
const { default: mongoose } = require("mongoose");

const fetchProjects = asyncHandler(async (req, res) => {
  const project = await Project.find();
  res.json({ project });
});

const fetchSingleProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findById(projectId);
  res.json({ project });
});

const addProject = asyncHandler(async (req, res) => {
  const project = req.body;
  if (project) {
    try {
      const ownerExist = await User.findById(project.project_owner);

      const existingProject = await Project.findOne({
        project_name: project.project_name,
      });

      if (existingProject) {
        return res.status(400).send("Project Name Already Exists");
      }

      const newProject = await Project.create({
        project_name: project.project_name,
        date: project.date,
        project_owner: project.project_owner,
        description: project.description,
        project_type: project.project_type,
        tasks: project.tasks,
      });

      res.json(newProject);
    } catch (error) {
      return res.status(400).send(`Failed to Create Project: ${error.message}`);
    }
  } else {
    return res.status(400).send("Failed to Create a New project");
  }
});

const updateProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const project = req.body;

  if (projectId) {
    try {
      const updatedproject = await Project.findByIdAndUpdate(
        projectId,
        {
          project_name: project.project_name,
          description: project.description,
          project_owner: project.project_owner,
        },
        { new: true }
      );
      if (!updatedproject) {
        return res.status(400).send("Project Not Found");
      } else {
        res.json(updatedproject);
      }
    } catch (error) {
      res.status(400);
      throw new Error("Tasks Dosent exsit");
    }
  } else {
    res.status(400);
    throw new Error("Failed to Update project");
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const deletedProject = await Project.findByIdAndDelete(projectId);
  if (!deletedProject) {
    return res.status(400).send("Project Not Found");
  } else {
    return res.status(400).send("Project Deleted");
  }
});

const fetchTaskById = async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = project.tasks.id(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found in the project" });
    }

    return res.status(200).json({ task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching task", error: error.message });
  }
};

const addTaskToProject = asyncHandler(async (req, res) => {
  const { projectId, taskData } = req.body;
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    const lastTask = project.tasks.reduce((max, task) => {
      return task.task_id > max ? task.task_id : max;
    }, 0);

    const newTaskId = lastTask + 1;

    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      {
        $push: {
          tasks: {
            task_id: newTaskId,
            task_name: taskData.task_name,
            description: taskData.description,
            date_start: taskData.date_start,
            duration: taskData.duration,
            progress: taskData.progress,
            parent: taskData.parent,
            date_end: taskData.date_end,
          },
        },
      },
      { new: true }
    );

    if (updatedProject.nModified === 0) {
      throw new Error("Failed to update project");
    }

    res.status(201).send("Task added to the project successfully.");
  } catch (error) {
    res.status(500).send(`Error adding task to project: ${error.message}`);
  }
});

const removeTaskFromProject = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.body;
  try {
    // Find the task to be deleted
    const taskToDelete = await Project.findOneAndUpdate(
      { _id: projectId, "tasks._id": taskId },
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );

    if (!taskToDelete) {
      throw new Error("Task not found in the project");
    }

    // Remove taskId from the parent field of other tasks
    await Project.updateMany(
      { _id: projectId, "tasks.parent": taskId },
      { $pull: { "tasks.$.parent": taskId } }
    );

    res.status(200).send("Task deleted from the project successfully.");
  } catch (error) {
    res.status(500).send(`Error deleting task from project: ${error.message}`);
  }
});

const editTaskInProject = asyncHandler(async (req, res) => {
  const { projectId, taskId, updatedTaskData } = req.body;
  try {
    const updatedProject = await Project.updateOne(
      { _id: projectId, "tasks._id": taskId },
      { $set: { "tasks.$": updatedTaskData } }
    );

    if (updatedProject.nModified === 0) {
      throw new Error("Task not found in the project");
    }

    res.status(200).send("Task in the project updated successfully.");
  } catch (error) {
    res.status(500).send(`Error updating task in project: ${error.message}`);
  }
});

const assignParentToTask = asyncHandler(async (req, res) => {
  const { projectId, taskId, parentId } = req.body;
  try {
    // Find the task and update its parent field
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, "tasks._id": taskId },
      { $addToSet: { "tasks.$.parent": parentId } },
      { new: true }
    );

    if (!updatedProject) {
      throw new Error("Task not found in the project");
    }

    res.status(200).send("Parent assigned to the task successfully.");
  } catch (error) {
    res.status(500).send(`Error assigning parent to task: ${error.message}`);
  }
});

module.exports = {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  addTaskToProject,
  removeTaskFromProject,
  editTaskInProject,
  fetchSingleProject,
  fetchTaskById,
  assignParentToTask,
};

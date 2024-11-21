const mongoose = require("mongoose");

const ProjectModelSchema = mongoose.Schema(
  {
    project_name: { type: String, required: true },
    project_owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    project_type: {
      type: String,
      enum: ["PERT", "GANTT"],
      required: true,
    },
    tasks: [
      {
        task_id: { type: Number, required: true },
        task_name: { type: String, required: true },
        description: { type: String, required: true },
        date_start: { type: Date, required: true },
        duration: { type: Number, required: true },
        progress: { type: Number },
        date_end: { type: Date },
        parent: [{ type: mongoose.Schema.Types.ObjectId }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectModelSchema);

module.exports = Project;

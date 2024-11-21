import { GanttComponent } from "@syncfusion/ej2-react-gantt";
import React from "react";

const CreateGantt = ({ GanttData }) => {
  const taskFields = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    duration: "Duration",
    progress: "Progress",
    dependency: "Predecessor",
    child: "subtasks",
  };
  return (
    <div>
      <GanttComponent
        dataSource={GanttData}
        height="100%"
        taskFields={taskFields}
      />
    </div>
  );
};

export default CreateGantt;

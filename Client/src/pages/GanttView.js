import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateGantt from "../Components/CreateGantt";
import { MDBSpinner } from "mdb-react-ui-kit";

const GanttView = () => {
  const { projectId } = useParams();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const toast = useToast();
  const [transformedData, setTransformedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProject = async () => {
    try {
      if (!user || !user.token) {
        navigate("/login");
      }
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get(`/api/project/${projectId}`, config);
      const jsondata = response.data;
      transformingData(jsondata.project.tasks, jsondata.project);
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error fetching the projects.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const transformingData = (taskList, prroject) => {
    const transformedTasks = {
      TaskID: 0,
      TaskName: prroject.project_name,
      StartDate: new Date("12/01/2023"),
      // EndDate: new Date("04/18/2024"),
      subtasks: taskList.map((task) => {
        const predecessors =
          task.parent && task.parent.length > 0
            ? task.parent.map((parentId) => {
                const parentTask = taskList.find((t) => t._id === parentId);
                if (parentTask) {
                  return `${parentTask.task_id}FS`;
                }
                return null;
              })
            : [];

        return {
          TaskID: task.task_id,
          TaskName: task.task_name,
          StartDate: task.date_start,
          Duration: task.duration,
          Progress: task.progress,
          Predecessor: predecessors.join(","),
        };
      }),
    };
    setTransformedData([transformedTasks]);
  };

  useEffect(() => {
    getProject();
  }, [projectId, toast]);

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <MDBSpinner role="status">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      ) : (
        <CreateGantt GanttData={transformedData} />
      )}
    </div>
  );
};

export default GanttView;

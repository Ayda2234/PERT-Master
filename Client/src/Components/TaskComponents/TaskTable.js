import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import ActionButton from "./actionButton";

const TaskTable = ({ projectData, user }) => {
  const limitText = (text, maxLength) => {
    return text.length > maxLength
      ? text.slice(0, maxLength - 3) + "..."
      : text;
  };

  const getParentName = (parentIds, projectData) => {
    if (!parentIds || parentIds.length === 0) {
      return "***";
    } else {
      const parentNames = parentIds.map((parentId) => {
        const parent = projectData.tasks.find((item) => item._id === parentId);
        return parent ? parent.task_name : null;
      });

      return parentNames.filter(Boolean).join(", ");
    }
  };

  return (
    <TableContainer p="10px">
      <Table variant="simple" borderWidth="1px">
        <Thead>
          <Tr>
            <Th>Taches</Th>
            <Th>description</Th>
            <Th>durée</Th>
            <Th>predecesseur</Th>
            <Th style={{ textAlign: "end" }}> actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projectData.tasks.map((item) => (
            <Tr key={item._id}>
              <Td>{limitText(item.task_name, 50)}</Td>
              <Td>{limitText(item.description, 50)}</Td>
              <Td>{item.duration || ""}</Td>
              <Td>{getParentName(item.parent, projectData)}</Td>

              <Td style={{ textAlign: "end" }}>
                <ActionButton
                  user={user}
                  taskID={item._id}
                  projectID={projectData._id}
                  Tasksarray={projectData}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;

import { useEffect, useState } from "react";
import jBPMClient from "../jBPMServer/jBPMClient";
import axios, { AxiosResponse } from "axios";

// Define the interface representing the response data
interface NodeInstanceData {
  "node-instance": {
    "node-name": string;
    // Add other properties from the actual response as needed
  }[];
}

interface StatusProps {
  service: jBPMClient;
}

const Status: React.FC<StatusProps> = (props) => {
  const { service } = props;
  const [taskId, setTaskId] = useState(null);
  const [nodeName, setNodeName] = useState("");

  // Call the server API to get the task id associated with the user
  useEffect(() => {
    const username = service.getUsername();
    const fetchTaskId = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/applications/task",
          {
            params: {
              username: username,
            },
          }
        );
        setTaskId(response.data.taskId);
      } catch (error) {
        console.error("Error retrieving task ID:", error);
      }
    };

    fetchTaskId();
  }, []);

  // Call service.getProcessNodeInstance(taskId) when task id is changed
  useEffect(() => {
    const fetchNodeName = async () => {
      try {
        if (taskId) {
          // Add a type assertion using 'as' to inform TypeScript about the response data structure
          const response = (await service.getProcessNodeInstance(
            taskId
          )) as AxiosResponse<NodeInstanceData>;
          console.log(response.data);
          if (
            response &&
            response.data &&
            response.data["node-instance"] &&
            response.data["node-instance"].length > 0
          ) {
            const latestNodeInstance = response.data["node-instance"][0];
            setNodeName(latestNodeInstance["node-name"]);
          }
        }
      } catch (error) {
        console.error("Error retrieving node name:", error);
      }
    };

    fetchNodeName();
  }, [taskId]);

  // then return a java fragment to show the latest node-instance's node-name
  return (
    <div>
      <h1>Status</h1>
      {nodeName && <p>The status is: {nodeName}</p>}
    </div>
  );
};

export default Status;

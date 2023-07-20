import React, { useEffect, useState } from "react";
import jBPMClient from "../jBPMServer/jBPMClient";
import { Button, Card, Form, Input, Modal, Space } from "antd";
import HomePageHeader from "./header/homePageHeader/HomePageHeader";
import Interview from "./interfaces/Interview";

export interface TaskProps {
  service: jBPMClient;
}

const Task: React.FC<TaskProps> = (props) => {
  const { service } = props;
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskID, setTaskID] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [form] = Form.useForm();

  const [isOutputModalOpen, setIsOutputModalOpen] = useState(false);
  const [taskOutputs, setTaskOutputs] = useState(null);

  // Used to fetch the task list
  const fetchTaskList = (
    service: { getTaskList: () => Promise<any> },
    setTaskList: (arg0: any) => void
  ) => {
    service.getTaskList().then((response: { data: { [x: string]: any } }) => {
      console.log(response.data);
      setTaskList(response.data["task-summary"]);
    });
  };

  useEffect(() => {
    fetchTaskList(service, setTaskList);
  }, [service]);

  const getTaskInstanceDetails = async (taskId: Number) => {
    try {
      await service.getTaskInstance(taskId).then((response) => {
        console.log(response.data);
        setSelectedTask(response.data);
        console.log(selectedTask);
        showModal();
      });
    } catch (error) {
      console.error("Error fetching task instance details:", error);
    }
  };

  const getTaskOutput = async (taskName: String) => {
    try {
      const response = await service.getTaskOutput(taskName);
      setTaskOutputs(response.data.taskOutputs);
      showOutputModal(); // Display the modal after fetching task outputs
    } catch (error) {
      console.error("Error fetching task outputs", error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showOutputModal = () => {
    setIsOutputModalOpen(true);
  };

  const handleOutputOk = () => {
    form.validateFields().then((values: any) => {
      if (values.Interview) {
        // Convert the form data to the Interview interface
        const interviewData: Interview = {
          "com.myspace.job_portal.Interview": {
            interviewDateTime: values.Interview.interviewDateTime,
            interviewer: values.Interview.interviewer,
          },
        };
        values.Interview = interviewData;
      }
      console.log(values);
      if (taskID) {
        service.completeTaskInstance(taskID, values);
      }
    });
    fetchTaskList(service, setTaskList);
    setIsOutputModalOpen(false);
  };

  const handleOutputCancel = () => {
    setIsOutputModalOpen(false);
  };

  const renderData = (data: object) => {
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return (
          <div key={key}>
            <p>{key}:</p>
            {renderData(value)} {/* Recursively render nested objects */}
          </div>
        );
      } else {
        return <p key={key}>{`${key}: ${value}`}</p>;
      }
    });
  };

  return (
    <>
      <HomePageHeader service={service} />
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        {taskList.map((task) => (
          <>
            <Card
              key={task["task-id"]}
              title={task["task-subject"]}
              size="small"
              onClick={() => getTaskInstanceDetails(task["task-id"])}
            >
              <p>View input data</p>
            </Card>
            <Button
              onClick={() => {
                getTaskOutput(task["task-name"]);
                setTaskID(task["task-id"]);
              }}
            >
              Complete Task
            </Button>
          </>
        ))}
      </Space>
      <Modal
        title="Task Input"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedTask && (
          <div>{renderData(selectedTask["task-input-data"])}</div>
        )}
      </Modal>
      <Modal
        title="Enter Task Outputs"
        open={isOutputModalOpen}
        onOk={handleOutputOk}
        onCancel={handleOutputCancel}
      >
        {taskOutputs && (
          <Form form={form}>
            {Object.entries(taskOutputs).map(([outputName, outputType]) => (
              <React.Fragment key={outputName}>
                <Form.Item
                  label={outputName}
                  name={outputName}
                  rules={[{ required: true }]}
                >
                  <Input
                    type={
                      outputType === "com.myspace.job_portal.Interview"
                        ? "hidden"
                        : (outputType as string)
                    }
                  />
                </Form.Item>
                {outputType === "com.myspace.job_portal.Interview" && (
                  <>
                    <Form.Item
                      label="interviewDateTime"
                      name={["Interview", "interviewDateTime"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input interviewDateTime!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="interviewer"
                      name={["Interview", "interviewer"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input interviewer!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                )}
              </React.Fragment>
            ))}
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Task;

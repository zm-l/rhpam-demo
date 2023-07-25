import { Button, DatePicker, Form, Input, Select } from "antd";
import { RuleObject } from "antd/lib/form";
import React from "react";
import jBPMClient from "../jBPMServer/jBPMClient";
import HomePageHeader from "./header/homePageHeader/HomePageHeader";
import Candidate from "./interfaces/Candidate";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface Apply {
  username: String;
  service: jBPMClient;
  logout: () => void;
}

const Apply: React.FC<Apply> = (props) => {
  const { username, service, logout } = props;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const candidateData: Candidate = {
      "com.myspace.job_portal.Candidate": {
        dob: values.dob,
        email: values.email,
        gender: values.gender,
        gpa: values.gpa,
        name: values.name,
        university: values.university,
      },
    };

    startProcess(candidateData, values.position);
  };

  const validateGPA = (_: RuleObject, value: string) => {
    if ((value && !/^\d+(\.\d{1,2})?$/.test(value)) || parseFloat(value) >= 5) {
      return Promise.reject("Please enter a valid GPA with 2 decimal places.");
    }
    return Promise.resolve();
  };

  const startProcess = (candidateData: Candidate, position: String) => {
    const startProcessData = { candidate: candidateData, position: position };
    const jsonString = JSON.stringify(startProcessData);

    service.startProcess(jsonString).then(async (r) => {
      const b = JSON.stringify({ username, task_id: r.data });
      try {
        const response = await fetch("http://localhost:5000/applications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, task_id: r.data }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message); // Output the response message
          // Perform any additional actions after successful insertion
          navigate("/result");
        } else {
          console.error("Error:", response.statusText);
          // Handle the error case
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle the error case
      }
    });
  };

  return (
    <>
      <HomePageHeader logout={logout} />
      <h1>Application Form</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="application"
        onFinish={onFinish}
        initialValues={{
          prefix: "60",
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Name"
          tooltip="Your given name as indicated in IC"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dob"
          label="Date of Birth"
          tooltip="The date format is YYYY-MM-DD"
          rules={[
            {
              required: true,
              message: "Please select your date of birth!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="university"
          label="University"
          rules={[{ required: true, message: "Please input your university!" }]}
        >
          <Select>
            <Select.Option value="um">University Malaya</Select.Option>
            <Select.Option value="sunway">Sunway University</Select.Option>
            <Select.Option value="monash">
              Monash University Malaysia
            </Select.Option>
            <Select.Option value="others">Others</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="gpa"
          label="Grade Point Average (GPA): "
          rules={[
            {
              validator: validateGPA,
            },
            {
              required: true,
              message: "Please input your GPA!",
            },
          ]}
        >
          <Input
            style={{ width: "100%" }}
            onKeyPress={(event) => {
              if (!/[0-9 | \.]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="position"
          label="Job Position"
          rules={[
            {
              required: true,
              message: "Please input your desired job position!",
            },
          ]}
        >
          <Select>
            <Select.Option value="technology">Technology</Select.Option>
            <Select.Option value="sales">Sales</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit Application
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Apply;

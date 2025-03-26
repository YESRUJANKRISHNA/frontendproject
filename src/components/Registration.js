import React from "react";
import './Registration.css';
import { Form, Input, Button, Space } from 'antd';
import { useState } from "react";
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Registration = () => {
  const navigate=useNavigate();
  
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3007/users/register" ,values);
      localStorage.setItem("token", response.data.token); 
      alert("Registration Successful!");
      navigate("/login"); 
    } catch (error) {
      alert("your details already exists please login with yours email and password");
    }
    setLoading(false);
  };
  return (
    <div className="vk">
      <Form name="validateOnly" layout="vertical"onFinish={onFinish} autoComplete="off">
        <div>
          <Form.Item
            name="name"
            label="Name"
            className="abd"
            rules={[
              {
                required: true,
                message: "Please enter your name"
              },
              {
                validator(_, value) {
                  if (value) {
                    const letter = value.replace(/[^A-Za-z]/g, '').length;
                    if (letter < 3) {
                      return Promise.reject("Your name should be more than 3 letters");
                    } else if (letter > 50) {
                      return Promise.reject("Your name should be less than 50 letters");
                    }
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            className="abd"
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email"
              },
              {
                validator(_, value) {
                  if (value) {
                    const letter = value.replace(/^[a-zA-Z0-9.+%]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/).length;
                    if (letter < 3) {
                      return Promise.reject("Your email should be more than 3 letters");
                    } else if (letter > 100) {
                      return Promise.reject("Your email should be less than 100 letters");
                    }
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            className="abd"
            name="mobileno"
            label="Mobile No"
            rules={[
              {
                required: true,
                message: "Please enter your mobile number",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Enter a valid mobile no",
              },
              
              
            ]}
          >
            <Input prefix={<PhoneOutlined />} maxLength={10} />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            className="abd"
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please enter your username"
              },
              {
                validator(_, value) {
                  if (value) {
                    const letter = value.replace(/[^A-Za-z]/g, '').length;
                    if (letter < 3) {
                      return Promise.reject("Your username should be more than 3 letters");
                    } else if (letter > 50) {
                      return Promise.reject("Your username should be less than 50 letters");
                    }
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            className="abd"
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password"
              },
              {
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must match [A-Za-z@#$%^&*123] ",
              }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
        </div>

        <Form.Item>
          <Space>
            <Button loading={loading} style={{backgroundColor:"green"}} type="primary" htmlType="submit">Submit</Button>
            
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;

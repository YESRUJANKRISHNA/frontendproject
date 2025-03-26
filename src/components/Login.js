import React from "react";
import { Form,Input,Space,Button} from "antd";
import { MailOutlined,LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './Login.css';
const Login=()=>{


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3007/users/login", values);
      localStorage.setItem("token", response.data.access_token);
      alert("Login Successful!");
      navigate("/success");
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };


return(

    <div>
<Form name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
<div className="jk">
<Form.Item
            className="ab"
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
            className="vb"
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
            <Button  type="primary" className="bu" style={{backgroundColor:"green"}} loading={loading} htmlType="submit">Submit</Button>
            
          </Space>
        </Form.Item>

</Form>

    </div>
)


}
export default Login;
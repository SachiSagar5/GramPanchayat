import React from "react";
import axios from "axios";
import logo from "../img/logo.png";
import { Spin, Table, notification } from "antd";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
} from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 12,
  },
};

const openNotificationWithIcon = (error, type) => {
  notification[type]({
    message: "Could not able to login",
    description: `${error}`,
  });
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }

  componentDidMount() {
    let pop = this.props;
    if (sessionStorage.getItem("Auth") != null) {
      pop.history.push("/Dashobard");
    }
  }

  // Login Application code start

  loginApp = () => {
    let pop = this.props;
    const data = { password: this.state.password, email: this.state.username };

    let self = this;
    self.setState({ loading: true });
    axios
      .post(process.env.REACT_APP_LOGIN, data)
      .then(function (response) {
        let Auth = response.data.Authorization;
        let UserName = response.data.userName;

        sessionStorage.setItem("Auth", Auth);
        sessionStorage.setItem("UserName", UserName);

        if (sessionStorage.getItem("Auth") != null) {
          pop.history.push("/Dashboard");
        }
      })
      .catch(function (error) {
        self.setState({ loading: false });
        openNotificationWithIcon(error, "error");
        console.log(error);
      });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value].join(),
    });
  };

  render() {
    console.log(process.env.REACT_APP_LOGIN)
    const dataSource = [];

    const columns = [
      {
        title: "Notification",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Alert & Link",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Awards",
        dataIndex: "address",
        key: "address",
      },
    ];

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const { Header, Footer, Sider, Content } = Layout;
    return (
      <Spin spinning={this.state.loading}>
        <Layout className="layout">
          <Header>
            <Row>
              <Col>
                <img src={logo} className="logo" style={{ width: "80px" }} />
              </Col>
              <Col offset={4}>
                <span className="kannada-font">
                  ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಗ್ರಾಮಪಂಚಾಯತ್ ಕರ್ಯಾಲಯ,ಆಂತೂರ-582 205
                </span>
              </Col>
              <Col offset={5} span={2}>
                <img src={logo} className="logo" style={{ width: "80px" }} />
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <p></p>
            </Breadcrumb>
            <div className="site-layout-content">
              <Row>
                <Col span={12} offset={5}>
                  <Form
                    style={{ "margin-top": "5rem" }}
                    {...layout}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input name="username" onChange={this.handleChange} />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        name="password"
                        onChange={this.handleChange}
                      />
                    </Form.Item>

                    <Form.Item
                      {...tailLayout}
                      name="remember"
                      valuePropName="checked"
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.loginApp}
                      >
                        Login
                      </Button>
                      &nbsp; &nbsp;<Checkbox>Remember me</Checkbox>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </div>
            <Table
              style={{ "margin-top": "3rem" }}
              dataSource={dataSource}
              columns={columns}
            />
            ;
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Copyright ©2020 Thantrick Business Solution, All Right reserved
          </Footer>
        </Layout>
      </Spin>
    );
  }
}

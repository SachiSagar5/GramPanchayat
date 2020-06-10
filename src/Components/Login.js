import React from "react";
import axios from "axios";
import logo from "../img/logo.png";
import water from "../img/water.png";
import tree from "../img/tree.png";
import { Spin, Table, notification,Radio } from "antd";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
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
    const data = { phoneNo: this.state.username,password: this.state.password };

    let self = this;
    self.setState({ loading: true });
    axios
      .post(process.env.REACT_APP_LOGIN, data)
      .then(function (response) {
        let Auth = response.data.Authorization;
        let UserName = response.data.userName;
        console.log(response.data)
        sessionStorage.setItem("Auth", Auth);
        sessionStorage.setItem("UserName", UserName);

        if (sessionStorage.getItem("Auth").length >10 && response.data.userId !=="") {
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
   
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const { Header, Footer, Content } = Layout;
    return (
      <Spin spinning={this.state.loading}>
        <Layout className="layout">
          <Header>
            <Row>
              <Col span={7}>
                <img src={logo} className="logo" alt="" style={{ width: "80px","textAlign":"left" }} />
              </Col>
              <Col span={9} className="kannada-font">
                <span>
                  <span>ಕರ್ನಾಟಕ ಸರ್ಕಾರ </span>
                  ಗ್ರಾಮಪಂಚಾಯತ್ ಕರ್ಯಾಲಯ,ಆಂತೂರ-582 205
                </span>
              </Col>
              <Col span={8} style={{ "textAlign":"right" }}>
                <img src={logo} className="logo" alt="" style={{ width: "80px"}} />
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: "0 10px" }}>
            <div className="site-layout-content">
              <Row>
                <Col span={8} style={{marginTop:'9rem',"textAlign":"center" }}>
                  <img src={water}  alt=""/>
                </Col>
               
                <Col span={8}>
                <div className="Login-Bg "  style={{ "marginTop": "5rem" }}>
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                      <Form.Item label="Language"><Radio id="kannada"> <label  htmlFor="kannda">Kannada</label></Radio>
                       <Radio id="English" checked><label htmlFor="English">English</label></Radio></Form.Item>
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
                      <Button className='btn-dark-blue'
                        type="primary"
                        htmlType="submit"
                        onClick={this.loginApp}
                      >
                        Login
                      </Button>
                      &nbsp; &nbsp;<Checkbox>Remember me</Checkbox>
                    </Form.Item>
                  </Form>
                  </div>
                </Col>
               
                <Col span={8} style={{ "marginTop": "9rem","textAlign":"center" }}>
                  <img src={tree} alt="" />
                </Col>
              </Row>
            </div>
            <Table
            className="custom-table"
              style={{ "marginTop": "3rem" }}
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

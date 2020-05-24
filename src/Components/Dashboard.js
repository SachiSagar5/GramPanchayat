import React from "react";

import logo from "../img/logo.png";
import { Spin, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { Layout, Menu, Row, Col } from "antd";

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

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  async componentDidMount() {
    let session = sessionStorage.getItem("Auth");
    if (session == null) {
      this.props.history.push("/");
    }
  }

  handLogOut = () => {
    sessionStorage.removeItem("Auth");
    this.props.history.push("/");
  };
  render() {
    const { Header, Footer, Sider, Content } = Layout;
    return (
      <Spin spinning={this.state.loading}>
        <Layout className="layout">
        <Header>
            <Row>
              <Col span={7}>
                <img src={logo} className="logo" style={{ width: "80px","text-align":"left" }} />
              </Col>
              <Col span={9} className="kannada-font">
                <span>
                  <span>ಕರ್ನಾಟಕ ಸರ್ಕಾರ </span>
                  ಗ್ರಾಮಪಂಚಾಯತ್ ಕರ್ಯಾಲಯ,ಆಂತೂರ-582 205
                </span>
              </Col>
              <Col span={8} style={{ "text-align":"right" }}>
                <img src={logo} className="logo" style={{ width: "80px"}} />
              </Col>
            </Row>
          </Header>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="mail" icon={<MailOutlined />}>
              <Link to="Dashboard">Home &nbsp; |</Link>
            </Menu.Item>
            <Menu.Item key="app">
              <Link to="Property-Tax"> Property Tax &nbsp; |</Link>
            </Menu.Item>
            <Menu.Item key="Tap Water Tax ">Tap Water Tax &nbsp; |</Menu.Item>
            <Menu.Item key="Reports">Reports &nbsp; |</Menu.Item>
            <Menu.Item key="Logout" onClick={this.handLogOut}>
              Logout
            </Menu.Item>
            <Menu.Item key="Username" style={{ float: "right" }}>
              Hello {sessionStorage.getItem("UserName")}
            </Menu.Item>
          </Menu>
          <Content>
            <section className="dashboar-btn">
              <Row justify="space-around" align="middle">
                <Col span={1} offset={4}>
                  {" "}
                  <Link to="Property-Tax">
                    {" "}
                    <Button type="primary">Property Tax</Button>
                  </Link>
                </Col>
                <Col span={1}>
                  <Button type="primary">Reports</Button>
                </Col>
                <Col span={7}>
                  <Button type="primary">Tax Water Tax</Button>
                </Col>
              </Row>
            </section>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Copyright ©2020 Thantrick Business Solution, All Right reserved
          </Footer>
        </Layout>
      </Spin>
    );
  }
}

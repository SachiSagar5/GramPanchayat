import React from "react";

import { Spin, Button } from "antd";
import { Link } from "react-router-dom";

import { Layout, Row, Col } from "antd";

import Header from './Header'
import Footer from './Footer'
import NavBar from './NavBar'

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
    const { Content } = Layout;
    return (
      <Spin spinning={this.state.loading}>
        <Layout className="layout">
          <Header/>
          <NavBar/>
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
                <Link to="TapWater-Tax">
                  <Button type="primary">Tap Water Tax</Button>
                  </Link>
                </Col>
              </Row>
            </section>
          </Content>
          <Footer/>
        </Layout>
      </Spin>
    );
  }
}

import React from "react";
import { Layout, Row, Col } from "antd";
import logo from "../img/logo.png";

function Header(){
  const { Header } = Layout;
  return(<Header>
    <Row>
      <Col span={7}>
        <img src={logo} alt="logo" className="logo" style={{ width: "80px","textAlign":"left" }} />
      </Col>
      <Col span={9} className="kannada-font">
        <span>
          <span>ಕರ್ನಾಟಕ ಸರ್ಕಾರ </span>
          ಗ್ರಾಮಪಂಚಾಯತ್ ಕರ್ಯಾಲಯ,ಆಂತೂರ-582 205
        </span>
      </Col>
      <Col span={8} style={{ "textAlign":"right" }}>
        <img src={logo} alt="logo2"className="logo" style={{ width: "80px"}} />
      </Col>
    </Row>
  </Header>)
}


export default Header
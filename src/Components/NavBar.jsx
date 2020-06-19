import React from 'react'
import {Menu} from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


export default class NavBar extends React.Component{  
    
// Logout Code
  handLogOut = () => {
    sessionStorage.removeItem("Auth");
    sessionStorage.removeItem("UserName");
    this.props.history.push("/");
  };
    render(){

        return(
            <Menu
            onClick={this.handleClick}
            // selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="mail" icon={<MailOutlined />}>
              <Link to="Dashboard">Home &nbsp; |</Link>
            </Menu.Item>
            <Menu.Item key="app">
              <Link to="Property-Tax"> Property Tax &nbsp; |</Link>
            </Menu.Item>
            <Menu.Item key="Tap Water Tax "><Link to="TapWater-Tax">Tap Water Tax &nbsp; |
            </Link></Menu.Item>
            
            <Menu.Item key="Reports">Reports &nbsp; |</Menu.Item>
            <Menu.Item key="Logout" onClick={this.handLogOut}>
              Logout
            </Menu.Item>
            <Menu.Item key="Username" style={{ float: "right" }}>
              Hello {sessionStorage.getItem("UserName")}
            </Menu.Item>
          </Menu>
        )
    }
    
}

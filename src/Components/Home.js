import React from "react";
import axios from "axios";

import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import { EditFilled,InfoCircleOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Table,
  Spin,
  Button,
  Form,
  Input,
  Tooltip,
  Modal,
  Divider, 
  notification 
} from "antd";

const openNotification = (PropertyReposne) => {
  const args = {
    message:   "SMS Staus",
    description:
      `${PropertyReposne}`,
    duration: 0,
  };
  notification.open(args);
};

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      UserData: [],
      SearchData: [],
      PropertyIdValue: "",
      PreviousBalance: "",
      OwnerInfo: "",
      TotalBalance: "",
      visible: false,
    };
  }
  async componentDidMount() {
    this.setState({
      loading: true,
    });
    let session = sessionStorage.getItem("Auth");
    if (session == null) {
      this.props.history.push("/");
    }
    // Setting Deafult header
    axios.defaults.headers.common = {
      Authorization: sessionStorage.getItem("Auth"),
    };

    let self = this;
    await axios
      .get(process.env.REACT_APP_ALLPROPERTY)
      .then(function (response) {
        self.setState({
          loading: false,
          UserData: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // Logout Code
  handLogOut = () => {
    sessionStorage.removeItem("Auth");
    sessionStorage.removeItem("UserName");
    this.props.history.push("/");
  };
  // Tablle sort code
  onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  //Assign Search Value
  OnChnageSearch = (e) => {
    this.setState({
      [e.target.name]: [e.target.value].join(),
    });
  };
  // Property Search
  hadnleSearch = (e) => {
    e.preventDefault();
    let self = this;
    this.setState({
      loading: true,
      UserData: [],
    });
if(this.state.PropertyIdValue){
  axios.defaults.headers.common = {
    Authorization: sessionStorage.getItem("Auth"),
  };
  
  // API URL
  axios
    .get(`${process.env.REACT_APP_PROPERTY}/${this.state.PropertyIdValue}`)
    .then(function (response) {
      if (response.data.length > 1) {
        self.setState({
          loading: false,
          UserData: response.data,
        });
      } else {
        self.setState({
          loading: false,
          SearchData: response.data,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      self.setState({
        loading: false,
      });
    });
}
   
if(this.state.PreviousBalance){
// Previous Balance
axios.defaults.headers.common = {
  Authorization: sessionStorage.getItem("Auth"),
};
// API URL
let PrevBalURL = `${process.env.REACT_APP_PREVBAL}/${this.state.PreviousBalance}`;
axios
  .get(PrevBalURL)
  .then(function (response) {
    console.log("prevdata", response.data);
    if (response.data.length > 1) {
      self.setState({
        loading: false,
        UserData: response.data,
      });
    } else {
      self.setState({
        loading: false,
        SearchData: response.data,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
    self.setState({
      loading: false,
    });
  });
}
    

if(this.state.TotalBalance){
// TotalBalance Balance
axios.defaults.headers.common = {
  Authorization: sessionStorage.getItem("Auth"),
};
// API URL
let TotalBlURL = `${process.env.REACT_APP_TOTALBAL}/${this.state.TotalBalance}`;
axios
  .get(TotalBlURL)
  .then(function (response) {
    console.log('total',response.data)
    if (response.data.length > 1) {
      self.setState({
        loading: false,
        UserData: response.data,
      });
    } else {
      self.setState({
        loading: false,
        SearchData: response.data,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
    self.setState({
      loading: false,
    });
  });
  
}
    
  };
  // Send SMS script starts
handleSendMsg=(propertyId)=>{
  let SendSMS = `${process.env.REACT_APP_SENDSMS}/${propertyId}`
  console.log(SendSMS)
  axios
  .get(SendSMS)
  .then(function (response) {
    openNotification(response.data)
  })
  .catch(function (error) {
    openNotification(error)
  });
}

  // Modal script start
  UpdateDetails = (id) => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    console.log(this.PreviousBalance)
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const columns = [
      {
        title: "Property Id",
        dataIndex: "propertyId",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.propertyId - b.propertyId,
      },
      {
        title: "Owner Name",
        dataIndex: "Ownername",
        sorter: (a, b) => a.Ownername.length - b.Ownername.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Previous Balance",
        dataIndex: "PreviousBalance",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.PreviousBalance - b.PreviousBalance,
      },
      {
        title: "Current Balance",
        dataIndex: "CurrentBalance",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.CurrentBalance - b.CurrentBalance,
      },
      {
        title: "Total Balance",
        dataIndex: "TotalBalance",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.TotalBalance - b.TotalBalance,
      },
      {
        title: "Deails",
        dataIndex: "details",
      },
      {
        title: "Send Message",
        dataIndex: "Message",
      },
    ];

    // Pass json data structure to create tab;e
    const data = [];

    // Forming table json structure single value and Aaray
    if (this.state.SearchData.length == 0) {
      this.state.UserData.map((temp) => {
        let Ownname = [];
        let PrevBal = [];
        let Currbal = [];
        let Toalbal = [];
        data.push({
          propertyId: temp.propertyId,
          Ownername: Ownname,
          PreviousBalance: PrevBal,
          CurrentBalance: Currbal,
          TotalBalance: Toalbal,
          details: "",
          Message: <Button type="primary" onClick={()=>this.handleSendMsg(temp.propertyId)}>Send</Button>,
          details: (
            <Tooltip title="Edit User Details">
              <Button
                type="primary"
                onClick={() => this.UpdateDetails(temp.propertyId)}
              >
                <EditFilled />
              </Button>{" "}
            </Tooltip>
          ),
        });
        Ownname.push(temp.owner.ownerName);
        PrevBal.push(temp.tax.previousTotalTax);
        Currbal.push(temp.tax.currentTotalTax);
        Toalbal.push(temp.tax.outstandingTotalTax);
      });
    } else if (this.state.SearchData.length !== 0) {
      if (this.state.SearchData.length !== 0) {
        let SingleData = {
          propertyId: this.state.SearchData.propertyId,
          // Ownername: this.state.SearchData.owner.ownerName,
          PreviousBalance: this.state.SearchData.tax.previousTotalTax,
          CurrentBalance: this.state.SearchData.tax.currentTotalTax,
          TotalBalance: this.state.SearchData.tax.outstandingTotalTax,
          details: "",
          Message: <Button type="primary">Send</Button>,
          details: (
            <Tooltip title="Edit User Details">
              <Button
                type="primary"
                onClick={() => this.UpdateDetails(this.state.SearchData.propertyId)}
              >
                <EditFilled />
              </Button>{" "}
            </Tooltip>
          ),
        };
        data.length = 0;
        data.push(SingleData);
      }
    }
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
          <label style={{"margin-left":"2rem"}}><h2>Search By:</h2></label>
          <Form name="advanced_search" className="ant-advanced-search-form">
          
            <Row style={{ "margin-top": "2rem" }}>
              <Col span={6} offset={4}>
                <Form.Item name="PropertyId" label="Property Id">
                  <Input
                    name="PropertyIdValue"
                    onChange={this.OnChnageSearch}
                  />
                </Form.Item>
              </Col>
              <Col span={6} offset={2}>
                <Form.Item name="PreviousBalance" label="Previous Balance">
                  <Input
                    name="PreviousBalance"
                    onChange={this.OnChnageSearch}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6} offset={4}>
                <Form.Item name="OwnerInfo" label="Owner">
                  <Col offset={2}>
                    {" "}
                    <Input name="OwnerInfo" onChange={this.OnChnageSearch} />
                  </Col>
                </Form.Item>
              </Col>
              <Col span={6} offset={2}>
                <Form.Item name="TotalBalance" label="Total Balance">
                  <Col offset={2}>
                    <Input name="TotalBalance" onChange={this.OnChnageSearch} />
                  </Col>
                </Form.Item>
              </Col>
              <Col offset={1}>
                <Button type="" onClick={this.hadnleSearch}>
                  Search
                </Button>
              </Col>
            </Row>
            <Row></Row>
          </Form>

          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
            <section></section>
            <div className="site-layout-content">
              <Row>
                <Col span={24}>
                  <Table
                    columns={columns}
                    dataSource={data}
                    onChange={this.onChange}
                    size="small"
                  />
                </Col>
              </Row>
            </div>
            <Modal
              title="Update User Details"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form>
              <Form.Item name="PreviousBalance" label="Previous Balance">
                  <Col offset={2}>
                    <Input name="PreviousBalance" onChange="" />
                  </Col>
                </Form.Item>
                <Form.Item name="PreviousBalance"  label="Current Balance">
                  <Col offset={2}>
                    <Input name="PreviousBalance" ref={(PreviousBalance) => this.PreviousBalance = PreviousBalance} />
                  </Col>
                </Form.Item>
                <Divider/> <h3>Total Balance : {}</h3>
                </Form>
            </Modal>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Copyright ©2020 Thantrick Business Solution, All Right reserved
          </Footer>
        </Layout>
      </Spin>
    );
  }
}

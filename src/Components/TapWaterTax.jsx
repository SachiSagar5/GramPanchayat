import React from "react";
import axios from "axios";

import Header from './Header'
import Footer from './Footer'
import NavBar from './NavBar'

import { EditFilled } from "@ant-design/icons";
import {
  Layout,
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

// Notification code starts
const openNotification = (PropertyReposne) => {
  const args = {
    message:   "SMS Staus",
    description:
      `${PropertyReposne}`,
    duration: 0,
  };
  notification.open(args);
};
const openNotificationUpdateSuccess = () => {
  const args = {
    message:   "Balance fileds are updated successfully",
    duration: 0,
  };
  notification.open(args);
};
const openNotificationWithIcon = (error, type) => {
  notification[type]({
    message: "Something went wrong",
    description: `${error}`,
  });
};
// Notification code end
export default class TapWaterTax extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      UserData: [],
      SearchData: [],
      TapId: "",
      PreviousBalance: "",
      OwnerInfo: "",
      TotalBalance: "",
      visible: false,
      UpdateUserDetails : "",
      PrevBal: 0,
      CurBal: 0,
    };
  
  }
  async componentDidMount() {
    this.setState({
      loading: true,
    });
    let session = sessionStorage.getItem("Auth");
    if (session === null) {
      this.props.history.push("/");
    }
    // Setting Deafult header
    axios.defaults.headers.common = {
      Authorization: sessionStorage.getItem("Auth"),
    };

    let self = this;
    await axios
      .get(process.env.REACT_APP_ALLTAPWATERTAX)
      .then(function (response) {
        self.setState({
          loading: false,
          UserData: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        this.setState({
            loading: false,
          });
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
//Tap ID    

if(this.state.TapId){
  axios.defaults.headers.common = {
    Authorization: sessionStorage.getItem("Auth"),
  };
  
  // API URL
  axios.get(`${process.env.REACT_APP_TAPWATERID}/${this.state.TapId}`)
    .then(function (response) {
      if (response.data.length >= 1) {
        self.setState({
          loading: false,
          UserData: response.data,
        });
      } else {
        self.setState({
          loading: false,
          SearchData: response.data,
        });
        console.log(response.data)
      }
     
    })
    .catch(function (error) {
      console.log(error);
      self.setState({
        loading: false,
      });
    });
}

// Previos Balance
if(this.state.PreviousBalance){
// Previous Balance
axios.defaults.headers.common = {
  Authorization: sessionStorage.getItem("Auth"),
};
// API URL
let PrevBalURL = `${process.env.REACT_APP_TAPWATERPREVBAL}/${this.state.PreviousBalance}`;
axios
  .get(PrevBalURL)
  .then(function (response) {
    if (response.data.length >= 1) {
      self.setState({
        loading: false,
        UserData: response.data,
      
      });
      console.log(response.data.length)
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
    
// Total Tap Tax Balance 
if(this.state.TotalBalance){
axios.defaults.headers.common = {
  Authorization: sessionStorage.getItem("Auth"),
};
// API URL
let TotalBlURL = `${process.env.REACT_APP_TAPWATERTOTALBAL}/${this.state.TotalBalance}`;
axios
  .get(TotalBlURL)
  .then(function (response) {
    if (response.data.length >= 1) {
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
  UpdateDetails = (Updatedata) => {
    this.setState({
      visible: true,
      UpdateUserDetails: Updatedata
    });  
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
 if(this.state.PrevBal !== 0 || this.state.CurBal !== 0 ){
  const UserDetailsUpdateObject ={
    "id": this.state.UpdateUserDetails.id,
    "propertyId": this.state.UpdateUserDetails.propertyId,
    "grama": this.state.UpdateUserDetails.grama,
    "jille": this.state.UpdateUserDetails.jille,
    "owner": {
      "id": this.state.UpdateUserDetails.owner.id,
      "ownerId": this.state.UpdateUserDetails.owner.ownerId
    },
    "tax": {
      "id": this.state.UpdateUserDetails.tax.id ,
      "previousTotalTax":parseInt(this.state.PrevBal),
      "currentTotalTax":parseInt(this.state.CurBal),
      "outstandingTotalTax": parseInt(this.state.PrevBal)  + parseInt(this.state.CurBal)
    }
  }
  console.log(UserDetailsUpdateObject)
  let self = this;
  self.setState({ loading: true });
  axios
    .post(process.env.REACT_APP_UPDATEDETAILS, UserDetailsUpdateObject)
    .then(function (response) {
      console.log(response.data)
      self.setState({ loading: false });
      openNotificationUpdateSuccess()
    })
    .catch(function (error) {
      self.setState({ loading: false });
      openNotificationWithIcon(error, "error");
    });
 }else{
    
   alert('Enter Valid input')
 }
 };
  BalanceChange=(e)=>{
    this.setState({
      [e.target.name]: [e.target.value].join()
    })
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const columns = [
      {
        title: "Tap Id",
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
    if (this.state.SearchData.length === 0) {
      this.state.UserData.map((temp) => {
        let Ownname = [];
        // let PrevBal = [];
        // let Currbal = [];
        // let Toalbal = [];
        data.push({
          propertyId: temp.tapWaterTaxId,
          Ownername: Ownname,
          PreviousBalance: temp.previousBalance,
          CurrentBalance: temp.currentBalance,
          TotalBalance: temp.totalBalance,
          details: "",
          Message: <Button type="primary" onClick={()=>this.handleSendMsg(temp.tapWaterTaxId)}>Send</Button>,
          details: (
            <Tooltip title="Edit User Details">
              <Button
                type="primary"
                onClick={() => this.UpdateDetails(temp)}
              >
                <EditFilled />
              </Button>{" "}
            </Tooltip>
          ),
        });
        Ownname.push(temp.owner.ownerName);
      });
    }
    const { Content } = Layout;
    
    return (
      <Spin spinning={this.state.loading}>
        <Layout className="layout">
        <Header/>
        <NavBar/>
          <label style={{"marginLeft":"2rem"}}><h2>Search By:</h2></label>
          <Form name="advanced_search" className="ant-advanced-search-form">
          
            <Row style={{ "marginTop": "2rem" }}>
              <Col span={6} offset={4}>
                <Form.Item name="TapId" label="Tap Id">
                  <Input
                    name="TapId"
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
              <Form.Item name="PrevBal" label="Previous Balance">
                  <Col offset={2}>
                    <Input name="PrevBal" onChange={this.BalanceChange} />
                  </Col>
                </Form.Item>
                <Form.Item name="CurBal"  label="Current Balance">
                  <Col offset={2}>
                    <Input name="CurBal" onChange={this.BalanceChange} />
                  </Col>
                </Form.Item>
                <Divider/> <h3>Total Balance : {parseInt(this.state.PrevBal) === null|| parseInt(this.state.CurBal) === null ? "Provide Number input": parseInt(this.state.PrevBal)  + parseInt(this.state.CurBal)}</h3>
                </Form>
            </Modal>
          </Content>
          <Footer/>
        </Layout>
      </Spin>
    );
  }
}

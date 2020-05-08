import React from 'react'
import axios from 'axios'
import { Spin,Button } from 'antd';
import { MailOutlined} from '@ant-design/icons';
import{Link} from 'react-router-dom'
import logo from '../img/logo.png'

import { Layout,Menu, Breadcrumb,Row, Col,Table  } from 'antd';

export default class Home extends React.Component{
    constructor(){
        super()
        this.state={
            loading: false,
            UserData : []
        }
    }
    async componentDidMount (){
      this.setState({
        loading:true
      })
        let session = sessionStorage.getItem('Auth');
        if(session == null){
            this.props.history.push('/')
        }
        // Setting Deafult header
        axios.defaults.headers.common = {'Authorization': sessionStorage.getItem('Auth')}

        let self = this
     await axios.get('http://35.154.139.29:8080/AnthurGP/properties/allProperties')
          .then(function (response) {
          self.setState({
                  loading: false,
                  UserData: response.data,
              })
          })
          .catch(function (error) {
            console.log(error);
          })
          
        }
        handLogOut=()=>{
            sessionStorage.removeItem('Auth');
            sessionStorage.removeItem('UserName');
            this.props.history.push('/')
        }
        // Tablle sort code
 onChange=(pagination, filters, sorter, extra)=> {
    console.log('params', pagination, filters, sorter, extra);
  }
    render(){
      
        const columns = [
          
            {
              title: 'Property Id',
              dataIndex: 'propertyId',
              defaultSortOrder: 'descend',
              sorter: (a, b) => a.propertyId - b.propertyId,
            },
            {
                title: 'Owner Name',
                dataIndex: 'Ownername',
                sorter: (a, b) => a.Ownername.length - b.Ownername.length,
                sortDirections: ['descend', 'ascend'],
              }, 
              {
                title: 'Previous Balance',
                dataIndex: 'PreviousBalance',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.PreviousBalance - b.PreviousBalance,
              },
              {
                title: 'Current Balance',
                dataIndex: 'CurrentBalance',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.CurrentBalance - b.CurrentBalance,
              },
              {
                title: 'Total Balance',
                dataIndex: 'TotalBalance',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.TotalBalance - b.TotalBalance,
              },
              {
                title: 'Deails',
                dataIndex: 'details'
              },
              {
                title: 'Send Message',
                dataIndex: 'Message',
              },
          ];

          // Pass json data structure to create tab;e
          const data = [];
          /// Forming table json structure

          this.state.UserData.forEach(temp=>{
              let Ownname = [];
              let PrevBal = [];
              let Currbal = [];
              let Toalbal = []
                data.push({
                    propertyId:temp.propertyId,
                    Ownername : Ownname,
                    PreviousBalance: PrevBal,
                    CurrentBalance:Currbal,
                    TotalBalance: Toalbal,
                    details: "",
                    Message: <Button type="primary">Send</Button>
                })
                Ownname.push(temp.owner.ownerName);
                PrevBal.push(temp.tax.previousHouseTax);
                Currbal.push(temp.tax.currentHouseTax);
                Toalbal.push(temp.tax.currentTotalTax)
          })

        const { Header, Footer, Sider, Content } = Layout;
        return (
            <Spin spinning={this.state.loading}>
            <Layout className="layout">
            
        <Header >
            <img src={logo} className="logo" style={{'width':'80px'}} />
            <span style={{textAlign:'center'}}>
                <span className='kannada-font'>ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಗ್ರಾಮಪಂಚಾಯತ್ ಕರ್ಯಾಲಯ,ಆಂಥೂರ್-582 205</span>
            </span>
        </Header>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
        <Link to='Dashboard'>Home &nbsp; |</Link> 
        </Menu.Item>
         <Menu.Item key="app">
         <Link to='Property-Tax'> Property Tax  &nbsp; |</Link>
        </Menu.Item>
        <Menu.Item key="Tap Water Tax ">
            Tap Water Tax  &nbsp; |
        </Menu.Item>
        <Menu.Item key="Reports">
           Reports &nbsp; |
        </Menu.Item>
        <Menu.Item key="Logout" onClick={this.handLogOut}>
           Logout
        </Menu.Item>
        <Menu.Item key="Username">
           Hello {sessionStorage.getItem('UserName')}
        </Menu.Item>
      </Menu>
      
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div className="site-layout-content">
            <Row>
            <Col span={24}>
            <Table columns={columns} dataSource={data} onChange={this.onChange} size="small"/>
            </Col>
        </Row>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Copyright ©2020 Thantrick Business Solution, All Right reserved</Footer>
        </Layout>
        </Spin>
        );
        }
}
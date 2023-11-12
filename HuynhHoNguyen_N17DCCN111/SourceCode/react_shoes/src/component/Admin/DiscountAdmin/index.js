import Page from '../Pages/Page';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import EditDiscount from './EditDiscount';
import { Button } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

function DiscountAdmin(){
    const hostname = "http://localhost:8080";
    const [discount, setdiscount] = useState([])
    const [updateDis, setupdateDis] = useState("")
    const [addDis, setaddDis] = useState("")
    const [dis, setdis] = useState("")
    const [showDis, setShowDis] = useState(false);

    useEffect(() => {
        axios.get(hostname+'/api/discount/get')
        .then((Response)=>{
              console.log(" get list discount success")  
              const data = Response.data;
              setdiscount(data)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })

      }, [])
      
      const handleShow = (e) =>{
        setdis(e)
        setShowDis(true);
      } 

      const AddhandleShow = () =>{
        setdis("")
        setShowDis(true);
      } 

        //update category
        discount.filter((dis,index)=>{
            if(dis.id === updateDis.id){
                dis = updateDis
            }
        })

        //add category
        if(addDis !== ""){
            let temp = [];
            discount.filter((dis) =>{
                temp.push(dis)
            })
            temp.push(addDis)
            setdiscount(temp);
            setaddDis("")
        }

      const convertdate = (e)=>{
        var parts = e.split(' ');
        var part = parts[0].split('/');
        var mydate = new Date(part[2], part[1] - 1, part[0]); 
        var time1 = new Date();
        return mydate.getTime()<time1.getTime();
      }

    return(
        <>
            <Page
            title="Giảm Giá"
            breadcrumbs={[{ name: 'Discount', active: true }]}
            className="TablePage"
          >
            <Row>
              <Col style={{textAlign:'end'}}>
                    <Button variant="outline-primary" size='sm' onClick={AddhandleShow}  >Thêm</Button>
                    <EditDiscount   shows={showDis} closes={setShowDis} discounts={dis}  adds={setaddDis} updates={setupdateDis} />
              </Col>
            </Row>
              <Row>
                <Col>
                  <Card className="mb-3">
                    <CardHeader>Giảm Giá Sản Phẩm</CardHeader>
                      <Row style={{textAlign:'end'}} >
                      <Form inline className="cr-search-form">
                          <MdSearch
                            // onClick={getFilterSearch}
                            style={{marginLeft:10,marginBottom:10,cursor:'pointer'}}
                            size="25"
                            className="cr-search-form__icon-search text-secondary"
                          />
                          <Input 
                          style={{marginTop:5,marginLeft:10,width: 250}}
                            type="search"
                            autoComplete="off"
                            className="cr-search-form__input"
                            placeholder="Search..."
                            id="ws"
                          />
                      </Form>
                      </Row>
                    <CardBody>
                      <Row>
                        <Col>
                          <Card body>
                            <Table {...{ ['hover']: true }}>
                              <thead>
                                <tr>
                                  <th style={{color:"black",fontWeight:500}}>#</th>
                                  <th  style={{color:"black",fontWeight:500}} >Mã Giảm Giá</th>
                                  <th  style={{color:"black",fontWeight:500}} >Phần Trăm Giảm</th>
                                  <th  style={{color:"black",fontWeight:500}} >Thời Hạn</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {discount.map((dis,index) =>(
                                        <tr onClick={(e) =>handleShow(dis)} >
                                        <th style={{color:'#212529', fontWeight:600}} scope="row">{index+1}</th>
                                        <th style={{color:'#212529', fontWeight:400}}>{dis.id}</th>
                                        <th style={{color:'#212529', fontWeight:400}}>{dis.percent}</th>
                                        <th style={{color:'#212529', fontWeight:400}}>
                                          {(convertdate(dis.deadline) == true)?
                                          <p style={{color:'red'}}>{dis.deadline}</p>
                                          :
                                          <p  style={{color:'black'}}>{dis.deadline}</p>
                                          }
                                        </th>
                                        </tr>
                                  ))}
                              </tbody>
                            </Table>
                          </Card>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
          </Page>
        </>
    )
}export default DiscountAdmin;
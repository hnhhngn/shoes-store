import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button,Image,Modal } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { Card,CardBody,CardHeader,Col,Form,FormGroup,Input,Label} from 'reactstrap';

function ConfirmOrder(props){
    const hostname = "http://localhost:8080"; 
    const [category, setcategory] = useState([])
  
   
    // order detail 
    var OrderDetail = props.orders.listOrderdetail || []
    var listPro = props.pro || []
    var tokenStr = localStorage.getItem("token");

    useEffect(() => {
        axios.get(hostname+'/api/category/get')
        .then((Response)=>{
              console.log(" get list category success")  
              const data = Response.data;
              setcategory(data)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })

      }, [])

      const handleClose = () =>{
        props.closes(false);
    } 


      // duyệt đơn hàng
      const AcceptOrder = () =>{         
        const config = {
            headers: {"Authorization" : `Bearer_${tokenStr}`}
        };

        axios.post(hostname+'/api/orders/accept',props.orders,config)
        .then((Response)=>{

            // success
            handleClose();
            props.deletes(props.orders.id)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })
      }

      // hủy đơn hàng
      const DeniedOrder = () =>{
        const config = {
            headers: {"Authorization" : `Bearer_${tokenStr}`}
        };

        axios.post(hostname+'/api/orders/cancel',props.orders,config)
        .then((Response)=>{
                // success
                handleClose()
                props.deletes(props.orders.id)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })
      }

      
      // hoàn thành  đơn hàng
      const ConfirmOrder = () =>{
        const config = {
            headers: {"Authorization" : `Bearer_${tokenStr}`}
        };

        axios.post(hostname+'/api/orders/confirm',props.orders,config)
        .then((Response)=>{              
                // success
                handleClose()
                props.deletes(props.orders.id)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })
      }

       //time 
       const getTime=(time)=>{
        var time = new Date(time);
        return  time.toLocaleString('en-GB') ;
       }


       //ham cover id sang name 
       const idToName = (id) => {
        var name = "";
        const List = listPro.filter((product) => {
           
          if(product.id === id){
            name = product.name;
            return name;
          }
        })
        return name;
    }

     //ham cover id sang mota 
     const idToMota = (id) => {
        var mota = "" ;
        const List = listPro.filter((product) => {
          if(product.id === id){
            mota = product.description;
            return mota;
          }
        })
        return mota;
    }

    //ham cover id sang category 
    const idToCate = (id) => {
        var cateid = "";
        const List = listPro.filter((product) => {
          if(product.id === id){
            category.filter((cate)=>{
                if(cate.id === product.categoryid){
                    cateid = cate.description;
                    return cateid;
                }
            })
            return cateid;
          }
        })
        return cateid;
    }
       

    const idToUrl = (id) => {
        var u ;
        const number = 0;
        const url = listPro.filter((product) => {   
           if(product.id === id && product.listimage){            
            u = product.listimage[number].url;
            return product.listimage[number].url;
           }
           
        })
        return u;
    }


    let JsxContent = OrderDetail.map((order, index) => {

        return  <Card  style={{marginTop:10}}  className="form_product">
                    <CardHeader>Sản Phẩm {index+1}</CardHeader>
                    <CardBody>
                        <Form>
                        <FormGroup row>
                            <Image src={idToUrl(order.productid)}
                            style={{width:170,height:120,marginLeft:180}}/>
                            <Label style={{marginLeft:230,marginTop:70,color:'black',fontWeight:400}} for="exampleText" sm={2}>Số Lượng</Label>
                            <Col>
                            <Input  disabled="disabled" style={{marginTop:70,width:330,fontSize:16}} value={order.quantity}  type="text" id="quantity"  />
                            </Col>
                            <Label style={{marginLeft:580,color:'black',fontWeight:400}} for="exampleText" sm={2}>Size</Label>
                            <Col>
                            <Input  disabled="disabled"  value={order.size}  type="number" id="quantity"  />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label  style={{color:'black',fontWeight:400}}  for="exampleText" sm={2}>Tên Sản Phẩm</Label>
                            <Col>
                                <Input  disabled="disabled" style={{width:330,fontSize:16}} value={idToName(order.productid)} type="text" id="name"  />
                            </Col>
                            <Label  style={{marginLeft:50,color:'black',fontWeight:400}}  for="exampleText" sm={2}>Mã Sản Phẩm</Label>
                            <Col>
                                <Input  disabled="disabled" style={{width:330,fontSize:16}}  value={order.productid} type="text" id="id"  />
                            </Col>
                            
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{color:'black',fontWeight:400}}  for="exampleText" sm={2}>Mô Tả</Label>
                            <Col>
                                <Input  disabled="disabled" style={{width:330,fontSize:16}} value={idToMota(order.productid)}  type="textarea" id="description"  />
                            </Col>
                            <Label  style={{marginLeft:50,color:'black',fontWeight:400}} for="exampleText" sm={2}>Loại</Label>
                            <Col>
                            <Input  disabled="disabled" style={{width:330,fontSize:16}} value={idToCate(order.productid)} type="text" id="category"  />
                            </Col>
                        </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
    })


    var payment =   props.orders.paymentEntity  || ""  

    var jsxUnconfirm = <> 
                            {
                                (payment.name === "SHIPCOD"?
                                <Button variant="danger" onClick={DeniedOrder} >
                                Hủy Đơn
                                </Button>
                                :
                               ""
                                )
                            }
                            <Button variant="success" onClick={AcceptOrder} >
                                Duyệt Đơn
                            </Button>
                        </>
    var jsxConfirm = <> 
                            {
                               (payment.name === "SHIPCOD"?
                                <Button variant="danger" onClick={DeniedOrder} >
                                Hủy Đơn
                                </Button>
                                :
                                ""
                                )
                            }  
                            <Button variant="success" onClick={ConfirmOrder} >
                            Hoàn Thành
                            </Button>
                        </>

           

    return(
        <>
            <Modal className="modal_product" size='xl' show={props.shows} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:'blue',fontSize:20}}>
                    {(props.check ==="UNCONFIRM"?"Duyệt Đơn Hàng":(props.check ==="DELIVERING"?"Đã Duyệt":
                    (props.check ==="CANCEL"?"Hủy Đơn":"Hoàn Thành")))}
                    </Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Card className="form_product">
                            <CardHeader>Đơn Hàng</CardHeader>
                            <CardBody>
                                <Form>
                                <FormGroup row>
                                    <Label style={{color:'black',fontWeight:400}} for="exampleText" sm={2}>Mã Đơn Hàng</Label>
                                    <Col>
                                        <Input disabled="disabled"  style={{width:330,fontSize:16}} value={props.orders.id} type="text" id="id"  />
                                    </Col>
                                    <Label style={{marginLeft:50,color:'black',fontWeight:400}} for="exampleText" sm={2}>Thời Gian</Label>
                                    <Col>
                                    <Input disabled="disabled"  style={{width:330,fontSize:16}} value={getTime(props.orders.createdDate)}  type="datetime" id="createdDate"  />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label style={{color:'black',fontWeight:400}}  for="exampleText" sm={2}>Người Đặt</Label>
                                    <Col>
                                        <Input disabled="disabled"  style={{width:330,fontSize:16}} value={props.orders.fullname} type="text" id="name"  />
                                    </Col>
                                    <Label style={{marginLeft:50,color:'black',fontWeight:400}} for="exampleText" sm={2}>Đơn Giá</Label>
                                    <Col >
                                        <CurrencyFormat disabled="disabled" style={{width:330,fontSize:16}} value={props.orders.total} id="price" style={{width:330}}  thousandSeparator={true} suffix={' vnđ '}  autoComplete='off' required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                   
                                    <Label  style={{color:'black',fontWeight:400}}   for="exampleText" sm={2}>Email</Label>
                                    <Col>
                                    <Input disabled="disabled" style={{width:330,fontSize:16}} value={props.orders.email} type="email" id="email"  />
                                    </Col>
                                    <Label style={{marginLeft:50,color:'black',fontWeight:400}} for="exampleText" sm={2}> Số Điện Thoại </Label>
                                    <Col>
                                        <Input disabled="disabled" style={{width:330,fontSize:16}} value={props.orders.phone} type="tel" id="phone"  />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label style={{color:'black',fontWeight:400}}  for="exampleText" sm={2}>Dịa Chỉ</Label>
                                    <Col sm={10}>
                                        <Input disabled="disabled" style={{fontSize:16}} value={props.orders.address} type="textarea" id="address"  />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label  style={{color:'black',fontWeight:400}}   for="exampleText" sm={2}>Phương thức thanh toán</Label>
                                    <Col>
                                    <Input disabled="disabled" style={{width:330,fontSize:16}} value={payment.name} type="text" id="pttt"  />
                                    </Col>
                                    <Label style={{marginLeft:50,color:'black',fontWeight:400}} for="exampleText" sm={2}>Mã Thanh toán</Label>
                                    <Col>
                                        <Input disabled="disabled" style={{width:330,fontSize:16}} value={payment.url} type="text" id="url"  />
                                    </Col>
                                </FormGroup>
                            </Form>
                            </CardBody>
                        </Card>
                        {JsxContent}
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Close
                    </Button>
                    {(props.check ==="UNCONFIRM"?jsxUnconfirm:(props.check ==="DELIVERING"?jsxConfirm:<></>))}
                </Modal.Footer>
            </Modal>
        </>
    )
}export default ConfirmOrder;
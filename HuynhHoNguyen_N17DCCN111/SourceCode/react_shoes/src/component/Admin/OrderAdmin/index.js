import Page from '../Pages/Page';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Button, ButtonGroup, Dropdown, DropdownButton, Image, Pagination} from 'react-bootstrap';
import axios from 'axios';
import { useRef } from 'react';
import ConfirmOrder from './ConfirmOrder';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

  // DELIVERING,DELIVERED,UNCONFIRM,CANCEL;
function OrderAdmin(){
    const hostname = "http://localhost:8080"; 
    const [listOrder, setlistOrder] = useState([{ listOrderdetail: [{ id: 0 }] }],[{listimage:[{url : "a"}]}]);
    const [listProduct, setlistProduct] = useState([{ name: "" }])
    const [OrderdetailPro, setOrderdetailPro] = useState([])
    const [show, setShow] = useState(false);
    const [Order, setOrder] = useState("")
    const [deleteOrder, setdeleteOrder] = useState("UNCONFIRM")
    const [screenName, setscreenName] = useState("Chưa Duyệt")
    const [totalpage, settotalpage] = useState(0)
    const [pagepresent, setpagepresent] = useState(0)
    const [type, settype] = useState("UNCONFIRM")
    const limit = 8;
    const handleShow = (e) =>{
      var or ;
      listOrder.map((order, index) => {
        if(order.id === e){
          or = order
          return or;
        }
      })

      // get product 
      let listpro = [];
      or.listOrderdetail.filter((ordetail)=>{
          listProduct.filter((pro)=>{
            if(pro.id === ordetail.productid){
              listpro.push(pro)
            }
          })
      })
      
      setOrderdetailPro(listpro)
      setOrder(or);
      setShow(true)
    } ;

    var tokenStr = localStorage.getItem("token");

    const config = {
        headers: {"Authorization" : `Bearer_${tokenStr}`}
    };
    
    const handleClick=(e)=>{
      setscreenName(e.target.value)
      axios.get(hostname+'/api/orders/admin/page?page=1&size='+limit+'&type='+e.target.id,config)
      .then((response) => {
          settype(e.target.id)
          console.log("get order admin success ");
          const data = response.data;
          settotalpage(data.totalpage)
          setpagepresent(data.page)
          setdeleteOrder(e.target.id)
          setlistOrder(data.listResult)
      })
      .catch((error) => {
        setlistOrder([])
        console.log(error.response.data.message)
      })
    }

    useEffect(() => {
      
      axios.get(hostname+'/api/orders/admin/page?page=1&size='+limit+'&type='+type,config)
          .then((response) => {
            console.log("get order admin sucess ");
            const data = response.data;
            settotalpage(data.totalpage)
            setpagepresent(data.page)
              setlistOrder(data.listResult)

          })
          .catch((error) => alert(error.response.data.message))
    }, [])

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            let listId = [];
            listOrder.map((order) => {
                order.listOrderdetail.map((detail) => {
                    if (listId.indexOf(detail.productid) === -1) listId.push(detail.productid);
                })
            })
            let listTemp = [];
            listId.map((id) => {
                axios.get(hostname+`/api/product/id/${id}`)
                    .then((response => {
                        listTemp.push(response.data);
                    }))
                    .catch((error) => console.log(error.response))
            })
            setTimeout(() => {
                setlistProduct(listTemp);
            }, 1000);
        }
      }, [listOrder])


       //time 
    const getTime=(time)=>{
      var time = new Date(time);
      var theyear = time.getFullYear();
      var themonth = time.getMonth() + 1;
      var thetoday = time.getDate();
      var theHours = time.getHours();
      var theMinute = time.getUTCMinutes();
      var str = thetoday+"/"+themonth +"/"+theyear  + "\t\t\t"+theHours+":"+theMinute;
     //  time.toLocaleString();
      return str;
     }


       //ham cover id sang name 
        const idToName = (id) => {
          const List = listProduct.filter((product) => {
              return product.id == id
          })
          if (List.length === 0) return "";
          else return List[0].name;
      }

      const prevpage =() =>{
        let number = pagepresent - 1;
        axios.get(hostname+'/api/orders/admin/page?page='+number+'&size='+limit+'&type='+type,config)
        .then((Response)=>{
          console.log("get order admin sucess ");
          const data = Response.data;
          settotalpage(data.totalpage)
          setpagepresent(data.page)
          setlistOrder(data.listResult)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })
    }

    const getFilterSearch =()=>{
      var title = document.getElementById("ws").value;
      searchOrder(title)
  }

    const searchOrder =(e) =>{
      // if(title === "") return false;
      axios.get(hostname+'/api/orders/admin/page?page=1&size='+limit+'&type='+type+'&title='+e,config)
      .then((Response)=>{
        console.log("get order admin sucess ");
        const data = Response.data;
        settotalpage(data.totalpage)
        setpagepresent(data.page)
        setlistOrder(data.listResult)
          })
      .catch((error) =>{
              console.log("error "+error.response)
          })
  }

  const nextpage =() =>{
    let number = pagepresent + 1;
    axios.get(hostname+'/api/orders/admin/page?page='+number+'&size='+limit+'&type='+type,config)
      .then((Response)=>{
        console.log("get order admin sucess ");
        const data = Response.data;
        settotalpage(data.totalpage)
        setpagepresent(data.page)
        setlistOrder(data.listResult)
          })
      .catch((error) =>{
              console.log("error "+error.response)
          })
    }

    const changepage =(e) =>{
      var number = (e.target.text);
      axios.get(hostname+'/api/orders/admin/page?page='+number+'&size='+limit+'&type='+type,config)
      .then((Response)=>{
        console.log("get order admin sucess ");
        const data = Response.data;
        settotalpage(data.totalpage)
        setpagepresent(data.page)
        setlistOrder(data.listResult)
          })
      .catch((error) =>{
              console.log("error "+error.response)
          })
      }

      
         //setting pagination
         let actives = pagepresent;
         let items = [];
         for (let number = 1; number <= totalpage; number++) {
             items.push(
                 <Pagination.Item onClick={(e) => changepage(e)}  key={number} active={number === actives}>
                     {number}
                 </Pagination.Item>,
             );
         }
         let startItem = (actives-1)*8 +1;
         let endItem = startItem + listOrder.length - 1;


      let JsxContent = listOrder.map((order, index) => {
        let price = order.total || 0;
        let payment = order.paymentEntity || {name:""}
        // get value product
        let infoName = order.listOrderdetail.map((detail,index) => {
          let totalname = idToName(detail.productid) ;
          return <p style={{color:'#212529', fontWeight:400}}>{" "+totalname}</p>
        })

        let infoQuantity = order.listOrderdetail.map((detail,index) => {
          let totalquantity = detail.quantity ;
          return <p style={{color:'#212529', fontWeight:400}}>{totalquantity}</p>
        })

       

        return  <> 
                  <tr onClick={ (e)=>handleShow(order.id)} >
                    <th style={{color:'#212529', fontWeight:600}} scope="row">{((pagepresent-1)*limit)+index+1}</th>
                    <th style={{color:'#212529', fontWeight:400}}>{order.id}</th>
                    <th style={{color:'#212529', fontWeight:400}}>{getTime(order.createdDate)}</th>
                    <th style={{color:'#212529', fontWeight:400}}>{order.fullname}</th>
                    <th style={{color:'#212529', fontWeight:400}}>{infoName}</th>
                    <th style={{color:'#212529', fontWeight:400}}>{infoQuantity}</th>
                    <th style={{color:'#212529', fontWeight:400}}>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</th>
                    <th style={{color:'#212529', fontWeight:400}}>{payment.name}</th>
                    <th style={{color:'#212529', fontWeight:400}} >
                      {(order.status == "DELIVERED"?
                      <p style={{color:'green'}}>{order.status}</p>
                      :"")}
                      {(order.status == "CANCEL"?
                      <p style={{color:'red'}}>{order.status}</p>
                      :"")}
                      {(order.status == "DELIVERING"?
                      <p style={{color:'blue'}}>{order.status}</p>
                      :"")}
                      {(order.status == "UNCONFIRM"?
                      <p style={{color:'purple'}}>{order.status}</p>
                      :"")}
                      </th>
                  </tr>
              </>

    })

     //remove order
    listOrder.filter((order,index)=>{
      if(order.id === deleteOrder){
        listOrder.splice(index,1);
      }
	  })

    return(
        <>
          <Page
            title="Đơn Hàng"
            breadcrumbs={[{ name: 'Orders', active: true }]}
            className="TablePage"
          >
            <Row>
              <Col style={{textAlign:'end'}}>
                <ConfirmOrder shows={show} pro={OrderdetailPro}  check={type} deletes={setdeleteOrder}  orders={Order} closes={setShow} title="Duyệt Đơn Hàng"  />
                  <ButtonGroup onClick={(e)=>handleClick(e)} style={{textAlign:'end'}}>
                    <Button style={{width:150,color:'purple'}}  className="btntest"  id="UNCONFIRM" value = "Chưa Duyệt" >Chưa Duyệt</Button>
                    <Button style={{width:150,color:'blue',marginLeft:10}} className="btntest"   id="DELIVERING" value = "Đã Duyệt" >Đã Duyệt</Button>
                    <Button style={{width:150,color:'red',marginLeft:10}} className="btntest"  id="CANCEL" value = "Hủy Đơn" >Hủy Đơn</Button>
                    <Button style={{width:150,color:'green',marginLeft:10}} className="btntest" id="DELIVERED" value = "Hoàn Thành" >Hoàn Thành</Button>
                </ButtonGroup>
              </Col>
            </Row>
              <Row>
                <Col>
                  <Card className="mb-3">
                    <CardHeader>{screenName}</CardHeader>
                      <Row style={{textAlign:'end'}} >
                        <div style={{display:'flex'}}>
                        <Form inline className="cr-search-form">
                          <MdSearch
                            onClick={getFilterSearch}
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
                      <DropdownButton style={{fontSize:18,width:110,height:30,marginLeft:10,marginTop:10}} as={ButtonGroup} 
                      key='Info' id={`dropdown-variants-Info`}
                      variant='Info'  title="Lọc"  >     
                      <Dropdown.Item  style={{fontSize:16,textAlign:'center'}} eventKey="1"  active>- Tất Cả -</Dropdown.Item>
                    </DropdownButton>
                    </div>
                      </Row>
                    <CardBody>
                      <Row>
                        <Col>
                          <Card body>
                            <Table {...{ ['hover']: true }}>
                              <thead>
                                <tr>
                                  <th style={{color:"black",fontWeight:500}}>#</th>
                                  <th width="150" style={{color:"black",fontWeight:500}} >Mã Hóa Đơn</th>
                                  <th width="150" style={{color:"black",fontWeight:500}} >Thời Gian</th>
                                  <th width="200" style={{color:"black",fontWeight:500}} >Người Đặt</th>
                                  <th width="450" style={{color:"black",fontWeight:500}} >Tên Sản Phẩm</th>
                                  <th width="150" style={{color:"black",fontWeight:500}} >Số Lượng</th>
                                  <th width="150" style={{color:"black",fontWeight:500}} >Đơn Giá</th>
                                  <th width="150" style={{color:"black",fontWeight:500}} >Thanh Toán</th>
                                  <th width="150" style={{color:"black",fontWeight:500}} >Tình Trạng</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
                                {JsxContent}
                              </tbody>
                            </Table>
                          </Card>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row >
          <Col style={{textAlign:'end'}}>
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                      {(pagepresent == 1)?
                      <li  id ="btnprev" className="page-item disabled" >
                        <a className="page-link page-link-prev" style={{cursor:"pointer"}}  onClick={prevpage} aria-label="Previous" tabindex="-1" aria-disabled="true">
                          <span aria-hidden="true"><i className="icon-long-arrow-left"></i></span>Prev
                        </a>
                      </li>
                    :
                    <li  id ="btnprev" className="page-item " >
                      <a className="page-link page-link-prev" style={{cursor:"pointer"}}  onClick={prevpage} aria-label="Previous" tabindex="-1" aria-disabled="true">
                        <span aria-hidden="true"><i className="icon-long-arrow-left"></i></span>Prev
                        </a>
                    </li>
                      }
                    <div style={{marginTop:18,marginRight:10}}>
                      <Pagination>{items}</Pagination>
                   </div>
                   {(pagepresent == totalpage || totalpage == 0)?
                              <li id ="btnnext" className="page-item disabled"   >
                                   <a class="page-link page-link-next" style={{cursor:"pointer"}} onClick={nextpage}  aria-label="Next">
                                       Next <span aria-hidden="true"><i className="icon-long-arrow-right"></i></span>
                                   </a>
                               </li>   
                               :
                               <li id ="btnnext" className="page-item ">
                                 <a class="page-link page-link-next" style={{cursor:"pointer"}} onClick={nextpage}  tabindex="-1" aria-disabled="true" aria-label="Next">
                                     Next <span aria-hidden="true"><i className="icon-long-arrow-right"></i></span>
                                 </a>
                             </li>   
                          }                
                      </ul>
                    </nav>
              </Col>
            </Row>
          </Page>
        </>
    )
}export default OrderAdmin;
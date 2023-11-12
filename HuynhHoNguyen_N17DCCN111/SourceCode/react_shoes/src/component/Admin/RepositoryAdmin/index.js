import Page from '../Pages/Page';
import React, { Profiler, useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import EditRepository from './EditRepository';
import { Button, ButtonGroup, Image, Pagination } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

function RepositoryAdmin(){
    const [repository, setrepository] = useState([])
    const [updateRes, setupdateRes] = useState("")
    const [addRes, setaddRes] = useState("")
    const [res, setres] = useState("")
    const [showRes, setShowRes] = useState(false);
    const [product, setproduct] = useState("")
    const [listProduct, setlistProduct] = useState([{ name: "" }])
    const [listPageProduct, setlistPageProduct] = useState([{listimage:{url:""}}])
    const [title, settitle] = useState("PHIẾU NHẬP")
    const [totalpage, settotalpage] = useState(0)
    const [pagepresent, setpagepresent] = useState(0)
    const [type, settype] = useState("PHIEUNHAP")

    const hostname = "http://localhost:8080"; 
    var tokenStr = localStorage.getItem("token");
    var limit = 8;

    const config = {
        headers: {"Authorization" : `Bearer_${tokenStr}`}
    };

    useEffect(() => {
        axios.get(hostname+'/api/repository/admin/page?page=1&size='+limit+'&type='+type,config)
        .then((Response)=>{
              console.log(" get list repository success ")  
              const data = Response.data;
              settotalpage(data.totalpage)
              setpagepresent(data.page)
                setrepository(data.listResult)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })

      }, [])


      
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            let listId = [];
            repository.map((res) => {
                    if (listId.indexOf(res.productdetail.productid) === -1) listId.push(res.productdetail.productid);
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
            }, 500);
        }
      }, [repository])

      
      const handleShow = (e) =>{
        var p ;
            listProduct.filter((pro)=>{
          if(pro.id === e.productdetail.productid){
              p = pro;
              return p;
          } 
        })
        
        setproduct(p)
        setres(e)
        setShowRes(true);
      } 

      const AddhandleShow = () =>{
        setres("")
        setShowRes(true);
      } 

        //update res
        repository.filter((res,index)=>{
            if(res.id === updateRes.id){
                res = updateRes
            }
        })

        //add res
        if(addRes !== ""){
            let temp = [];
            repository.filter((res) =>{
                temp.push(res)
            })
            temp.push(addRes)
            setrepository(temp);
            setaddRes("")
        }

        const idToUrl = (id) => {
          var u ;
          const url = listProduct.filter((product) => {   
             if(product.id === id && product.listimage){            
              u = product.listimage[0].url;
              return product.listimage[0].url;
             }
             
          })
          return u;
      }

         
    const handleClick=(e)=>{
      if(e.target.id === "TONKHO"){
        settitle(e.target.value)
        settype(e.target.id)

        axios.get(hostname+'/api/product/page?page=1&size=4')
        .then((Response)=>{
              console.log(" get list product success")  
              const data = Response.data;
              settotalpage(data.totalpage)
              setpagepresent(data.page)
                setlistPageProduct(data.listResult)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })
      }else{
        if(e.target.id === "PHIEUXUAT"){
          alert(" tam thoi khong xu li ")
          return false;
        }
      // setscreenName(e.target.value)
      settitle(e.target.value)
      axios.get(hostname+'/api/repository/admin/page?page=1&size='+limit+'&type='+e.target.id,config)
      .then((response) => {
          console.log("get repository admin success ");
          const data = response.data;
          settype(e.target.id)
          settotalpage(data.totalpage)
          setpagepresent(data.page)
         
          setrepository(data.listResult)
      })
      .catch((error) => {
        setrepository([])
        console.log(error.response.data.message)
      })
      }
    }

    const prevpage =() =>{
      let number = pagepresent - 1;
      if(title === "Tồn Kho"){
        axios.get(hostname+'/api/product/page?page='+number+'&size=4')
        .then((Response)=>{
            console.log(" get list product success")  
            const data = Response.data;
            settotalpage(data.totalpage)
            setpagepresent(data.page)
            setlistPageProduct(data.listResult)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })
      }else{
      axios.get(hostname+'/api/repository/admin/page?page='+number+'&size='+limit+'&type='+type,config)
      .then((Response)=>{
        console.log("get repository admin success ");
        const data = Response.data;
        settotalpage(data.totalpage)
        setpagepresent(data.page)
          setTimeout(() => {
            setrepository(data.listResult)
        }, 500);
          })
      .catch((error) =>{
              console.log("error "+error.response)
          })
        }
    }

    const getFilterSearch =()=>{
      var titles = document.getElementById("ws").value;
      if(title === "Tồn Kho"){
        searchProduct(titles)
      }else{
        searchRepository(titles)
      }
  }

    const searchRepository =(e) =>{
      // if(title === "") return false;
      axios.get(hostname+'/api/repository/admin/page?page=1&size='+limit+'&type='+type+'&title='+e,config)
      .then((Response)=>{
        console.log("get repository admin success ");
        const data = Response.data;
        settotalpage(data.totalpage)
        setpagepresent(data.page)
          setTimeout(() => {
            setrepository(data.listResult)
        }, 500);
          })
      .catch((error) =>{
              console.log("error "+error.response)
          })
  }

  
  const searchProduct =(e) =>{
    // if(title === "") return false;
    axios.get(hostname+'/api/product/page?page=1&size=4&title='+e)
    .then((Response)=>{
      console.log(" get list product success")  
      const data = Response.data;
      settotalpage(data.totalpage)
      setpagepresent(data.page)
      setlistPageProduct(data.listResult)
        })
    .catch((error) =>{
            console.log("error "+error.response)
        })
}

  const nextpage =() =>{
    let number = pagepresent + 1;
    if(title === "Tồn Kho"){
      axios.get(hostname+'/api/product/page?page='+number+'&size=4')
      .then((Response)=>{
          console.log(" get list product success")  
          const data = Response.data;
          settotalpage(data.totalpage)
          setpagepresent(data.page)
          setlistPageProduct(data.listResult)
          })
      .catch((error) =>{
              console.log("error "+error.response)
          })
    }else{
    axios.get(hostname+'/api/repository/admin/page?page='+number+'&size='+limit+'&type='+type,config)
      .then((Response)=>{
        console.log("get repository admin success ");
        const data = Response.data;
        settotalpage(data.totalpage)
        setpagepresent(data.page)
        setTimeout(() => {
          setrepository(data.listResult)
      }, 500);
        
          })
      .catch((error) =>{
              console.log("error "+error.response)
          })
        }
    }

    const changepage =(e) =>{
      var number = (e.target.text);
      if(title === "Tồn Kho"){
        axios.get(hostname+'/api/product/page?page='+number+'&size=4')
        .then((Response)=>{
            console.log(" get list product success")  
            console.log(" get list product success")  
            const data = Response.data;
            settotalpage(data.totalpage)
            setpagepresent(data.page)
            setlistPageProduct(data.listResult)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })
      }else{
     
      axios.get(hostname+'/api/repository/admin/page?page='+number+'&size='+limit+'&type='+type,config)
      .then((Response)=>{
        console.log("get repository admin success ");
        const data = Response.data;
        settotalpage(data.totalpage)
        setpagepresent(data.page)
        setTimeout(() => {
          setrepository(data.listResult)
      }, 500);
          })
      .catch((error) =>{
              console.log("error "+error.response)
          })
        }
      }


      const idToUrlList = (id) => {
        var u ;
        const url = listPageProduct.filter((product) => {   
           if(product.id === id && product.listimage){            
            u = product.listimage[0].url;
            return product.listimage[0].url;
           }
        })
        return u;
    }

       let jsx = listPageProduct.map((product,index)=>{
          // let listimg = product.listimage||[url:""]
          // let images = listimg[0].url||""
          let name = product.name||""
          let id = product.id || ""
          let listsize = product.listsize || []
          let info = listsize.map((size,ind)=>{

            return  <>
                       <tr onClick={(e) =>handleShow(res)} >
                          <th style={{color:'#212529', fontWeight:600}} scope="row">{((pagepresent-1)*limit)+ind+1}</th>
                          <th style={{color:'#212529', fontWeight:400}}>{id}</th>
                          <th> 
                            <Image src={idToUrlList(product.id)} style={{width:80,height:50}} />
                          </th>
                          <th style={{color:'#212529', fontWeight:400}}>{name}</th>
                          <th style={{color:'#212529', fontWeight:400}}>{size.size}</th>
                          <th style={{color:'#212529', fontWeight:400}}>{size.inventory}</th>
                        </tr>
                    </>
            })

        return  <>
                  {info}
                </>

       })


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
       let endItem = startItem + repository.length - 1;


     

    return(
        <>
            <Page
            title="Kho Hàng"
            breadcrumbs={[{ name: 'Repository', active: true }]}
            className="TablePage"
          >
            <Row>
              <Col>
                    <Button variant="outline-primary" size='sm' onClick={AddhandleShow}  >Thêm</Button>
                    <EditRepository  shows={showRes} titles={title} closes={setShowRes}  products={product} repositorys={res}  adds={setaddRes} updates={setupdateRes} />
                    <div  style={{textAlign:'end'}}>
                    <ButtonGroup onClick={(e)=>handleClick(e)} style={{textAlign:'end'}}>
                        <Button style={{width:150,color:'blue'}} className="btntest" id="PHIEUNHAP" value = "Phiếu Nhập" >Phiếu Nhập</Button>
                        <Button style={{width:150,color:'purple',marginLeft:10}} className="btntest"  id="PHIEUXUAT" value = "Phiếu Xuất" >Phiếu Xuất</Button>
                        <Button style={{width:150,color:'green',marginLeft:10}} className="btntest" id="TONKHO" value = "Tồn Kho" >Tồn Kho</Button>
                    </ButtonGroup>
                    </div>
                   
              </Col>
            </Row>
              <Row>
                <Col>
                  <Card className="mb-3">
                    <CardHeader>{title}</CardHeader>
                      <Row style={{textAlign:'end'}} >
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
                      </Row>
                      {(title === "Tồn Kho")?
                      
                      <CardBody>
                      <Row>
                        <Col>
                          <Card body>
                            <Table {...{ ['hover']: true }}>
                            <thead>
                                <tr>
                                  <th  style={{color:"black",fontWeight:500}}>#</th>
                                  <th  style={{color:"black",fontWeight:500}} >Mã Sản Phẩm</th>
                                  <th  style={{color:"black",fontWeight:500}} >Ảnh</th>
                                  <th  style={{color:"black",fontWeight:500}} >Tên Sản Phẩm</th>
                                  <th  style={{color:"black",fontWeight:500}} >size</th>
                                  <th  style={{color:"black",fontWeight:500}} >Số Lượng Tồn</th>
                                </tr>
                              </thead>
                              <tbody>
                                {jsx}
                              </tbody>
                            </Table>
                          </Card>
                        </Col>
                      </Row>
                      </CardBody>
                      :
                    <CardBody>
                      <Row>
                        <Col>
                          <Card body>
                            <Table {...{ ['hover']: true }}>
                              <thead>
                                <tr>
                                  <th width="150" style={{color:"black",fontWeight:500}}>#</th>
                                  <th width="300" style={{color:"black",fontWeight:500}} >Mã Phiếu</th>
                                  <th width="200" style={{color:"black",fontWeight:500}} >Ảnh</th>
                                  <th width="250"  style={{color:"black",fontWeight:500}} >Mã Sản Phẩm</th>
                                  <th width="150" style={{color:"black",fontWeight:500}} >size</th>
                                  <th width="150" style={{color:"black",fontWeight:500}} >Số Lượng</th>
                                  <th width="250" style={{color:"black",fontWeight:500}} >Giá</th>
                                  <th width="250" style={{color:"black",fontWeight:500}} >Ngày Tạo</th>
                                  <th  width="150" style={{color:"black",fontWeight:500}} >Loại</th>
                                  <th  width="150" style={{color:"black",fontWeight:500}} >Người Tạo</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {repository.map((res,index) =>(
                                        <tr onClick={(e) =>handleShow(res)} >
                                        <th style={{color:'#212529', fontWeight:600}} scope="row">{((pagepresent-1)*limit)+index+1}</th>
                                        <th style={{color:'#212529', fontWeight:400}}>{res.id}</th>
                                        <th> 
                                        <Image src={idToUrl(res.productdetail.productid)} style={{width:80,height:50}} />
                                        </th>
                                        <th style={{color:'#212529', fontWeight:400}}>{res.productdetail.productid}</th>
                                        <th style={{color:'#212529', fontWeight:400}}>{res.productdetail.size}</th>
                                        <th style={{color:'#212529', fontWeight:400}}>{res.quantity}</th>
                                        <th style={{color:'#212529', fontWeight:400}}>{res.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</th>
                                        <th style={{color:'#212529', fontWeight:400}}>{res.datecreated}</th>
                                        <th style={{color:'#212529', fontWeight:400}}>{res.typeid}</th>
                                        <th style={{color:'#212529', fontWeight:400}}>{res.createdBy}</th>
                                        </tr>
                                  ))}
                              </tbody>
                            </Table>
                          </Card>
                        </Col>
                      </Row>
                    </CardBody>
                      }
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
}export default RepositoryAdmin;
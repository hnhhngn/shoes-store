import React from 'react'
import { useEffect,useState } from 'react'
import './style1.css'
import { Button} from 'react-bootstrap';
import Page from "../Pages/Page";
import { Doughnut , Bar} from 'react-chartjs-2';
import { CardBody, Dropdown, Input } from "reactstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Card, Col, Row } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

function ChartOrder(){
  const hostname = "http://localhost:8080";  
  const [values, setvalues] = useState([])
  const [listProduct, setlistProduct] = useState([])
  const [listsize, setlistsize] = useState([])
  const [isAll, setisAll] = useState(1)
  const [orderSuc, setorderSuc] = useState([0])
  const [orderCanc, setorderCanc] = useState([0])
  const [orderDeli, setorderDeli] = useState([0])
  const [orderUncon, setorderUncon] = useState([0])

  var tokenStr = localStorage.getItem("token");
  const config = {
      headers: {"Authorization" : `Bearer_${tokenStr}`}
  };

  useEffect(() => {
     
  }, [])

  const getColor = (availableColor = 'primary') => {
      if (typeof window === 'undefined') {
        return null;
      }
    
      const color = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(`--${availableColor}`);
    
      return color;
    };

    const MONTHS = []
    for(let i = 1;i <=12 ; i ++){
        MONTHS.push('Tháng '+i)
    }

  const getChartSellDataYear = (moreData = {}, moreData2 = {}) => {
      return {
        labels: ['dữ liệu'],
        datasets: [
          {
            label: 'Chưa Xác Nhận',
            backgroundColor: getColor('warning'),
            borderColor: getColor('warning'),
            barThickness: 40,
            barPercentage: 0.5,
            borderWidth: 1,
            data: orderUncon,
            ...moreData2,
          },
          {
            label: 'Đã Duyệt',
            backgroundColor: getColor('primary'),
            barThickness: 40,
            barPercentage: 0.5,
            borderColor: getColor('primary'),
            borderWidth: 1,
            data: orderDeli,
            ...moreData2,
          },
          {
            label: 'Hủy',
            backgroundColor: getColor('danger'),
            barThickness: 40,
            barPercentage: 0.5,
            borderColor: getColor('danger'),
            borderWidth: 1,
            data: orderCanc,
            ...moreData2,
          },
          {
            label: 'Hoàn Thành',
            backgroundColor: getColor('success'),
            barThickness: 40,
            barPercentage: 0.5,
            borderColor: getColor('success'),
            borderWidth: 1,
            data: orderSuc,
            ...moreData2,
          },
        ],
      };
    };


    const genPieData = () => {
      let finaldata = []
      finaldata.push(orderUncon[0])
      finaldata.push(orderDeli[0])
      finaldata.push(orderCanc[0])
      finaldata.push(orderSuc[0])
      return {
        datasets: [
          {
            data: finaldata,
            backgroundColor: [
              getColor('warning'),
              getColor('primary'),
              getColor('danger'),
              getColor('success'),
            ],
            label: 'Dataset 1',
          },
        ],
        labels: ['Chưa Xác Nhận', 'Đã Duyệt', 'Hủy', 'Hoàn Thành'],
      };
    };

    const checkdate=(v1,v2)=>{
      var p1 = v1.split('-');
      var p2 = v2.split('-');
      var mydatefrom = new Date(p1[0], p1[1] - 1, p1[2]); 
      var mydateto = new Date(p2[0], p2[1] - 1, p2[2]); 
      console.log(v1+"-"+mydatefrom+"-"+mydatefrom.getTime()+"-"+mydateto.getTime())
      return mydatefrom.getTime()<=mydateto.getTime();
    }

    const getProductByName = ()=>{
      var productdetailid = document.getElementById("size").value;
      let datefrom = document.getElementById("exampleDate").value
      let dateto = document.getElementById("exampleDate1").value
      console.log(datefrom+"-"+dateto)
      if(dateto === "" || datefrom === ""){
        alert("chọn ngày tháng năm")
        return false;
      }

      if(!checkdate(datefrom,dateto)){
        alert("datefrom phải nhỏ hơn hoặc bằng dateto")
        return false;
      }
      var p1 = datefrom.split('-');
      var p2 = dateto.split('-');
      let finalDateFrom = p1[2]+"/"+p1[1]+"/"+p1[0]
      let finalDateto = p2[2]+"/"+p2[1]+"/"+p2[0]
      if(isAll === 0 && productdetailid !== "" && productdetailid > 0){
        axios.get(hostname+'/api/orders/ttdonhang?mode=detail&id='+productdetailid+'&datefrom='+
        finalDateFrom+'&dateto='+finalDateto,config)
        .then((Response)=>{
          console.log(Response.data)
          let o1 = []
          o1.push(Response.data[0])
          setorderSuc(o1)
          let o2 = []
          o2.push(Response.data[1])
          setorderCanc(o2)
          let o3 = []
          o3.push(Response.data[2])
          setorderDeli(o3)
          let o4 = []
          o4.push(Response.data[3])
          setorderUncon(o4)
        })
        .catch((error) =>{
           console.log("error "+error.response)
        })
      }else if( productdetailid == 0 && isAll === 0){
        let proid = listsize[1].productid
        axios.get(hostname+'/api/orders/ttdonhang?mode=product&id='+proid+'&datefrom='+finalDateFrom+'&dateto='+finalDateto,config)
        .then((Response)=>{
          console.log(Response.data)
          let o1 = []
          o1.push(Response.data[0])
          setorderSuc(o1)
          let o2 = []
          o2.push(Response.data[1])
          setorderCanc(o2)
          let o3 = []
          o3.push(Response.data[2])
          setorderDeli(o3)
          let o4 = []
          o4.push(Response.data[3])
          setorderUncon(o4)
        })
        .catch((error) =>{
           console.log("error "+error.response)
        })
      }else if (isAll === 1){
        axios.get(hostname+'/api/orders/ttdonhang?mode=all&id=0&datefrom='+finalDateFrom+'&dateto='+finalDateto,config)
        .then((Response)=>{
          console.log(Response.data)
          let o1 = []
          o1.push(Response.data[0])
          setorderSuc(o1)
          let o2 = []
          o2.push(Response.data[1])
          setorderCanc(o2)
          let o3 = []
          o3.push(Response.data[2])
          setorderDeli(o3)
          let o4 = []
          o4.push(Response.data[3])
          setorderUncon(o4)
        })
        .catch((error) =>{
           console.log("error "+error.response)
        })
      }
    }


    const onSelectTag=(e, value)=>{
      if(value === null || value === ""){
        setisAll(1)
        let list = []
        setlistsize(list)
        return false
      } 
      setisAll(0)
      // parse data
      let str = value.split("-")
      let idpro = parseInt(str[0])
    

      let pro = "";
      listProduct.filter((data)=>{
        if(data.id == idpro){
          pro = data;
          return pro;
        }
      })
      console.log(pro.listsize)
      let temp = {
        id:0,
        size:"all"
      }
      let list = []
      list.push(temp)
      pro.listsize.filter((size)=>{
        list.push(size)
      })
      setlistsize(list)
    }

    const onInputChange=(event,value)=>{
      if(value === "" || value === null) return false
      console.log(value)   

      // get list product by name
      axios.get(hostname+'/api/product/page?page=1&size=5&title='+value)
      .then((Response)=>{
          console.log(" get list product by title success")  
          const data = Response.data;
          console.log(data.listResult)
          setlistProduct(data.listResult)
          // convert data
          let list = []
          data.listResult.filter((data)=>{
            let title = data.id+"-"+data.name
            list.push(title)
          })
          setvalues(list)
          })
      .catch((error) =>{
              console.log("error "+error.response)
          })
    }


    return(
        <>
            <Page title="THỐNG KÊ HÓA ĐƠN" breadcrumbs={[{ name: 'Chart Orders', active: true }]}>
            <Row style={{marginBottom:50}} >
                <div style={{display:'flex'}}>
                    <div style={{marginRight:20,marginTop:5}}  >
                    <Autocomplete options={values} style={{ width: 300 }}
                        onChange={onSelectTag}
                        onInputChange={onInputChange} 
                        renderInput={(params) =>
                        <TextField {...params} label="Chọn Sản Phẩm" variant="outlined" />}
                    />
                    </div>
                    <div className="details-filter-row details-row-size" style={{marginTop:5}}>
                      <label for="size">Size:</label>
                       <div className="select-custom">
                        <select name="size" id="size" className="form-control">
                          {listsize.map((pro) => 
                             <option value={pro.id} >{pro.size}</option>
                           )}
                        </select>
                      </div>
                    </div>
                    <div style={{display:'flex',marginTop:8}}>
                        <h4 style={{marginRight:20,marginTop:10}}>DateFrom</h4> 
                       <Input   type="date" name="date"  id="exampleDate"  placeholder="date placeholder"  />
                    </div>
                    <div  style={{display:'flex',marginLeft:20,marginTop:8}}>
                        <h4 style={{marginRight:20,marginTop:10}}>DateTo</h4>
                        <Input   type="date" name="date"  id="exampleDate1"  placeholder="date placeholder"  />
                    </div>
                    <Button style={{marginLeft:20}} variant="outline-primary" size='sm' 
                    className="btntest btnthongke" onClick={getProductByName} >Xem Dữ Liệu</Button>
                    </div>
                </Row>
                <Row>
                    <Col xl={6} lg={12} md={12} >
                        <Card >
                            <CardHeader>
                            <p style={{color:'black'}}> Biểu Đồ Tình Trạng Hóa Đơn</p>
                            </CardHeader>
                            <CardBody style={{width:600,height:600}} >
                            <Bar style={{height:500}} data={getChartSellDataYear()} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl={6} lg={12} md={12}>
                      <Card >
                        <CardHeader>
                        <p style={{color:'black'}}> Biểu Đồ Tình Trạng Hóa Đơn</p>
                        </CardHeader>
                        <CardBody style={{width:600,height:600}} >
                          <Doughnut style={{height:400}} data={genPieData()}  options={{
                              responsive: true,
                              maintainAspectRatio: true,
                            }} />
                        </CardBody>
                      </Card>
                    </Col>
                </Row>
        </Page>
        </>
    )
}export default ChartOrder;
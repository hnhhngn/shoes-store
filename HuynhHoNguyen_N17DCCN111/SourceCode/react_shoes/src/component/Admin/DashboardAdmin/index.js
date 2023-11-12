import Page from "../Pages/Page";
import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';
import { CardBody } from "reactstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Card, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function DashboardAdmin(){
  const hostname = "http://localhost:8080"; 
  var tokenStr = localStorage.getItem("token");
  const [doanhThu, setdoanhThu] = useState([])
  const [nhapHang, setnhapHang] = useState([])
  const [loinhuan, setloinhuan] = useState([])
  
  const config = {
    headers: {"Authorization" : `Bearer_${tokenStr}`}
  };

    useEffect(() => {

      // nhap hang
      axios.get(hostname+'/api/repository/doanhso/year',config)
      .then((Response)=>{
        setnhapHang(Response.data);

            // doanh thu 
          axios.get(hostname+'/api/orders/doanhthu/year',config)
          .then((Response)=>{
            setdoanhThu(Response.data);
            
            // // loi nhuan
            // let ln = []
            // for(let i = 0 ; i < 12 ; i++){
            //   ln.push( () )
            // }

          })
          .catch((error) =>{
              console.log("error "+error.response)
          })
      })
      .catch((error) =>{
          console.log("error "+error.response)
      })

     

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


      const DAYS  = []
      const data1 = []
      const data2 = []
      const data3 = []
      for(let i = 1;i <=30 ; i ++){
          DAYS.push(i)
          data1.push(i);
          data2.push(i+1);
          data3.push(i+2);
      }

      
    const MONTHS = []
    for(let i = 1;i <=12 ; i ++){
        MONTHS.push('Tháng '+i)
    }

    const getChartSellDataYear = (moreData = {}, moreData2 = {}) => {
        return {
          labels: MONTHS,
          datasets: [
            {
              label: 'Nhập Hàng',
              backgroundColor: getColor('secondary'),
              borderColor: getColor('secondary'),
              borderWidth: 1,
              // data: [11,15,8,19,0,45,12,8,8,8,8,8],
              data: nhapHang,
              ...moreData2,
            },
            {
              label: 'Doanh Thu',
              backgroundColor: getColor('primary'),
              borderColor: getColor('primary'),
              borderWidth: 1,
              // data: [13,14,8,17,28,35,17],
              data: doanhThu,
              ...moreData2,
            },
          ],
        };
      };
  
      var time = new Date();
      var thang = time.getMonth()+1;
      var nam = time.getFullYear();
      var ngay = time.getDate();

    return(
        <>  
        <Page title="DashBoard" breadcrumbs={[{ name: 'DashBoard', active: true }]}>
           
            <div style={{marginTop:50}}>
                <h1> Biểu Đồ Doanh Số Năm {nam} </h1>
            </div>
            <Row>
                <Col xl={10} lg={12} md={12} >
                    <Card>
                        <CardHeader>
                        <p style={{color:'black'}}>Doanh Số Năm {nam}</p>
                        </CardHeader>
                        <CardBody>
                        <Line data={getChartSellDataYear({ fill: false }, { fill: false })} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Page>
       
        </>
    )
}export default DashboardAdmin;
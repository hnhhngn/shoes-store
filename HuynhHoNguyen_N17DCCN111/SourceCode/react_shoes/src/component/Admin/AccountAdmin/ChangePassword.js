import Page from '../Pages/Page';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Label, Row, Table } from 'reactstrap';
import axios from 'axios';
import { Button, FormGroup } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

function ChangePassword(){
    const hostname = "http://localhost:8080";
  
	var tokenStr = localStorage.getItem("token");
	const config = {
		headers: {"Authorization" : `Bearer_${tokenStr}`}
	};
    
	const changePass = () =>{
		var oldpass = document.getElementById("passOld").value
		var newpass = document.getElementById("passNew").value
		var confirm = document.getElementById("passConfirm").value


		if(oldpass == "" || newpass == "" || confirm == ""){
            alert("không được để trống dữ liệu")
			return false;
		}

		const bodyParameters = {
            oldpassword:oldpass,
			newpassword:newpass,
			confirmpassword:confirm
         };

		axios.post(hostname+'/api/customers/password',bodyParameters,config)
        .then((Response)=>{
            console.log("change pass success")  
			alert("đổi mật khẩu thành công")
            })
        .catch((error) =>{
                console.log("error "+error.response)
				alert("mật khẩu cũ không chính xác")
        })	
	}

    return(
        <>
            <Page
            title="TÀI KHOẢN"
            breadcrumbs={[{ name: 'account', active: true }]}
            className="TablePage"
          >
            <Row>
              <Col style={{textAlign:'end'}}>
              </Col>
            </Row>
              <Row >
                  <div >
                  <Col >
                  <Card className="mb-3" style={{width:450}}>
                    <CardHeader>Đổi Mật Khẩu</CardHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <Card body>
							<Label for="exampleText"  style={{color:'black',fontWeight:500,fontSize:14}} >Mật Khẩu Cũ</Label>
							<Input style={{fontSize:14,width:400}}  type="password" id="passOld" autoComplete="off" name="id" required />
							<Label for="exampleText" style={{color:'black',fontWeight:500,fontSize:14}}>Mật Khẩu Mới</Label>
							<Input style={{fontSize:14,width:400}} type="password" id="passNew" name="id" required />
							<Label for="exampleText" style={{color:'black',fontWeight:500,fontSize:14}}>Xác Nhận Mật Khẩu</Label>
							<Input  style={{fontSize:14,width:400}} type="password" id="passConfirm" name="id" required />
                          </Card>
                        </Col>
                      </Row>
                      <Row>
						<Button variant="warning" style={{width:200,marginLeft:100}}  onClick={changePass}>Xác Nhận</Button>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                  </div>
              </Row>
          </Page>
        </>
    )
}export default ChangePassword;
import Page from '../Pages/Page';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Label, Row, Table } from 'reactstrap';
import axios from 'axios';
import { Button, FormGroup } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

function CreateAccount() {
  const hostname = "https://localhost:3000";
  var tokenStr = localStorage.getItem("token");
  const config = {
    headers: { "Authorization": `Bearer_${tokenStr}` }
  };

  const createAccount = () => {
    var gmail = document.getElementById("gmail").value
    var names = document.getElementById("name").value
    var pass = document.getElementById("password").value


    if (gmail == "" || names == "" || pass == "") {
      alert("không được để trống dữ liệu")
      return false;
    }

    const bodyParameters = {
      username: gmail,
      password: pass,
      name: names,
      email: gmail,
      rolename: [
        {
          name: "ADMIN"
        }
      ]
    };

    axios.post(hostname + '/api/users/create', bodyParameters, config)
      .then((Response) => {
        console.log(" success")
        alert("tạo tài khoản thành công")
      })
      .catch((error) => {
        console.log("error " + error.response)
        alert("gmail đã được sủ dụng")
      })
  }

  return (
    <>
      <Page
        title="TÀI KHOẢN"
        breadcrumbs={[{ name: 'account', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col style={{ textAlign: 'end' }}>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'end' }}>
          </Col>
        </Row>
        <Row >
          <Col >
            <Card className="mb-3" style={{ width: 650 }}>
              <CardHeader>Tạo Tài Khoản</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <Label for="exampleText" style={{ color: 'black', fontWeight: 500, fontSize: 14 }} >Gmail </Label>
                      <Input style={{ fontSize: 14, width: 400 }} type="email" id="gmail" autoComplete="off" name="id" required />
                      <Label for="exampleText" style={{ color: 'black', fontWeight: 500, fontSize: 14 }}>Họ Tên</Label>
                      <Input style={{ fontSize: 14, width: 400 }} type="text" id="name" name="id" required />
                      <Label for="exampleText" style={{ color: 'black', fontWeight: 500, fontSize: 14 }}>password</Label>
                      <Input style={{ fontSize: 14, width: 400 }} type="password" id="password" name="id" required />
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Button variant="warning" style={{ width: 200, marginLeft: 100 }} onClick={createAccount}  >Xác Nhận</Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    </>
  )
} export default CreateAccount;
import Page from '../Pages/Page';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import EditCategory from './EditCategory';
import { Button } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

function CategoryAdmin() {
  const hostname = "https://localhost:3000";
  const [category, setcategory] = useState([])
  const [updateCate, setupdateCate] = useState("")
  const [addCate, setaddCate] = useState("")
  const [cate, setcate] = useState("")
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(hostname + '/api/category/get')
      .then((Response) => {
        console.log(" get list category success")
        const data = Response.data;
        setcategory(data)
      })
      .catch((error) => {
        console.log("error " + error.response)
      })

  }, [])

  const handleShow = (e) => {
    setcate(e)
    setShow(true);
  }

  const AddhandleShow = () => {
    setcate("")
    setShow(true);
  }

  //update category
  category.filter((cate, index) => {
    if (cate.id === updateCate.id) {
      cate = updateCate
    }
  })

  //add category
  if (addCate !== "") {
    let temp = [];
    category.filter((cate) => {
      temp.push(cate)
    })
    temp.push(addCate)
    setcategory(temp);
    setaddCate("")
  }

  return (
    <>
      <Page
        title="LOẠi"
        breadcrumbs={[{ name: 'Category', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col style={{ textAlign: 'end' }}>
            <Button variant="outline-primary" size='sm' onClick={AddhandleShow}  >Thêm</Button>
            <EditCategory shows={show} closes={setShow} categorys={cate} adds={setaddCate} updates={setupdateCate} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>Loại Sản Phẩm</CardHeader>
              <Row style={{ textAlign: 'end' }} >
                <Form inline className="cr-search-form">
                  <MdSearch
                    // onClick={getFilterSearch}
                    style={{ marginLeft: 10, marginBottom: 10, cursor: 'pointer' }}
                    size="25"
                    className="cr-search-form__icon-search text-secondary"
                  />
                  <Input
                    style={{ marginTop: 5, marginLeft: 10, width: 250 }}
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
                            <th style={{ color: "black", fontWeight: 500 }}>#</th>
                            <th style={{ color: "black", fontWeight: 500 }} >Mã Loại</th>
                            <th style={{ color: "black", fontWeight: 500 }} >Tên Loại</th>
                            <th style={{ color: "black", fontWeight: 500 }} >Mô Tả</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.map((cate, index) => (
                            <tr onClick={(e) => handleShow(cate)} >
                              <th style={{ color: '#212529', fontWeight: 600 }} scope="row">{index + 1}</th>
                              <th style={{ color: '#212529', fontWeight: 400 }}>{cate.id}</th>
                              <th style={{ color: '#212529', fontWeight: 400 }}>{cate.name}</th>
                              <th style={{ color: '#212529', fontWeight: 400 }}>{cate.description}</th>
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
} export default CategoryAdmin;
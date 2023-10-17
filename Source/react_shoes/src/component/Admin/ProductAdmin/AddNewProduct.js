import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FormSelect, Image, Modal } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, FormText, Input, Label, Row, UncontrolledButtonDropdown } from 'reactstrap';
import './style1.css'
import NotificationSystem from 'react-notification-system';
import { ToastContainer, toast } from 'react-toastify';
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';

function AddNewProduct(props) {
    const [img, setimg] = useState([])
    const [category, setcategory] = useState([])
    const hostname = "https://localhost:3000";
    var tokenStr = localStorage.getItem("token");
    // {{host}}/api/image/uploadFile
    const handleClose = () => {
        setimg([])
        props.closes(false);
    }

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

    const uploadImage = (e) => {
        console.log("handle upload")
        if (img.length === 5) {
            // toast("Wow so easy !")
            alert("Giơi hạn ảnh là 5")
            return false;
        }
        let file = e.target.files[0];
        let formdata = new FormData();
        formdata.append("file", file);
        const header = {
            headers: { "Authorization": `Bearer_${tokenStr}` }
        };
        axios.post(hostname + '/api/image/uploadFile', formdata, header)
            .then((Response) => {
                console.log("upload image success " + Response.data.linkfile);
                let list = [];
                img.map((l) => {
                    list.push(l)
                })
                list.push(Response.data.linkfile)
                setimg(list)
            })
            .catch((error) => {
                console.log("error " + error.response);
            })
    }

    const createProduct = () => {
        // get value
        var tokenStr = localStorage.getItem("token");
        //  price convert 200,000 vnđ => 200000
        var splitPrice = document.getElementById("price").value.split(" ");
        var splitphay = splitPrice[0].split(",");
        var kq = "";
        for (var i = 0; i < splitphay.length; i++) {
            kq += splitphay[i]
        }

        // size 
        var cb = document.getElementsByName("cbox")
        var cbSize = [];
        var productSize = [];
        for (var j = 0; j < cb.length; j++) {
            if (cb[j].checked === true) {
                cbSize.push(cb[j].value)
                var temp = {
                    size: cb[j].value
                }
                productSize.push(temp)
            }
        }
        // chua chon size
        if (cbSize.length === 0) {
            alert("bạn chưa chọn size ")
            return false;
        }



        console.log(" image")
        // image 
        var productImage = [];
        for (var k = 0; k < img.length; k++) {
            var temp = {
                url: img[k]
            }
            productImage.push(temp)
        }
        // Date
        var d = new Date();
        var n = d.getDate();
        var t = d.getMonth() + 1;
        var y = d.getFullYear();
        var fullDate = n + "/" + t + "/" + y;


        console.log(" suc image")
        var names = document.getElementById("name").value
        var mota = document.getElementById("mota").value
        var prices = kq
        var colors = document.getElementById("color").value
        var unitypes = document.getElementById("unitype").value
        var categorys = document.getElementById("categorys").value



        if (names.length < 6 || mota.length < 4 || unitypes.length < 3) {
            alert("dữ liệu chưa hợp lệ")
            return false;
        }

        console.log(" body")
        const bodyParameters = {
            name: names,
            description: mota,
            price: prices,
            createddate: fullDate,
            createdby: "admin",
            color: colors,
            listsize: productSize,
            status: "INACTIVE",
            unitype: unitypes,
            listimage: productImage,
            categoryid: categorys
        };

        // let tam = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTYyNzEwMTYyOSwiZXhwIjoxNjMwMjU2NDAwfQ.lw1CDUiWJfTv7K4VJs4nSFhndZK1SmpLRy-6nbLUkpUlqBimGlNDVD9dzF5vjVp6bvapdjoT_qkL0ZZT5q5rbA";

        const header = {
            headers: { "Authorization": `Bearer_${tokenStr}` }
        };
        axios.post(hostname + '/api/product', bodyParameters, header)
            .then((Response) => {
                alert("create success")
                console.log(JSON.stringify(Response.data))
                handleClose()
                props.addpro(Response.data)
            })
            .catch((error) => {
                console.log("error " + error.response);
            })
    }

    const handleChangeImage = (e) => {
        console.log("url-" + URL.createObjectURL(e.target.files[0]))
        // setimg( {[e.target.name]: URL.createObjectURL(e.target.files[0])})
        setimg(URL.createObjectURL(e.target.files[0]));
    }

    //color
    const options = [
        { label: 'white', value: 'trắng' },
        { label: 'black', value: 'đen' },
        { label: 'red', value: 'đỏ' },
        { label: 'yellow', value: 'vàng' },
        { label: 'pink', value: 'hồng' },
        { label: 'blue', value: 'xanh dương' },
        { label: 'green', value: 'xanh lá' },
        { label: 'gray', value: 'xám' }
    ]

    const sizePro = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]

    const deleteImage = (e) => {
        img.filter((i, index) => {
            if (i == e) {
                img.splice(index, 1)
            }
        })
        let list = [];
        img.map((l) => {
            list.push(l)
        })
        setimg(list)

    }

    return (
        <>
            <div>
                <ToastContainer />
            </div>
            <Modal className="modal_product" size='xl' show={props.shows} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'blue', fontSize: 20 }}> {props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className="form_product">
                        <CardHeader>Sản Phẩm</CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Tên Sản Phẩm
                                    </Label>
                                    <Col sm={10}>
                                        <Input type="text" id="name" placeholder="Nhập tên sản phẩm"
                                            autoComplete="off" style={{ fontSize: 16 }} required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2} style={{ color: 'black', fontWeight: 400 }} >
                                        Mô Tả
                                    </Label>
                                    <Col sm={10}>
                                        <Input type="textarea" id="mota" placeholder="Mô tả sản phẩm" style={{ fontSize: 16 }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Giá
                                    </Label>
                                    <Col sm={10}>
                                        <CurrencyFormat id="price" thousandSeparator={true} suffix={' vnđ '}
                                            class="form-control" style={{ width: 210, fontSize: 16 }} autoComplete='off' required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Màu
                                    </Label>
                                    <Col sm={10}>
                                        <select id="color" class="form-control" style={{ width: 210, fontSize: 16 }}>
                                            {options.map(fbb =>
                                                <option key={fbb.key} value={fbb.label}>{fbb.value}</option>
                                            )};
                                        </select>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Thương Hiệu
                                    </Label>
                                    <Col sm={10}>
                                        <Input style={{ width: 210, fontSize: 16 }} type="text" id="unitype" placeholder="Nhập thương hiệu"
                                            autoComplete="off" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleFile" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Ảnh
                                    </Label>
                                    <Col sm={10}>
                                        <Input type="file" name="file" accept="image/*" className="w-100" onChange={(e) => uploadImage(e)} />
                                        <FormText color="muted">
                                            Tối đa 5 ảnh. Ảnh thứ nhất sẽ được chọn là ảnh đại diện sản phẩm
                                        </FormText>
                                        <Row>
                                            <div style={{ display: 'flex' }}>
                                                {
                                                    img.map((i) => (
                                                        <>
                                                            <div style={{ marginLeft: 20 }}>
                                                                <Image src={i} style={{ width: 150, height: 100 }} />
                                                                <label style={{ cursor: 'pointer', color: 'red', marginLeft: 50 }}
                                                                    onClick={(e) => deleteImage(i)}>xóa</label>
                                                            </div>
                                                        </>
                                                    )
                                                    )
                                                }
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col sm={10}>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Size
                                    </Label>
                                    <Col sm={10}>
                                        <Row>
                                            <div>
                                                <CheckboxGroup>
                                                    Select All <AllCheckerCheckbox style={{ marginRight: 20 }} />
                                                    {sizePro.map((size, index) => (
                                                        <label style={{ marginRight: 20 }}>
                                                            <Checkbox name="cbox" id="cbox" value={size} style={{ marginRight: 5 }}></Checkbox>
                                                            {size}
                                                        </label>
                                                    ))}
                                                </CheckboxGroup>
                                            </div>
                                        </Row>
                                    </Col>
                                </FormGroup>
                                <FormGroup tag="fieldset" row>
                                    <Label for="checkbox2" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Loại sản phẩm
                                    </Label>
                                    <Col sm={10}>
                                        <select name="categorys" id="categorys" class="form-control" style={{ width: 210, fontSize: 16 }}>
                                            {category.map((cate) =>
                                                <option value={cate.id} >{cate.description}</option>
                                            )}
                                        </select>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={createProduct}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} export default AddNewProduct;
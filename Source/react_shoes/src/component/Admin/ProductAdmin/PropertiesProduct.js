import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, Modal } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, FormText, Input, Label, Row, UncontrolledButtonDropdown } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function PropertiesProduct(props) {
    const hostname = "https://localhost:3000";
    const [category, setcategory] = useState([])
    const [edit, setedit] = useState(0)
    const [img, setimg] = useState([])
    const [sizePro, setsizePro] = useState([])
    const [discounts, setdiscounts] = useState("")
    var tokenStr = localStorage.getItem("token");


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

        //  setimg(image)
    }, [])


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


    const handleClose = () => {
        setedit(0)
        setimg([])
        setsizePro([])
        setdiscounts("")
        props.closes(false);
    }



    let image = props.products.listimage || []

    var size = props.products.listsize || []

    var status = props.products.status || ""

    var sales = props.sales || []

    var prosale = props.products.discount || ""

    // get discount
    if (props.shows === true && discounts === "" && edit === 0) {
        if (prosale !== null) {
            sales.filter((sale) => {
                if (sale.id === props.products.discount) {
                    setdiscounts(sale)
                }
            })
        } else {
            let disc = {
                id: 0
            }
            setdiscounts(disc)
        }
    }


    //  var sizePro = []
    // var sizePro = ["35","36","37","38","39","40","41","42","43","44","45"] 



    const uploadImage = (e) => {
        console.log("handle upload")
        var tokenStr = localStorage.getItem("token");

        if (image.length === 5 || img.length === 5) {
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

    const updateProduct = () => {
        let sta = document.getElementById("status").value
        let name = document.getElementById("name").value
        let mota = document.getElementById("mota").value
        let color = document.getElementById("color").value
        let unitype = document.getElementById("unitype").value
        let cate = document.getElementById("categorys").value
        let dis = document.getElementById("discount").value

        //price 2.000.000 vnđ => 2000000
        var splitPrice = document.getElementById("price").value.split(" ");
        var splitphay = splitPrice[0].split(",");
        var kq = "";
        for (var i = 0; i < splitphay.length; i++) {
            kq += splitphay[i]
        }
        var kqnew = parseInt(kq)

        // size 
        var cb = document.getElementsByName("cbox")
        var cbSize = [];
        for (var j = 0; j < cb.length; j++) {
            if (cb[j].checked === true) {
                cbSize.push(cb[j].value)
                var temp = {
                    size: cb[j].value
                }
                props.products.listsize.push(temp)
            }
        }

        //discount
        var ktra = 0;
        sales.filter((sale) => {
            if (sale.id == dis) {
                var parts = sale.deadline.split(' ');
                var part = parts[0].split('/');
                var mydate = new Date(part[2], part[1] - 1, part[0]);
                var time1 = new Date();
                if (mydate.getTime() < time1.getTime()) {
                    alert("hạn khuyến mãi sắp hết không thể áp dụng")
                    ktra = 1;
                    return ktra;
                }
            }
        })

        if (ktra === 0) {

            const header = {
                headers: { "Authorization": `Bearer_${tokenStr}` }
            };
            if (dis === 0 || dis === "0") {
                dis = null
            }


            if (name.length < 6 || mota.length < 4 || unitype.length < 3) {
                alert("dữ liệu chưa hợp lệ")
                return false;
            }

            // body
            props.products.status = sta;
            props.products.name = name;
            props.products.mota = mota;
            props.products.price = kqnew;
            props.products.unitype = unitype;
            props.products.categoryid = cate
            props.products.color = color
            props.products.discount = dis
            // props.products.listsize 
            // props.products.listimage = ""

            console.log(JSON.stringify(props.products))
            axios.put(hostname + '/api/product', props.products, header)
                .then((Response) => {
                    console.log("update product success ");
                    console.log(formatCurrency(Response.data.price))
                    props.updatess(Response.data)
                    localStorage.setItem("proprice", JSON.stringify(Response.data.price))
                    handleClose();
                })
                .catch((error) => {
                    console.log("error " + error.response);
                })
        }
    }

    const formatCurrency = (price) => {
        let newPrice = price || "";
        return newPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    const enableEdit = () => {
        let sta = document.getElementById("status")
        let name = document.getElementById("name")
        let mota = document.getElementById("mota")
        let price = document.getElementById("price")
        let color = document.getElementById("color")
        let unitype = document.getElementById("unitype")
        let cate = document.getElementById("categorys")
        let dis = document.getElementById("discount")

        if (sta.disabled) {
            sta.disabled = false;
            name.disabled = false;
            mota.disabled = false;
            price.disabled = false;
            color.disabled = false;
            unitype.disabled = false;
            cate.disabled = false;
            dis.disabled = false;

            // size

            var sizePro1 = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]
            var listsize = []
            sizePro1.filter((s, index) => {
                let num = 0;
                size.filter((si) => {
                    if (s == si.size) {
                        num = 1
                    }
                })
                if (num == 0) {
                    listsize.push(s)
                }
            })
            setsizePro(listsize);

            let list = []
            image.filter((i) => {
                list.push(i.url)
            })
            setimg(list)
            setedit(1)
        } else {
            sta.disabled = true;
            name.disabled = true;
            mota.disabled = true;
            price.disabled = true;
            color.disabled = true;
            unitype.disabled = true;
            cate.disabled = true;
            dis.disabled = true;

            setedit(0)
        }
    }


    const changediscount = () => {
        let dis = document.getElementById("discount").value

        if (dis === "0") {
            let disc = {
                id: 0,
                percent: "",
                deadline: ""
            }
            setdiscounts(disc)
            return true;
        }
        sales.filter((sale) => {
            if (sale.id == dis) {
                setdiscounts(sale)
            }
        })
    }


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
            <Modal className="modal_product" size='xl' show={props.shows} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'blue', fontSize: 20 }}> {props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(edit === 0 ?
                        <Button style={{ marginLeft: 945 }} onClick={enableEdit} className="btntest" variant="primary" >Hiệu Chỉnh</Button>
                        :
                        <Button style={{ marginLeft: 945 }} onClick={enableEdit} className="btntest" variant="primary" >Đóng Hiệu Chỉnh</Button>
                    )}
                    <Card className="form_product">
                        <CardHeader>Sản Phẩm</CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Label for="exampleText" style={{ color: 'black', fontWeight: 400 }} sm={2}>Mã Sản Phẩm</Label>
                                    <Col>
                                        <Input disabled="disabled" style={{ width: 210, fontSize: 16 }} value={props.products.id} type="text" />
                                    </Col>
                                    <Label style={{ marginLeft: 50, color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Tình Trạng</Label>
                                    <Col>
                                        {(status === "ACTIVE") ?
                                            <select id="status" class="form-control" disabled='disabled' defaultValue={status} style={{ width: 210, fontSize: 16, color: 'blue' }}>
                                                <option style={{ color: 'blue' }} value="ACTIVE">ACTIVE</option>
                                                <option style={{ color: 'red' }} value="INACTIVE">INACTIVE</option>
                                            </select>
                                            :
                                            <select id="status" class="form-control" disabled='disabled' defaultValue={status} style={{ width: 210, fontSize: 16, color: 'red' }}>
                                                <option style={{ color: 'blue' }} value="ACTIVE">ACTIVE</option>
                                                <option style={{ color: 'red' }} value="INACTIVE">INACTIVE</option>
                                            </select>
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Tên Sản Phẩm
                                    </Label>
                                    <Col sm={10}>
                                        <Input type="text" id="name" placeholder="Nhập tên sản phẩm"
                                            autoComplete="off" style={{ fontSize: 16 }} defaultValue={props.products.name} disabled='disabled' required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2} style={{ color: 'black', fontWeight: 400 }} >
                                        Mô Tả
                                    </Label>
                                    <Col sm={10}>
                                        <Input type="textarea" id="mota" disabled='disabled' defaultValue={props.products.description} placeholder="Mô tả sản phẩm" style={{ fontSize: 16 }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Giá
                                    </Label>
                                    <Col sm={10}>
                                        <CurrencyFormat id="price" thousandSeparator={true} suffix={' vnđ '}
                                            class="form-control" style={{ width: 210, fontSize: 16 }} disabled='disabled' value={props.products.price} autoComplete='off' required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Màu
                                    </Label>
                                    <Col sm={10}>
                                        <select id="color" class="form-control" disabled='disabled' defaultValue={props.products.color} style={{ width: 210, fontSize: 16 }}>
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
                                        <Input type="text" id="unitype" placeholder="Nhập thương hiệu"
                                            autoComplete="off" style={{ width: 210, fontSize: 16 }} defaultValue={props.products.unitype}
                                            disabled='disabled' />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleFile" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Ảnh
                                    </Label>
                                    <Col sm={10}>
                                        {/* {(edit === 1?
                                         <Input type="file" name="file" accept="image/*" className="w-100" onChange={(e)=>uploadImage(e)} />
                                        :"")} */}
                                        <FormText color="muted">
                                            Tối đa 5 ảnh. Ảnh thứ nhất sẽ được chọn là ảnh đại diện sản phẩm
                                        </FormText>
                                        <Row>
                                            <div style={{ display: 'flex' }}>
                                                {image.map((i) => (
                                                    <>
                                                        <div style={{ marginLeft: 20 }}>
                                                            <Image src={i.url} style={{ width: 150, height: 100 }} />

                                                        </div>
                                                    </>
                                                ))
                                                }
                                                {/* {
                                                 (edit === 1?
                                                    img.map((i)=>(
                                                        <>
                                                        <div style={{marginLeft:20}}>
                                                        <Image src={i} style={{width:150,height:100}}/>
                                                        <label style={{cursor:'pointer',color:'red',marginLeft:50}} 
                                                        onClick={(e)=>deleteImage(i)}>xóa</label>
                                                        </div>
                                                        </>
                                                        ))
                                                    :
                                                    image.map((i)=>(
                                                        <>
                                                        <div style={{marginLeft:20}}>
                                                        <Image src={i.url} style={{width:150,height:100}}/>
                                                        
                                                        </div>
                                                        </>
                                                        ))
                                                 )
                                            }   */}
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
                                                    {size.map((size, index) => (
                                                        <label style={{ marginRight: 20 }}>
                                                            <Checkbox id="cbox" disabled='disabled' checked='true' value={size.size} style={{ marginRight: 5 }}></Checkbox>
                                                            {size.size}
                                                        </label>
                                                    ))}
                                                </CheckboxGroup>
                                            </div>
                                            <div>
                                                {(edit === 1 ?
                                                    <CheckboxGroup>
                                                        Select All <AllCheckerCheckbox style={{ marginRight: 20 }} />
                                                        {sizePro.map((size, index) => (
                                                            <label style={{ marginRight: 20 }}>
                                                                <Checkbox name="cbox" id="cbox" value={size} style={{ marginRight: 5 }}></Checkbox>
                                                                {size}
                                                            </label>))}
                                                    </CheckboxGroup>
                                                    : "")}
                                            </div>

                                        </Row>
                                    </Col>
                                </FormGroup>
                                <FormGroup tag="fieldset" row>
                                    <Label for="checkbox2" sm={2} style={{ color: 'black', fontWeight: 400 }}>
                                        Loại sản phẩm
                                    </Label>
                                    <Col sm={10}>
                                        <select name="categorys" id="categorys"
                                            defaultValue={props.products.categoryid} disabled='disabled'
                                            class="form-control" style={{ width: 210, fontSize: 16 }}>
                                            {category.map((cate) =>
                                                <option value={cate.id} >{cate.description}</option>
                                            )}
                                        </select>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" style={{ color: 'black', fontWeight: 400 }} sm={2}>Mã Khuyến Mại</Label>
                                    <Col>
                                        <select name="discount" id="discount" onChange={changediscount}
                                            defaultValue={discounts.id} disabled="disabled"
                                            class="form-control" style={{ width: 210, fontSize: 16 }}>
                                            {(discounts !== "" ?
                                                <>
                                                    <option value="0" >Không</option>
                                                    {sales.map((sale) => (
                                                        <option value={sale.id} >{sale.id}</option>
                                                    ))}
                                                </>
                                                :
                                                <>
                                                    <option value="0" >Không</option>
                                                    {sales.map((sale) => (
                                                        <option value={sale.id} >{sale.id}</option>
                                                    ))}
                                                </>
                                            )}
                                        </select>
                                    </Col>
                                    <Label style={{ marginLeft: 50, color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Phần Trăm Giảm</Label>
                                    <Col>
                                        <Input disabled="disabled" style={{ width: 210, fontSize: 16 }} value={discounts.percent} type="text" />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Label style={{ color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Thời Hạn</Label>
                                        <Col>
                                            <Input disabled="disabled" style={{ width: 210, fontSize: 16 }} value={discounts.deadline} type="text" />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    {(edit === 1 ?
                        <Button variant="warning" onClick={updateProduct}>
                            Xác Nhận
                        </Button>
                        : "")}
                </Modal.Footer>
            </Modal>
        </>
    )
} export default PropertiesProduct;
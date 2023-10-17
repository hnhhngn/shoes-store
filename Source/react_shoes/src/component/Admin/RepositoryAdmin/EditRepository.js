import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function EditRepository(props) {
    const [btnEditRes, setbtnEditRes] = useState("")
    const [changeS, setchangeS] = useState("")
    const hostname = "https://localhost:3000";
    const [values, setvalues] = useState([])
    var tokenStr = localStorage.getItem("token");
    const [listProduct, setlistProduct] = useState([])

    //add product 
    const [productSelect, setproductSelect] = useState({ listsize: [], listimage: [{ url: "" }] })
    const config = {
        headers: { "Authorization": `Bearer_${tokenStr}` }
    };


    const handleClose = () => {
        setbtnEditRes("")
        setproductSelect({ listsize: [], listimage: [{ url: "" }] })
        props.closes(false);
    }

    const enableEdit = () => {
        var quantitys = document.getElementById("quantity")
        var sizes = document.getElementById("size")
        var prices = document.getElementById("price")

        if (quantitys.disabled) {
            quantitys.disabled = false;
            sizes.disabled = false;
            prices.disabled = false;
            setbtnEditRes("1")
        } else {
            quantitys.disabled = true;
            sizes.disabled = true;
            prices.disabled = true;
            setbtnEditRes("")
        }

    }

    // convert value
    var img = props.products.listimage || [{ url: "" }]
    var prosize = props.repositorys.productdetail || ""
    var listsize = props.products.listsize || []

    useEffect(() => {
        setchangeS(prosize.size)
    }, [])

    const updateRepository = () => {
        var quantitys = document.getElementById("quantity").value
        var idpro = document.getElementById("size").value
        //  price convert 200,000 vnđ => 200000
        var splitPrice = document.getElementById("price").value.split(" ");
        var splitphay = splitPrice[0].split(",");
        var kq = "";
        for (var i = 0; i < splitphay.length; i++) {
            kq += splitphay[i]
        }

        var prodetail;
        listsize.filter((pro) => {
            if (pro.id == idpro) {
                prodetail = pro
                return prodetail
            }
        })

        props.repositorys.quantity = quantitys
        props.repositorys.productdetail = prodetail
        props.repositorys.price = kq

        axios.put(hostname + '/api/repository/update', props.repositorys, config)
            .then((Response) => {
                let data = props.repositorys;
                props.updates(data)
                // success
                handleClose();
            })
            .catch((error) => {
                console.log("error " + error.response)
            })
    }

    //time 
    const getTime = (time) => {
        var time = new Date(time);
        var theyear = time.getFullYear();
        var themonth = time.getMonth() + 1;
        var thetoday = time.getDate();
        var theHours = time.getHours();
        var theMinute = time.getUTCMinutes();
        var str = thetoday + "/" + themonth + "/" + theyear + " " + theHours + ":" + theMinute;
        return str;
    }

    const addRepository = () => {
        var quantitys = document.getElementById("quantity").value
        var sizes = document.getElementById("size").value

        if (quantitys < 0 || quantitys == "" || quantitys == "0") {
            alert("số lượng không hợp lệ")
            return false;
        }

        //  price convert 200,000 vnđ => 200000
        var splitPrice = document.getElementById("price").value.split(" ");

        var splitphay = splitPrice[0].split(",");
        var kq = "";
        for (var i = 0; i < splitphay.length; i++) {
            kq += splitphay[i]
        }

        if (kq === "" || kq < 1000) {
            alert("số tiền không hợp lệ")
            return false;
        }

        var time = new Date();
        var times = getTime(time) + ":00";

        var prodetail;
        productSelect.listsize.filter((pro) => {
            if (pro.id == sizes) {
                prodetail = pro
                return prodetail
            }
        })

        let type = 'PHIEUNHAP'
        var dis = {
            typeid: type,
            datecreated: times,
            productdetail: prodetail,
            quantity: quantitys,
            price: kq
        }

        axios.post(hostname + '/api/repository/create', dis, config)
            .then((Response) => {

                // success
                console.log(Response.data)
                props.adds(Response.data)
                handleClose();
            })
            .catch((error) => {
                console.log("error " + error.response)
            })
    }


    const changeSize = (e) => {
        console.log(e.target.value + " -" + e.target.index)
        setchangeS(e.target.value)
    }

    if (btnEditRes === "" && props.repositorys === "") {
        setbtnEditRes("2")
    }

    // convert value
    var d = props.repositorys.datecreated || ""
    var str = d.split(" ")
    var date = str[0].split("/")
    var dates = date[2] + "-" + date[1] + "-" + date[0] + "T" + str[1];

    var jsxProperties = <Form>
        <FormGroup row>
            <Label style={{ color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Mã Phiếu</Label>
            <Col><Input disabled="disabled" style={{ width: 300, fontSize: 16 }} defaultValue={props.repositorys.id} type="text" id="id" name="id" required /></Col>
            <Label style={{ color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Loại Phiếu</Label>
            <Col>
                <Input disabled="disabled" style={{ width: 300, fontSize: 16 }}
                    defaultValue={props.repositorys.typeid} type="text" id="id" name="id" required />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label style={{ color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Người Tạo</Label>
            <Col><Input disabled="disabled" style={{ width: 300, fontSize: 16 }} defaultValue={props.repositorys.createdBy} type="text" id="id" name="id" required /></Col>
            <Label style={{ color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Ngày Tạo</Label>
            <Col><Input type="text" style={{ width: 300, fontSize: 16 }} disabled="disabled" autoComplete='off'
                value={d} id="deadline" name="deadline" required /></Col>
        </FormGroup>
        <FormGroup row>
            <Label style={{ color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Giá</Label>
            <Col><CurrencyFormat id="price" class="form-control" thousandSeparator={true} suffix={' vnđ '} style={{ width: 300, fontSize: 16 }}
                disabled="disabled" value={props.repositorys.price} autoComplete='off' required /></Col>
            <Label style={{ color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Số Lượng</Label>
            <Col>
                <Input disabled="disabled" style={{ width: 300, fontSize: 16 }} defaultValue={props.repositorys.quantity} type="number" id="quantity" />
            </Col>
        </FormGroup>
        <FormGroup row style={{ marginTop: 30 }}>
            <Image src={img[0].url}
                style={{ width: 170, height: 120, marginLeft: 180 }} />
            <Label style={{ marginLeft: 205, color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Size</Label>
            <Col >
                <select name="size" id="size" value={changeS} style={{ width: 300, fontSize: 16 }} disabled="disabled" onChange={(e) => changeSize(e)} className="form-control">
                    {listsize.map((pro) =>
                        <option value={pro.id}>{pro.size}</option>
                    )}
                </select>
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="exampleText" style={{ color: 'black', fontWeight: 400 }} sm={2}>Mã Sản Phẩm</Label>
            <Col><Input disabled="disabled" style={{ width: 300, fontSize: 16 }} defaultValue={props.products.id} type="text" id="id" name="id" required /></Col>
            <Label for="exampleText" style={{ color: 'black', fontWeight: 400 }} sm={2}>Tên Sản Phẩm</Label>
            <Col><Input type="text" style={{ width: 300, fontSize: 16 }} disabled="disabled" autoComplete='off' value={props.products.name} id="deadline" name="deadline" required /></Col>
        </FormGroup>
    </Form>


    const onSelectTag = (e, value) => {
        if (value === null || value === "") {
            return false
        }
        // parse data
        let str = value.split("-")
        let idpro = parseInt(str[0])

        let pro = "";
        listProduct.filter((data) => {
            if (data.id == idpro) {
                pro = data;
                return pro;
            }
        })

        //  enable 
        var quantitys = document.getElementById("quantity")
        var sizes = document.getElementById("size")
        var prices = document.getElementById("price")

        quantitys.disabled = false;
        sizes.disabled = false;
        prices.disabled = false;

        setproductSelect(pro)
    }

    const onInputChange = (event, value) => {
        if (value === "" || value === null) return false
        console.log(value)

        // get list product by name
        axios.get(hostname + '/api/product/page?page=1&size=5&title=' + value)
            .then((Response) => {
                console.log(" get list product by title success")
                const data = Response.data;
                console.log(data.listResult)
                setlistProduct(data.listResult)
                // convert data
                let list = []
                data.listResult.filter((data) => {
                    let title = data.id + "-" + data.name
                    list.push(title)
                })
                setvalues(list)
            })
            .catch((error) => {
                console.log("error " + error.response)
            })
    }

    var jsxAdd = <Form>

        <FormGroup row>
            <Label style={{ color: 'black', fontWeight: 400 }} style={{ color: 'blue' }} for="exampleText" sm={2}>Chọn Sản Phẩm</Label>
        </FormGroup>
        <FormGroup row>
            <Autocomplete options={values} style={{ width: 300 }}
                onChange={onSelectTag}
                onInputChange={onInputChange}
                renderInput={(params) =>
                    <TextField {...params} label="Chọn Sản Phẩm" variant="outlined" />}
            />
        </FormGroup>
        <FormGroup row>
            <Label style={{ color: 'blue', marginTop: 20, fontWeight: 400 }} for="exampleText" sm={2}>Thông Tin Phiếu</Label>
        </FormGroup>
        <FormGroup row>
            <Image src={productSelect.listimage[0].url}
                style={{ width: 170, height: 120, marginLeft: 180 }} />

            <Label style={{ marginLeft: 205, marginTop: 70, color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Số Lượng</Label>
            <Col>
                <Input disabled="disabled" style={{ width: 300, fontSize: 16, marginTop: 70 }}
                    max='1000' min='1' defaultValue='1' type="number" id="quantity" required />
            </Col>

        </FormGroup>
        <FormGroup row style={{ marginTop: 20 }} >
            <Label style={{ color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Size</Label>
            <Col>

                <select name="size" id="size" style={{ width: 300, fontSize: 16 }} disabled="disabled" className="form-control">
                    {productSelect.listsize.map((pro) =>
                        <option value={pro.id}>{pro.size}</option>
                    )}
                </select>
            </Col>
            <Label style={{ color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Giá</Label>
            <Col>
                <CurrencyFormat id="price" style={{ width: 300, fontSize: 16 }} class="form-control"
                    thousandSeparator={true} suffix={' vnđ '} disabled="disabled" autoComplete='off' required />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label style={{ color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Mã Sản Phẩm</Label>
            <Col><Input disabled="disabled" style={{ width: 300, fontSize: 16 }} value={productSelect.id} type="text" id="id" name="id" required /></Col>
            <Label style={{ color: 'black', fontWeight: 400 }} for="exampleText" sm={2}>Tên Sản Phẩm</Label>
            <Col><Input disabled="disabled" style={{ width: 300, fontSize: 16 }} type="text" autoComplete='off' value={productSelect.name} id="deadline" name="deadline" required /></Col>
        </FormGroup>
    </Form>


    return (
        <>
            <Modal className="modal_product" size='xl' show={props.shows} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'blue', fontSize: 20 }}>
                        Kho Hàng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(props.repositorys !== "") ?
                        <Button style={{ marginLeft: 940 }} variant="primary" className="btntest" onClick={enableEdit} >Hiệu Chỉnh</Button>
                        : ""}
                    <Card className="form_product">
                        <CardHeader>
                            <div>
                                {props.titles}
                            </div>
                        </CardHeader>
                        <CardBody>
                            {(props.repositorys !== "") ? jsxProperties : jsxAdd}
                        </CardBody>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Close
                    </Button>
                    {(btnEditRes === "1" ?
                        <Button variant="warning" onClick={updateRepository}>
                            Xác Nhận
                        </Button>
                        : (btnEditRes === "2" && props.repositorys === "" ?
                            <Button variant="warning" onClick={addRepository}>
                                Thêm
                            </Button>
                            : "")
                    )}
                </Modal.Footer>
            </Modal>
        </>
    )
} export default EditRepository;
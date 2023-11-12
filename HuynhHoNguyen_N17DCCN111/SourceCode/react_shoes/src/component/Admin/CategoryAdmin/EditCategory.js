import axios from 'axios';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Card,CardBody,CardHeader,Col,Form,FormGroup,Input,Label} from 'reactstrap';

function EditCategory(props){
    const hostname = "http://localhost:8080"; 
    var tokenStr = localStorage.getItem("token");
    const [btnEdit, setbtnEdit] = useState("")

    const config = {
        headers: {"Authorization" : `Bearer_${tokenStr}`}
    };

    const handleClose = () =>{
        setbtnEdit("")
        props.closes(false);
    } 

    const updateCategory = ()=>{
        var name = document.getElementById("name").value
        var mota = document.getElementById("mota").value

        if(name.length < 3 || mota.length <3 ){
            alert("dữ liệu không hợp lệ")
            return false
        }

        props.categorys.name = name
        props.categorys.description = mota

        axios.put(hostname+'/api/category',props.categorys,config)
        .then((Response)=>{
            let data= props.categorys;
            props.updates(data)
            // success
            handleClose();
        })
        .catch((error) =>{
                console.log("error "+error.response)
            })
    }

    const addCategory = ()=>{
        var name = document.getElementById("name").value
        var mota = document.getElementById("mota").value
        
        if(name.length < 3 || mota.length <3 ){
            alert("dữ liệu không hợp lệ")
            return false
        }

        var cate = {
                    name:name,
                    description:mota
                    }

        axios.post(hostname+'/api/category',cate,config)
        .then((Response)=>{
            props.adds(Response.data)
            // success
            handleClose();
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })
    }

    const enableEdit=()=>{
        var name = document.getElementById("name")
        var mota = document.getElementById("mota")
        if(name.disabled){
            name.disabled  = false;
            mota.disabled  = false;
            setbtnEdit("1")
        }else{
            name.disabled  = true;
            mota.disabled  = true;
            setbtnEdit("")
        }
      
    }

    if(btnEdit === "" && props.categorys === ""){
        setbtnEdit("2")
    }

    var jsxProperties  =  <Form >
                             <div style={{textAlign:'center'}}>
                                <FormGroup row>
                                    <Label style={{color:'black',fontWeight:400}} for="exampleText" sm={2}>Mã Loại</Label>
                                    <Col><Input disabled="disabled"   style={{width:500,fontSize:16}}  defaultValue={props.categorys.id} type="text" id="id" required /></Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label style={{color:'black',fontWeight:400}} for="exampleText" sm={2}>Tên Loại</Label>
                                    <Col><Input disabled="disabled"   style={{width:500,fontSize:16}}  autoComplete='off' defaultValue={props.categorys.name} type="text" id="name"  name="name" required /> </Col>
                                </FormGroup>
                                <FormGroup row>                              
                                    <Label style={{color:'black',fontWeight:400}}  for="exampleText" sm={2}>Mô Tả</Label>
                                    <Col><Input  disabled="disabled"  style={{width:500,fontSize:16}}  autoComplete='off' defaultValue={props.categorys.description} type="text" id="mota"  name="mota" required /></Col>
                                </FormGroup>
                                </div>
                            </Form>
     var jsxAdd          =  <Form>
                                <FormGroup row>
                                    <Label style={{color:'black',fontWeight:400}} for="exampleText" sm={2}>Tên Loại</Label>
                                    <Col><Input type="text" id="name"  style={{width:500,fontSize:16}}  autoComplete='off' name="name"  required/> </Col>
                                </FormGroup>
                                <FormGroup row>                              
                                    <Label style={{color:'black',fontWeight:400}}  for="exampleText" sm={2}>Mô Tả</Label>
                                    <Col><Input type="text" id="mota"  style={{width:500,fontSize:16}}  autoComplete='off'  name="mota"  required/></Col>
                                </FormGroup>
                            </Form>

    return(
        <>
            <Modal className="modal_product" size='xl' show={props.shows} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:'blue',fontSize:20}}>
                        Loại
                    </Modal.Title>
                    
                </Modal.Header>
                    <Modal.Body>
                    {(props.categorys !== "")?
                        <Button style={{marginLeft: 940}} className="btntest" onClick={enableEdit} variant="primary" >Hiệu Chỉnh</Button>
                        :""}
                        <Card className="form_product">
                            <CardHeader>Loại Sản Phẩm</CardHeader>
                            <CardBody>
                            {(props.categorys !== "")?jsxProperties:jsxAdd}
                            </CardBody>
                        </Card>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Close
                    </Button>
                    {(btnEdit === "1"?
                        <Button variant="warning" onClick={updateCategory}>
                            Xác Nhận
                        </Button>
                     :(btnEdit === "2" && props.categorys === ""? 
                        <Button variant="warning" onClick={addCategory}>
                            Thêm
                        </Button>
                     : "")
                    )}
                   
                </Modal.Footer>
            </Modal>
        </>
    )
}export default EditCategory;
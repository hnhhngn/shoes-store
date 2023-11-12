import axios from 'axios';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Card,CardBody,CardHeader,Col,Form,FormGroup,Input,Label} from 'reactstrap';

function EditDiscount(props){
    const hostname = "http://localhost:8080"; 
    var tokenStr = localStorage.getItem("token");
    const [btnEditDis, setbtnEditDis] = useState("")

    const config = {
        headers: {"Authorization" : `Bearer_${tokenStr}`}
    };

    const handleClose = () =>{
        setbtnEditDis("")
        props.closes(false);
    } 

           //time 
           const getTime=(time)=>{
            var time = new Date(time);
            var theyear = time.getFullYear();
            var themonth = time.getMonth() + 1;
            var thetoday = time.getDate();
            var theHours = time.getHours();
            var theMinute = time.getUTCMinutes();
            var str = thetoday+"/"+themonth +"/"+theyear  + " "+theHours+":"+theMinute;
            return str;
           }

    const updateDis = ()=>{
        var percents = document.getElementById("percent").value
        var deadlines = document.getElementById("deadline").value

        var time = new Date(deadlines);
        var times = getTime(time) + ":00";

        props.discounts.percent = percents
        props.discounts.deadline = times

        axios.put(hostname+'/api/discount',props.discounts,config)
        .then((Response)=>{
            let data= props.discounts;
            props.updates(data)
            // success
            handleClose();
        })
        .catch((error) =>{
                console.log("error "+error.response)
            })
    }

    
    const checkdate = (e)=>{
        let value = e || ""
        var parts = value.split(' ');
        var part = parts[0].split('/');
        var h = parts[1].split(':');
        var mydate = new Date(part[2], part[1] - 1, part[0]); 
        var time1 = new Date();
        return mydate.getTime() <= time1.getTime();
    }

    const addDis = ()=>{
        var ids = document.getElementById("id").value
        var percents = document.getElementById("percent").value
        var deadlines = document.getElementById("deadline").value
        //format time
        var time = new Date(deadlines);
        var times = getTime(time) + ":00";
        
        // console.log("check - "+ ids +"-"+percents+"-"+times+"-"+deadlines)

        if(percents > 100 || percents < 0.1){
            alert("phần trăm giảm không hợp lệ")
            return false;
        }

        // check time
        if(checkdate(times)){
            alert("thời gian không hợp lệ")
            return false;
        }

        var dis = {
                    id:ids,
                    percent:percents,
                    deadline:times
                    }

                
        axios.post(hostname+'/api/discount',dis,config)
        .then((Response)=>{
            props.adds(Response.data)
            // success
            handleClose();
            })
        .catch((error) =>{
                alert("mã giảm giá đã được sử dụng")
                console.log("error "+error.response.data)
            })
    }

    const enableEdit=()=>{
        var percents = document.getElementById("percent")
        var deadlines = document.getElementById("deadline")
        
        if(percents.disabled){
            percents.disabled  = false;
            deadlines.disabled  = false;
            setbtnEditDis("1")
        }else{
            percents.disabled  = true;
            deadlines.disabled  = true;
            setbtnEditDis("")
        }
      
    }

    if(btnEditDis === "" && props.discounts === ""){
        setbtnEditDis("2")
    }
    
    // convert value
    var d = props.discounts.deadline || ""
    var str = d.split(" ")
    var date = str[0].split("/")
    var dates = date[2]+"-"+date[1]+"-"+date[0]+"T"+str[1];

    var jsxProperties  =  <Form>
                                <FormGroup row>
                                    <Label style={{color:'black',fontWeight:400}} for="exampleText" sm={2}>Mã Giảm Giá</Label>
                                    <Col><Input disabled="disabled"  style={{width:500,fontSize:16}} defaultValue={props.discounts.id} type="text" id="id" name="id" required /></Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label style={{color:'black',fontWeight:400}} for="exampleText" sm={2}>Phần Trăm Giảm</Label>
                                    <Col><Input disabled="disabled"  style={{width:500,fontSize:16}} type="number" 
                                     max='100' step='0.1' min='0.1' autoComplete='off' defaultValue={props.discounts.percent} type="" id="percent"  name="percent" required /> </Col>
                                </FormGroup>
                                <FormGroup row>                              
                                    <Label style={{color:'black',fontWeight:400}} for="exampleText" sm={2}>Thời Hạn</Label>
                                    <Col>
                                    <Input  type="datetime-local"  style={{width:500,fontSize:16}} disabled="disabled"
                                     autoComplete='off' defaultValue={dates} id="deadline"  name="deadline" required /></Col>
                                </FormGroup>
                            </Form>
     var jsxAdd          =  <Form>
                                <FormGroup row>
                                    <Label style={{color:'black',fontWeight:400}} for="exampleText" sm={2}>Mã Giảm Giá</Label>
                                    <Col><Input type="text"  style={{width:500,fontSize:16}} autoComplete='off' id="id" name="id"  required /></Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label style={{color:'black',fontWeight:400}} for="exampleText" sm={2}>Phần Trăm Giảm</Label>
                                    <Col><Input type="number" id="name"  style={{width:500,fontSize:16}} max='100' step='0.1' min='1' autoComplete='off' id="percent" name="percent"  required/> </Col>
                                </FormGroup>
                                <FormGroup row>                              
                                    <Label style={{color:'black',fontWeight:400}} for="exampleText" sm={2}>Thời Hạn</Label>
                                    <Col><Input type="datetime-local"  style={{width:500,fontSize:16}} id="deadline" autoComplete='off'  name="deadline"  required/></Col>
                                </FormGroup>
                            </Form>

    return(
        <>
            <Modal className="modal_product" size='xl' show={props.shows} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:'blue',fontSize:20}}>
                        Giảm Giá
                    </Modal.Title>
                    
                </Modal.Header>
                    <Modal.Body>
                    {(props.discounts !== "")?
                        <Button style={{marginLeft: 940}} onClick={enableEdit} className="btntest" variant="primary" >Hiệu Chỉnh</Button>
                        :""}
                        <Card className="form_product">
                            <CardHeader>Giảm Giá Sản Phẩm</CardHeader>
                            <CardBody>
                            {(props.discounts !== "")?jsxProperties:jsxAdd}
                            </CardBody>
                        </Card>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Close
                    </Button>
                    {(btnEditDis === "1"?
                        <Button variant="warning" onClick={updateDis}>
                            Xác Nhận
                        </Button>
                     :(btnEditDis === "2" && props.discounts ==="" ? 
                        <Button variant="warning" onClick={addDis}>
                            Thêm
                        </Button>
                     : "")
                    )}
                   
                </Modal.Footer>
            </Modal>
        </>
    )
}export default EditDiscount;
import { Link, useHistory } from 'react-router-dom';
import PageHeader from '../../assets/images/page-header-bg.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label } from 'reactstrap';

function Account(props) {
	const hostname = "http://localhost:8080";
	let history = useHistory();
	const [show, setshow] = useState(false)

	const [customer, setCustomer] = useState("")
	var tokenStr = localStorage.getItem("token");
	const config = {
		headers: { "Authorization": `Bearer_${tokenStr}` }
	};

	useEffect(() => {

		//  check login 
		if (props.login === "0") {
			history.push("/login")
		}

		axios.get(hostname + '/api/customers', config)
			.then((Response) => {
				console.log(" get customer success")
				setCustomer(Response.data)
			})
			.catch((error) => {
				console.log("error " + error.response)
			})
	}, []);


	const setSpan = () => {
		// change shopcart span
		let listWLnew = [];
		props.setWL(0)
		localStorage.setItem("WL", JSON.stringify(listWLnew))

		// change shopcart span
		let listSCnew = [];
		props.setSC(0)
		localStorage.setItem("SC", JSON.stringify(listSCnew))
	}


	const logout = () => {
		localStorage.removeItem("token");
		localStorage.setItem("nameUser", "")
		props.logout("");
		setSpan();
		history.push("/");
		window.scrollTo(0, 0)
	}

	const handleClose = () => {
		setshow(false)
	}

	const Show = () => {
		setshow(true)
	}

	const validateEmail = (email) => {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	const changeInfo = () => {
		var firstname = document.getElementById("firstname").value
		var lastname = document.getElementById("lastname").value
		var address = document.getElementById("address").value
		var phone = document.getElementById("phone").value
		var email = document.getElementById("email").value



		if (firstname.length < 3 || lastname.length < 3 || address.length < 3 || phone.length !== 10) {
			alert("thông tin không phù hợp")
			return false;
		}

		if (!validateEmail(email)) {
			alert("email không hợp lệ")
			return false;
		}

		customer.firstname = firstname
		customer.lastname = lastname
		customer.address = address
		customer.phone = phone
		customer.email = email
		axios.post(hostname + '/api/customers', customer, config)
			.then((Response) => {
				console.log("change customer success")
				alert("thành công")
				setCustomer(Response.data)
			})
			.catch((error) => {
				console.log("error " + error.response)
				alert("lỗi")
			})
	}

	const changePass = () => {
		var oldpass = document.getElementById("passOld").value
		var newpass = document.getElementById("passNew").value
		var confirm = document.getElementById("passConfirm").value


		if (oldpass == "" || newpass == "" || confirm == "") {
			return false;
		}

		const bodyParameters = {
			oldpassword: oldpass,
			newpassword: newpass,
			confirmpassword: confirm
		};

		axios.post(hostname + '/api/customers/password', bodyParameters, config)
			.then((Response) => {
				console.log("change pass success")
				alert("đổi mật khẩu thành công")
			})
			.catch((error) => {
				debugger
				console.log("error " + error.response)
				alert("mật khẩu cũ không chính xác")
			})
	}

	return (
		<>
			<main claclassNamess="main">
				<nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
					<div className="container">
						<ol className="breadcrumb">
							<li className="breadcrumb-item"><Link to="/">Home</Link></li>
							<li className="breadcrumb-item active" aria-current="page">My Account</li>
						</ol>
					</div>
				</nav>
				<div className="page-header text-center" style={{ backgroundImage: "url(" + PageHeader + ")" }} >
					<div className="container">
						<h1 className="page-title">My Account<span>Shop</span></h1>
					</div>
				</div><br></br>
				<div className="page-content">
					<div className="dashboard">
						<div className="container">
							<div className="row">
								<aside className="col-md-2 col-lg-2">
									<ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
										<li className="nav-item">
											<a style={{ color: '#CC9966' }} className="nav-link active" id="tab-account-link" data-toggle="tab" href="#tab-account" role="tab" aria-controls="tab-account" aria-selected="false">Account Details</a>
										</li>
										<li className="nav-item">
											<Link className="nav-link" id="tab-orders-link" data-toggle="tab" to="/order" role="tab" aria-controls="tab-orders" aria-selected="false" type="button">Orders</Link>
										</li>
										<li className="nav-item">
											<a className="nav-link" style={{ cursor: 'pointer' }} onClick={logout} >Sign Out</a>
										</li>
									</ul>
								</aside>

								<div className="col-md-10 col-lg-10">
									<div id="tab-account" >
										<form style={{ marginLeft: 50 }} action="#">
											<div classNamess="row">
												<div className="col-sm-6">
													<label>First Name *</label>
													<input style={{ fontSize: 14 }} type="text" id="firstname" className="form-control" defaultValue={customer.firstname} required />
												</div>

												<div className="col-sm-6">
													<label>Last Name *</label>
													<input style={{ fontSize: 14 }} type="text" id="lastname" className="form-control" defaultValue={customer.lastname} required />
												</div>

												<div className="col-sm-6">
													<label>Email *</label>
													{(customer.email !== "" ?
														<input style={{ fontSize: 14 }} type="email" id="email" disabled='disabled' className="form-control" value={customer.email} required />
														:
														<input style={{ fontSize: 14 }} type="email" id="email" className="form-control" required />
													)}
												</div>
												<div className="col-sm-6">
													<label>Phone *</label>
													<input style={{ fontSize: 14 }} type="tel" id="phone" max="10" maxLength="10" className="form-control" value={customer.phone} required />
												</div>
												<div className="col-sm-6">
													<label>Address *</label>
													<input style={{ fontSize: 14 }} type="text" id="address" className="form-control" defaultValue={customer.address} required />
												</div>

											</div>
											<div>
												<button type="button" onClick={Show} className="btn btn-outline-primary-2">
													<span>Đổi Mật Khẩu</span>
												</button>
												<button style={{ marginLeft: 50 }} type="button" className="btn btn-outline-primary-2" onClick={changeInfo}>
													<span>SAVE CHANGES</span>
													<i className="icon-long-arrow-right"></i>
												</button>
											</div>
										</form>

										<Modal className="modal_product" show={show} onHide={handleClose}>
											<Modal.Header closeButton>
												<Modal.Title style={{ color: 'blue', fontSize: 20 }}>
													Đổi Mật Khẩu
												</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<FormGroup row>
													<Label for="exampleText" sm={2}>Mật Khẩu Cũ</Label>
													<Col><Input style={{ fontSize: 14 }} type="password" id="passOld" name="id" required /></Col>
												</FormGroup>
												<FormGroup row>
													<Label for="exampleText" sm={2}>Mật Khẩu Mới</Label>
													<Col><Input style={{ fontSize: 14 }} type="password" id="passNew" name="id" required /></Col>
												</FormGroup>
												<FormGroup row>
													<Label for="exampleText" sm={2}>Xác Nhận Mật Khẩu</Label>
													<Col><Input style={{ fontSize: 14 }} type="password" id="passConfirm" name="id" required /></Col>
												</FormGroup>
											</Modal.Body>
											<Modal.Footer>
												<Button variant="warning" onClick={handleClose}>
													Close
												</Button>
												<Button variant="warning" onClick={changePass}>
													Xác Nhận
												</Button>
											</Modal.Footer>
										</Modal>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
export default Account;
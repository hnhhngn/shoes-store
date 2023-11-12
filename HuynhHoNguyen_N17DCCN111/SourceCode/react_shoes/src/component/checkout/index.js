
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageHeader from '../../assets/images/page-header-bg.jpg';
import Item from './item';
function Checkout(props) {
	const hostname = "http://localhost:8080";
	let history = useHistory();
	const [customer, setCustomer] = useState("")
	const [listShopcart, setlistShopcart] = useState([])
	const [listSale, setlistSale] = useState([])
	const [payment, setpayment] = useState(0)
	const [total, settotal] = useState(0)

	// const [listProduct, setlistProduct] = useState([{ name: "" }])

	let tokenStr = localStorage.getItem("token");
	//  check login 
	if (props.login === "0") {
		history.push("/login")
	}

	const config = {
		headers: { "Authorization": `Bearer_${tokenStr}` }
	};

	useEffect(() => {
		let success = (new URLSearchParams(window.location.search)).get("success")
		let paymentid = (new URLSearchParams(window.location.search)).get("paymentid")
		if (success === "true" && paymentid !== null && paymentid !== "") {
			var body = JSON.parse(localStorage.getItem("order"))
			body.paymentid = paymentid
			axios.post(hostname + `/api/orders/create`, body, config)
				.then((Response) => {
					console.log("success create order ");

					let empty = [];
					// change shopcart span
					let listSC = JSON.parse(localStorage.getItem('shopcart')) || [];
					listSC.filter((sc, index) => {
						let listSCs = JSON.parse(localStorage.getItem("SC")) || []
						let listSCnew = [];
						listSCs.filter((lsc) => {
							if (sc.id !== lsc.id) {
								listSCnew.push(lsc)
							}
						})
						localStorage.setItem("SC", JSON.stringify(listSCnew))
					})

					let listSCs = JSON.parse(localStorage.getItem("SC")) || []
					props.setSC(listSCs.length)
					localStorage.setItem("shopcart", empty)


					history.push("/order")
					alert("đặt hàng thành công")
				})
				.catch((error) => {
					console.log("error " + error.response);
					alert("đặt hàng không thành công")
				})


		}

		// info customer
		axios.get(hostname + '/api/customers', config)
			.then((Response) => {
				console.log(" get customer success")
				setCustomer(Response.data)
			})
			.catch((error) => {
				console.log("error " + error.response);
				// history.push("/login");
			})

		// info shopcart
		axios.get(hostname + `/api/shopcart`, config)
			.then((Response) => {
				console.log("success get shopcart " + Response.data);
				// reset list product
				let list = []
				let listSC = JSON.parse(localStorage.getItem('shopcart')) || [];

				listSC.filter((sc, index) => {
					Response.data.filter((lsc) => {
						if (sc.id === lsc.productdetail.id) {
							list.push(lsc)
						}
					})
				})
				setlistShopcart(list)
			})
			.catch((error) => {
				console.log("error " + error.response);
			})


		// get sale
		axios.get(hostname + '/api/discount/get')
			.then((Response) => {
				console.log(" get list sale success")
				setlistSale(Response.data)
			})

		var t = JSON.parse(localStorage.getItem("total"));

		settotal(t)

	}, []);

	const validateEmail = (email) => {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	// alert(total)

	const orderProduct = () => {
		let names = document.getElementById("name").value
		let emails = document.getElementById("email").value
		let phones = document.getElementById("phone").value
		let addresss = document.getElementById("address").value


		if (names.length < 3 || phones.length != 10 || addresss.length < 6) {
			alert("thông tin chưa hợp lệ! xem lại")
			return false
		}

		var re = /\S+@\S+\.\S+/;
		if (!validateEmail(emails)) {
			alert("email không hợp lệ ")
			return false
		}

		const body = {
			fullname: names,
			address: addresss,
			email: emails,
			phone: phones,
			paymentid: 0,
			shopcart: listShopcart
		}

		// Chức năng thanh toán Paypal đang phát triển
		if (payment === 1) {
			let total = localStorage.getItem("total");
			var a = (total) / (22790)  // vnd to usd
			a = Math.round(a * 100) / 100
			localStorage.setItem("order", JSON.stringify(body))
			window.location.href = hostname + "/api/payment/pay?price=" + a;
		} else {

			axios.post(hostname + `/api/orders/create`, body, config)
				.then((Response) => {
					console.log("success create order ");
					let empty = [];
					// change shopcart span

					let listSC = JSON.parse(localStorage.getItem('shopcart')) || [];
					listSC.filter((sc, index) => {
						let listSCs = JSON.parse(localStorage.getItem("SC")) || []
						let listSCnew = [];
						listSCs.filter((lsc) => {
							if (sc.id !== lsc.id) {
								listSCnew.push(lsc)
							}
						})
						localStorage.setItem("SC", JSON.stringify(listSCnew))
					})

					let listSCs = JSON.parse(localStorage.getItem("SC")) || []
					props.setSC(listSCs.length)
					localStorage.setItem("shopcart", empty)


					history.push("/order")
					alert("đặt hàng thành công")
				})
				.catch((error) => {
					console.log("error " + error.response);
					alert("đặt hàng không thành công")
				})
		}
	}

	const changeInfo1 = (e) => {
		let name = document.getElementById("name")
		let email = document.getElementById("email")
		let phone = document.getElementById("phone")
		let address = document.getElementById("address")

		if (e.target.value == 1) {
			name.disabled = true;
			email.disabled = true;
			phone.disabled = true;
			address.disabled = true;

			// info customer
			axios.get(hostname + '/api/customers', config)
				.then((Response) => {
					console.log(" get customer success")
					setCustomer(Response.data)
				})
				.catch((error) => {
					console.log("error " + error.response);
					// history.push("/login");
				})
		} else {
			name.disabled = false;
			email.disabled = false;
			phone.disabled = false;
			address.disabled = false;
			name.value = "";
			email.value = "";
			phone.value = "";
			address.value = "";
			setCustomer("")
		}
	}


	const changePayment = e => {
		setpayment(e)
	}

	return (
		<>
			<main class="main">
				<nav aria-label="breadcrumb" class="breadcrumb-nav">
					<div className="container">
						<ol className="breadcrumb">
							<li className="breadcrumb-item"><Link to="/">Home</Link></li>
							<li className="breadcrumb-item active" aria-current="page">Checkout</li>
						</ol>
					</div>
				</nav>
				<div className="page-header text-center" style={{ backgroundImage: "url(" + PageHeader + ")" }} >
					<div className="container">
						<h1 className="page-title">Checkout<span>Shop</span></h1>
					</div>
				</div><br></br>

				<div className="page-content">
					<div className="checkout">
						<div className="container">
							<form action="#">
								<div className="row">
									<div className="col-lg-9">
										<h2 className="checkout-title">Chi tiết Hóa Đơn</h2>
										<div class="form-check form-check-inline">
											<input style={{ marginTop: 5 }} class="form-check-input" type="radio" name="inlineRadioOptions"
												id="inlineRadio1" onChange={(e) => changeInfo1(e)} value="1" defaultChecked="true" />
											<label style={{ cursor: "pointer" }} class="form-check-label" for="inlineRadio1">Thông tin khách hàng</label>
										</div>
										<div class="form-check form-check-inline">
											<input style={{ marginTop: 5 }} class="form-check-input" type="radio" name="inlineRadioOptions"
												id="inlineRadio2" onChange={(e) => changeInfo1(e)} value="2" />
											<label style={{ cursor: "pointer" }} class="form-check-label" for="inlineRadio2">Thông tin khác</label>
										</div>


										<div className="row">
											<div className="col-sm-12">
												<label>Họ Tên *</label>
												<input style={{ fontSize: 14 }} id="name" type="text" class="form-control"
													disabled='disabled' value={customer.firstname} required />
											</div>
										</div>

										<div className="row">
											<div className="col-sm-6">
												<label>Email *</label>
												<input style={{ fontSize: 14 }} id="email" type="email" disabled='disabled' autoComplete='false'
													value={customer.email} disabled="disabled" className="form-control" required />
											</div>
											<div className="col-sm-6">
												<label>Số Điện Thoại *</label>
												<input id="phone" style={{ fontSize: 14 }} type="tel" value={customer.phone} disabled='disabled'
													className="form-control" required />
											</div>
										</div>

										<label>Địa Chỉ *</label>
										<input type="text" style={{ fontSize: 14 }} id="address" className="form-control" disabled='disabled' value={customer.address}
											placeholder="số nhà, xã, phường, huyện, thành phố " required />
									</div>
									<aside className="col-lg-3">
										<div className="summary">
											<h3 className="summary-title">Đơn Hàng Của Bạn</h3>

											<table className="table table-summary">
												<thead>
													<tr>
														<th><p style={{ fontWeight: 500, fontSize: 16, color: 'black' }}>Sản Phẩm</p></th>
														<th></th>
														<th>Giá</th>
													</tr>
												</thead>

												<tbody>
													{
														listShopcart.map((shopcart) =>
															<Item sales={listSale} shopcarts={shopcart}></Item>
														)
													}


													<tr className="summary-subtotal">
														<td style={{ fontWeight: 500, fontSize: 16, color: 'black' }}>TỔNG:</td>
														<td></td>
														<td>
															{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
													</tr>
													<tr>
														<td>Shipping:</td>
														<td></td>
														<td>Free shipping</td>
													</tr>
													<tr className="summary-subtotal">
														<td style={{ fontWeight: 500, fontSize: 16, color: 'black' }}>THANH TOÁN:</td>
														<td></td>
														<td></td>
													</tr>
													<tr>
														<td>
															<div class="form-check form-check-inline">
																<input style={{ marginTop: 5 }} class="form-check-input" type="radio" name="a"
																	id="a" onClick={(e) => changePayment(0)} value="0" defaultChecked="true" />
																<label style={{ cursor: "pointer" }} class="form-check-label" for="inlineRadio1">Thanh Toán Khi Nhận Hàng</label>
															</div>
														</td>
														<td></td>
														<td>
															<img style={{ width: 40, height: 40, marginLeft: 35 }}
																src="https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1630233791630-cod.jpg" />
														</td>

													</tr>
													<tr>
														<td>
															<div class="form-check form-check-inline">
																<input style={{ marginTop: 5 }} class="form-check-input" type="radio" name="a"
																	id="a" onClick={(e) => changePayment(1)} value="1" />
																<label style={{ cursor: "pointer" }} class="form-check-label" for="inlineRadio1"> Thanh Toán Paypal</label>
															</div>
														</td>
														<td></td>
														<td>
															<img style={{ width: 40, height: 40, marginLeft: 35 }}
																src="https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1630233598791-unnamed.png" />
														</td>
													</tr>
													<tr className="summary-total">
														<td>THÀNH TIỀN:</td>
														<td></td>
														<td>
															{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
														</td>
													</tr>
												</tbody>
											</table>

											<div style={{ marginLeft: 70 }}>
												{
													(total == 0) ?
														<button type="button" className="btn btn-outline-primary-2 btn-order btn-block disabled" onClick={orderProduct}  >
															<span className="btn-text">Tiến Hành Đặt Hàng</span>
															<span className="btn-hover-text">Đặt Hàng</span>
														</button>
														:
														<button type="button" className="btn btn-outline-primary-2 btn-order btn-block" onClick={orderProduct}  >
															<span className="btn-text">Tiến Hành Đặt Hàng</span>
															<span className="btn-hover-text">Đặt Hàng</span>
														</button>
												}
											</div>

										</div>
									</aside>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
export default Checkout;
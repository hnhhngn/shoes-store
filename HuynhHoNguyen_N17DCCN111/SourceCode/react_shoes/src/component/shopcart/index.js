import { Link, useHistory } from "react-router-dom";
import PageHeader from '../../assets/images/page-header-bg.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './style1.css';
import { useRef } from "react";
import { showError, showMessage } from '../message/index';

function Shopcart(props) {
	const hostname = "http://localhost:8080";
	let history = useHistory();
	const [listShopcart, setlistShopcart] = useState([])
	const [listProduct, setlistProduct] = useState([{ name: "" }])
	const [total, settotal] = useState(0)
	const [deleteItem, setdeleteItem] = useState(0)
	const [listSale, setlistSale] = useState([])
	const [change, setchange] = useState(0)

	var tokenStr = localStorage.getItem("token");
	//  check login 
	if (props.login === "0") {
		history.push("/login")
	}

	const config1 = {
		headers: { "Authorization": `Bearer_${tokenStr}` }
	};
	useEffect(() => {
		axios.get(hostname + `/api/shopcart`, config1)
			.then((Response) => {
				console.log("success get shopcart " + Response.data);
				setlistShopcart(Response.data)
				localStorage.removeItem("shopcart")
				// getlistproduct();
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



	}, []);

	const isInitialMount = useRef(true);
	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			let listId = [];
			// listShopcart.map((shopcart) => {
			//     if (listId.indexOf(shopcart.productdetail.productid) === -1) listId.push(shopcart.productdetail.productid);
			// })
			listShopcart.filter((sc) => {
				listId.push(sc.productdetail.productid);
			})
			let listTemp = [];
			listId.map((id) => {
				axios.get(hostname + `/api/product/id/${id}`, config1)
					.then((response => {
						listTemp.push(response.data);
					}))
					.catch((error) => console.log(error.response))
			})
			console.log(listTemp);
			setTimeout(() => {
				setlistProduct(listTemp);
			}, 1000);
			setchange(1);
		}
	}, [listShopcart])


	const getlistproduct = () => {
		let listId = [];
		listShopcart.map((shopcart) => {
			if (listId.indexOf(shopcart.productdetail.productid) === -1) listId.push(shopcart.productdetail.productid);
		})
		let listTemp = [];
		listId.map((id) => {
			axios.get(hostname + `/api/product/id/${id}`, config1)
				.then((response => {
					listTemp.push(response.data);
				}))
				.catch((error) => console.log(error.response))
		})
		console.log(listTemp);
		setTimeout(() => {
			setlistProduct(listTemp);
		}, 1500);
		setchange(1);
	}

	// delteitem

	if (deleteItem !== 0) {
		listShopcart.filter((shopcart, index) => {
			console.log("delete-" + shopcart.id + "-" + deleteItem)
			if (shopcart.id === deleteItem) {
				console.log("suc-" + index + shopcart.id)
				listShopcart.splice(index, 1);
				setdeleteItem(0)
				return true;
			}
		})
	}


	const reTotal = () => {
		localStorage.setItem("total", JSON.stringify(total));
	}

	const updateCart = () => {
		let listId = [];
		listShopcart.map((shopcart) => {
			if (listId.indexOf(shopcart.productdetail.productid) === -1) listId.push(shopcart.productdetail.productid);
		})
		let listTemp = [];
		listId.map((id) => {
			axios.get(hostname + `/api/product/id/${id}`, config1)
				.then((response => {
					listTemp.push(response.data);
				}))
				.catch((error) => console.log(error.response))
		})
		console.log(listTemp);
		setTimeout(() => {
			setlistProduct(listTemp);
		}, 1500);
		setchange(0);
	}

	const orderProduct = () => {
		// get value
		debugger
		let returnnow = 0
		let listSC = JSON.parse(localStorage.getItem('shopcart')) || [];
		listSC.filter((sc, index) => {
			listShopcart.filter((lsc) => {
				if (sc.id === lsc.productdetail.id) {
					// check 
					if (lsc.productdetail.inventory < lsc.quantity) {
						returnnow = 1
						alert(sc.name + " chỉ còn " + lsc.productdetail.inventory + " sản phẩm")
						return false;
					}
				}
			})
		})

		// check
		if (returnnow === 1) {
			return false;
		}

		history.push("/checkout")
	}

	let numbero = 0;


	//ham cover id sang name 
	const idToName = (id) => {
		const List = listProduct.filter((product) => {
			return product.id === id
		})
		if (List.length === 0) return "";
		else return List[0].name;
	}

	const idToUrl = (id) => {
		var u;
		const number = 0;
		const url = listProduct.filter((product) => {
			if (product.id === id && product.listimage) {
				u = product.listimage[number].url;
				return product.listimage[number].url;
			}

		})
		return u;
	}

	const idToSize = (id) => {
		let listsize = []
		listProduct.filter((product) => {
			if (product.id === id) {
				listsize = product.listsize;
				return listsize
			}

		})

		return listsize;
	}

	const idToProduct = (id) => {
		let products = 0
		listProduct.filter((product) => {
			if (product.id === id) {
				products = product
				return products
			}

		})
		return products;
	}

	const checkdate = (e) => {
		let value = e || ""
		var parts = value.split(' ');
		var part = parts[0].split('/');
		var h = parts[1].split(':');
		var mydate = new Date(part[2], part[1] - 1, part[0], h[0], h[1]);
		var time1 = new Date();
		return mydate.getTime() > time1.getTime();
	}


	//delete item shopcart
	const deleteShopCart = (e) => {
		// get shopcart 
		let shopcart = 0
		listShopcart.filter((sc) => {
			if (sc.id == e) {
				shopcart = sc
				return shopcart
			}
		})

		// delete sc
		axios.post(hostname + `/api/shopcart/delete`, shopcart, config1)
			.then((Response) => {
				console.log("success delete shopcart")
				var cb = document.getElementById(e)
				if (cb.checked) {
					cb.checked = false;

					//reset price
					let listSC = JSON.parse(localStorage.getItem('shopcart')) || [];
					let listSCchange = []
					listSC.filter((item, index) => {
						if (item.id !== shopcart.productdetail.id) {
							listSCchange.push(item)
						}
					})
					let total = 0;
					listSCchange.map((item) =>
						total += item.quantity * item.price
					)
					localStorage.setItem('shopcart', JSON.stringify(listSCchange));
					localStorage.setItem("total", total);
					// set state total 
					settotal(total)
				} else {

				}
				// change shopcart span
				let listSCs = JSON.parse(localStorage.getItem("SC")) || []
				let listSpanSCnew = [];
				listSCs.filter((sc) => {
					if (sc.id !== shopcart.productdetail.id) {
						listSpanSCnew.push(sc)
					}
				})
				props.setSC(listSpanSCnew.length)
				localStorage.setItem("SC", JSON.stringify(listSpanSCnew))

				// rerender
				let listscnew = []
				listShopcart.filter((sc) => {
					if (sc.id !== e) {
						listscnew.push(sc)
					}
				})
				setlistShopcart(listscnew)
			})
			.catch((error) => {
				if (error.response) {
					// Request made and server responded
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
				console.log("error ")
			})
	}

	// change quantity item shopcart
	const changeQuantity = (e) => {
		var number = e.target.value
		// var sizenew = document.getElementById("size").value
		let str = e.target.name.split("y")
		let scid = str[1]

		if (number == "" || number == 0) {
			showMessage("ERR_QUAN_E001");
			return false
		}

		// get shopcart 
		let shopcart = 0
		listShopcart.filter((sc) => {
			if (sc.id == scid) {
				shopcart = sc
				return shopcart
			}
		})

		// get value
		let prodetail = 0;
		idToSize(shopcart.productdetail.productid).filter((size) => {
			if (size.id == shopcart.productdetail.id) {
				prodetail = size
				return prodetail
			}
		})

		// check ton kho
		if ((prodetail.inventory - number) < 0) {
			showMessage("ERR_QUAN_E002");
			return false
		}

		// send change quantity
		shopcart.productdetail = prodetail;
		shopcart.quantity = number
		axios.put(hostname + `/api/shopcart`, shopcart, config1)
			.then((Response) => {
				console.log("success update shopcart")
				// change
				let listscnew = []
				listShopcart.filter((sc) => {
					if (sc.id === e) {
						listscnew.push(shopcart)
					} else {
						listscnew.push(sc)
					}
				})
				setlistShopcart(listscnew);
				calcTotal();
			})
			.catch((error) => {
				console.log("error ")
				showError(error);
			})
	}


	// change size item shopcart
	const changeSize = (e) => {
		var sizenew = e.target.value
		let str = e.target.name.split("e")
		let scid = str[1]
		// get shopcart 
		let shopcart = 0
		let prosame = 0
		listShopcart.filter((sc) => {
			if (sc.id == scid) {
				shopcart = sc
			} else {
				if (sc.productdetail.id == sizenew) {
					prosame = sc.productdetail
				}
			}
		})
		let number = shopcart.quantity;
		// get value
		let prodetailnew = 0;
		idToSize(shopcart.productdetail.productid).filter((size) => {
			if (size.id == sizenew) {
				prodetailnew = size
				return prodetailnew
			}
		})

		// check trùng size
		if (prosame !== 0) {
			showMessage("ERR_SIZE_E002");
			return false
		}

		// check ton kho
		if ((prodetailnew.inventory - number) < 0) {
			showMessage("ERR_QUAN_E002");
			return false
		}

		// send change size
		shopcart.productdetail = prodetailnew;
		axios.put(hostname + `/api/shopcart`, shopcart, config1)
			.then((Response) => {
				console.log("success update shopcart")
				// change
				let listscnew = []
				listShopcart.filter((sc) => {
					if (sc.id === e) {
						listscnew.push(shopcart)
					} else {
						listscnew.push(sc)
					}
				})
				setlistShopcart(listscnew)
			})
			.catch((error) => {
				console.log("error ");
				showError(error);
			})

	}

	const calcTotal = (e) => {
		let total = 0;
		listShopcart.filter((sc) => {
			var cb = document.getElementById(sc.id)
			if (cb.checked) {
				let products = idToProduct(sc.productdetail.productid)
				// var pricet = products.price;
				// total += sc.quantity * pricet;
				let priceg
				var pricet = products.price;
				listSale.filter((sale) => {
					if (sale.id === products.discount && checkdate(sale.deadline)) {
						priceg = (sale.percent / 100)
						pricet = pricet - (pricet * priceg)
					}
				})
				total += sc.quantity * pricet;
			}
		})
		localStorage.setItem("total", total);
		settotal(total)
	}

	// click checkbox item shopcart
	const clickCheckbox = (e) => {
		var cb = document.getElementById(e)
		// get shopcart 
		let shopcart = 0
		listShopcart.filter((sc) => {
			if (sc.id == e) {
				shopcart = sc
				return shopcart
			}
		})
		let products = idToProduct(shopcart.productdetail.productid)
		if (cb.checked) {
			// set price product
			let listSC = JSON.parse(localStorage.getItem('shopcart')) || [];
			let priceg
			var pricet = products.price;
			if (products.discount !== null && products.discount !== "") {
				listSale.filter((sale) => {
					if (sale.id === products.discount && checkdate(sale.deadline)) {
						priceg = (sale.percent / 100)
						pricet = pricet - (pricet * priceg)
					}
				})
			}

			listSC.push({
				quantity: shopcart.quantity,
				price: pricet,
				name: products.name,
				id: shopcart.productdetail.id,
			});

			let total = 0;
			listSC.map((item) =>
				total += item.quantity * item.price
			)
			localStorage.setItem('shopcart', JSON.stringify(listSC));
			localStorage.setItem("total", total);
			settotal(total)
		} else {
			// set price product
			let listSC = JSON.parse(localStorage.getItem('shopcart')) || [];
			let priceg
			var pricet = products.price;
			if (products.discount != null && products.discount != "") {
				listSale.filter((sale) => {
					if (sale.id === products.discount && checkdate(sale.deadline)) {
						priceg = (sale.percent / 100)
						pricet = pricet - (pricet * priceg)
					}
				})
			}

			listSC.filter((sc, index) => {
				if (sc.id === shopcart.productdetail.id) {
					listSC.splice(index, 1)
				}
			})

			let total = 0;
			listSC.map((item) =>
				total += item.quantity * item.price
			)
			localStorage.setItem('shopcart', JSON.stringify(listSC));
			localStorage.setItem("total", total);
			settotal(total)
		}
	}

	// item shopcart

	let jsxItem = listShopcart.map((shopcart) => {
		let products = idToProduct(shopcart.productdetail.productid) || { listsize: [{}] }
		// get price 
		var price = 0
		var prices = products.price || 0;
		if (products.discount != null && products.discount != "") {
			listSale.filter((sale) => {
				if (sale.id === products.discount && checkdate(sale.deadline)) {
					price = (sale.percent / 100)
					prices = prices - (prices * price)
				}
			})
		}

		let totals = shopcart.quantity * prices
		let idsize = "size" + shopcart.id
		let idquantity = "quantity" + shopcart.id
		return <tr>
			<td style={{ width: 50 }}  >
				<input type="checkbox" id={shopcart.id} style={{ marginTop: 20 }} onClick={(e) => clickCheckbox(shopcart.id)} />
			</td>
			<td className="product-col">
				<div className="product">
					<figure className="product-media">
						<Link to={{ pathname: `/product/${shopcart.productdetail.productid}` }}>
							<img src={idToUrl(shopcart.productdetail.productid)} alt="Product image" />
						</Link>
					</figure>

					<h3 className="product-title" style={{ width: 200, wordBreak: 'break-all' }}>
						<Link to={{ pathname: `/product/${shopcart.productdetail.productid}` }}>{products.name}</Link>
					</h3>
				</div>
			</td>
			<td>
				<div style={{ marginTop: 10 }} className="select-custom">
					<select style={{ width: 100 }} id="size" name={idsize} value={shopcart.productdetail.id || 1} className="form-control" onChange={(e) => changeSize(e)}>
						{products.listsize.map((pro) =>
							<option value={pro.id} >{pro.size}</option>
						)}
					</select>
				</div>
			</td>
			<td className="price-col">
				<p style={{ marginTop: 15, fontSize: 14, color: 'black' }} >
					{prices.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
				</p>
			</td>
			<td className="quantity-col">
				<div style={{ marginTop: 10 }} className="cart-product-quantity">
					<input type="number" id="inputQuantity" name={idquantity} className="form-control" value={shopcart.quantity}
						onChange={(e) => changeQuantity(e)} required />
				</div>
			</td>
			<td className="total-col">
				<p style={{ marginTop: 15, fontSize: 15, color: 'black' }} >
					{(totals).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
				</p>
			</td>
			<td class="remove-col"><button className="btn-remove" onClick={(e) => deleteShopCart(shopcart.id)}  ><i className="icon-close"></i></button></td>
		</tr>
	})

	return (
		<>
			<main className="main">
				<nav aria-label="breadcrumb" className="breadcrumb-nav">
					<div className="container">
						<ol className="breadcrumb">
							<li className="breadcrumb-item"><Link to="/">Home</Link></li>
							<li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
						</ol>
					</div>
				</nav>
				<div className="page-header text-center" style={{ backgroundImage: "url(" + PageHeader + ")" }}>
					<div className="container">
						<h1 className="page-title">Shopping Cart<span>Shop</span></h1>
					</div>
				</div><br />

				<div className="page-content">
					<div className="cart">
						<div className="container">
							<div className="row">
								<div className="col-lg-9">
									<table className="table table-cart table-mobile">
										<thead>
											<tr>
												<th></th>
												<th>Sản Phẩm</th>
												<th>Size</th>
												<th style={{ textAlign: 'center' }} >Giá</th>
												<th>Số Lượng</th>
												<th style={{ textAlign: 'center' }}>Tổng</th>
												<th></th>
											</tr>
										</thead>

										<tbody>
											{/* {listShopcart.map((shopcart) =>(
											<Item test={settotal} delete={setdeleteItem} lists={listShopcart}  setlistSC={setlistShopcart}
											sales={listSale} shopcart ={shopcart}  setSC={props.setSC} ></Item>
										)
										)} */}
											{jsxItem}
										</tbody>
										{/* {jsxItem} */}

									</table>

									<div className="cart-bottom">
										<button className="btn btn-outline-dark-2" onClick={updateCart} ><span>UPDATE CART</span><i className="icon-refresh"></i></button>
									</div>
								</div>
								<aside className="col-lg-3">
									<div className="summary summary-cart">
										<h3 className="summary-title">Thành Tiền</h3>

										<table className="table table-summary">
											<tbody>
												<tr className="summary-subtotal">
													<td>Tổng Đơn:</td>
													<td>{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
												</tr>
												<tr className="summary-shipping">
													<td>Shipping:</td>
													<td>&nbsp;</td>
												</tr>

												<tr className="summary-shipping-row">
													<td>
														<div className="custom-control custom-radio">
															<input type="radio" defaultChecked="true" id="test3" name="radio-group" />
															<label className="radiobtn" for="test3">Free Ship</label>
														</div>
													</td>
													<td>{numbero.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
												</tr>

												<tr className="summary-total">
													<td>Thành Tiền:</td>
													<td>{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
													{reTotal()}
												</tr>
											</tbody>
										</table>
										<div style={{ marginLeft: 80 }}>
											{(total === 0) ?
												<Link to="/checkout" className="btn btn-outline-primary-2 btn-order btn-block disabled">Tiến Hành Đặt Hàng</Link>
												:
												<a style={{ cursor: 'pointer' }} onClick={orderProduct} className="btn btn-outline-primary-2 btn-order btn-block">Tiến Hành Đặt Hàng</a>
											}
										</div>
									</div>
									<div style={{ marginLeft: 110, width: 200 }}>
										<Link style={{ width: 200 }} to="/product" className="btn btn-outline-dark-2 btn-block mb-3">
											<span style={{ width: 200, whiteSpace: 'nowrap' }} > Tiếp tục Mua Sắm</span>
											<i className="icon-refresh"></i>
										</Link>
									</div>

								</aside>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
export default Shopcart;


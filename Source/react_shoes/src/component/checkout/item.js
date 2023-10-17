import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Item(props) {
	const hostname = "https://localhost:3000";
	const [Product, setProduct] = useState([])

	let tokenStr = localStorage.getItem("token");
	const config = {
		headers: { "Authorization": `Bearer_${tokenStr}` }
	};

	useEffect(() => {
		let listTemp = [];
		axios.get(hostname + `/api/product/id/${props.shopcarts.productdetail.productid}`, config)
			.then((response => {
				console.log("get product")
				setProduct(response.data)
			}))
			.catch((error) =>
				console.log("error " + error.response)
			)

	}, [])
	// var price = Product.price * props.shopcarts.quantity;

	const checkdate = (e) => {
		let value = e || ""
		var parts = value.split(' ');
		var part = parts[0].split('/');
		var h = parts[1].split(':');
		var mydate = new Date(part[2], part[1] - 1, part[0], h[0], h[1]);
		var time1 = new Date();
		return mydate.getTime() > time1.getTime();
	}


	var price = 0
	var prices = Product.price;
	if (Product.discount != null & Product.discount != "") {
		props.sales.filter((sale) => {
			if (sale.id == Product.discount && checkdate(sale.deadline)) {
				price = (sale.percent / 100)
				prices = prices - (prices * price)
			}
		})
	}


	var totals = prices * props.shopcarts.quantity;


	return (
		<>
			<tr>
				<td><Link to={{ pathname: `/product/${Product.id}` }}>
					<p style={{ fontSize: 13, width: 160, wordBreak: 'break-all' }}>{Product.name}</p>
				</Link>
				</td>
				<td>
					{/* <p style={{fontSize:13}}>{props.shopcarts.quantity}</p> */}
				</td>
				<td>
					<p style={{ fontSize: 13 }}>{totals.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
				</td>
			</tr>
		</>
	)
}
export default Item;
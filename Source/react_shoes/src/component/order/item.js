import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slide from '../../assets/images/login-bg1.jpg';

function Item(props) {
    const hostname = "https://localhost:3000";
    const [listProduct, setlistProduct] = useState([0, 1])
    const [temp, settemp] = useState([])
    useEffect(() => {
        var tokenStr = localStorage.getItem("token");
        const config = {
            headers: { "Authorization": `Bearer_${tokenStr}` }
        };

        if (props.order.listOrderdetail) {
            props.order.listOrderdetail.map((orderdetail) =>
                axios.get(hostname + `/api/product/id/${orderdetail.productid}`, config)
                    .then((response) => {
                        console.log("success get product" + response.data);
                        // temp.push(Response.data)
                        settemp(props.order.listOrderdetail);
                        setlistProduct(Response.data)
                    })
                    .catch((error) => {
                        console.log("error get product" + error.response);
                    })
            )
        } else {
        }

    }, []);


    const ren = () => {
        console.log("abc" + temp)
        let list = temp || [];

        //    list.map((product)=>
        //         listProduct.map((pro)=>
        //             (pro.id == product.productid)?<h1>đsdsad</h1>:<h1>ádasds</h1>
        //         )
        //     )
    }

    const getTime = () => {
        var time = new Date(props.order.createdDate);
        var theyear = time.getFullYear();
        var themonth = time.getMonth() + 1;
        var thetoday = time.getDate();
        var theHours = time.getHours();
        var theMinute = time.getUTCMinutes();
        var str = "ngày " + thetoday + " tháng " + themonth + " năm " + theyear + "\t\t\t" + theHours + " giờ " + theMinute + " phút";
        //  time.toLocaleString();
        return str;
    }

    return (
        <>
            <table className="table table-cart table-mobile">
                <thead>
                    <tr>
                        <th>{getTime()}</th>
                        <th></th>
                        <th></th>
                        <th>Status : {props.order.status}</th>
                        <th>total : {props.order.total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ren()
                    }
                    <tr>
                        <td className="product-col">
                            <div className="product">
                                <figure className="product-media">
                                    <Link to="/a">
                                        <img src={Slide} alt="Product image" />
                                    </Link>
                                </figure>

                                <h3 className="product-title">
                                    <Link to="/a">name product</Link>
                                </h3>
                            </div>
                        </td>
                        <td className="price-col">2</td>
                        <td className="price-col">1</td>
                        <td style={{ marginRight: 50 }} className="price-col">1</td>
                        <td className="total-col">2</td>
                    </tr>
                </tbody>
            </table>
            <p></p>
        </>

    )
} export default Item;
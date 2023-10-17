import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import PageHeader from '../../assets/images/page-header-bg.jpg';
// import Item from './item';

function Order(props) {
    const hostname = "https://localhost:3000";
    let history = useHistory();
    const [listOrder, setlistOrder] = useState([{ listOrderdetail: [{ id: 0 }] }], [{ listimage: [{ url: "a" }] }]);
    const [listProduct, setlistProduct] = useState([{ name: "" }])
    const [open, setOpen] = useState("");

    var tokenStr = localStorage.getItem("token");
    //  check login 
    if (props.login === "0") {
        history.push("/login")
    }

    const config = {
        headers: { "Authorization": `Bearer_${tokenStr}` }
    };

    const getListOrder = () => {
        axios.get(hostname + '/api/orders/user', config)
            .then((response) => {
                console.log(response.data);
                setlistOrder(response.data)

            })
            .catch((error) => {
                let list = []
                setlistOrder(list)
                console.log(error.response.data.message)
                // alert()
            })
    }
    useEffect(() => {
        getListOrder();
    }, [])

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            let listId = [];
            listOrder.map((order) => {
                order.listOrderdetail.map((detail) => {
                    if (listId.indexOf(detail.productid) === -1) listId.push(detail.productid);
                })
            })
            console.log(listId)
            let listTemp = [];
            listId.map((id) => {
                axios.get(hostname + `/api/product/id/${id}`, config)
                    .then((response => {
                        console.log("abdc")
                        listTemp.push(response.data);
                    }))
                    .catch((error) => console.log(error.response))
            })
            console.log(listTemp);
            setTimeout(() => {
                setlistProduct(listTemp);
            }, 1000);
        }
    }, [listOrder])

    // hủy đơn hàng
    const DeniedOrder = (e) => {
        const config = {
            headers: { "Authorization": `Bearer_${tokenStr}` }
        };

        axios.post(hostname + '/api/orders/cancel', e, config)
            .then((Response) => {
                // success
                let list = []
                listOrder.filter((order, index) => {
                    if (order.id === e.id) {
                        order.status = "CANCEL"
                    }
                    list.push(order)
                })
                setlistOrder(list)
                alert("huy thanh cong")


            })
            .catch((error) => {
                console.log("error " + error.response)
            })
    }


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
            // u = "data:image/png;base64,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";
            if (product.id === id && product.listimage) {
                u = product.listimage[number].url;
                return product.listimage[number].url;
            }

        })
        return u;
    }

    const showHide = (e) => {
        if (open === "") {
            setOpen(e)
        } else {
            setOpen("")
        }
    }

    //time 
    const getTime = (time) => {
        var time = new Date(time);
        var theyear = time.getFullYear();
        var themonth = time.getMonth() + 1;
        var thetoday = time.getDate();
        var theHours = time.getHours();
        var theMinute = time.getUTCMinutes();
        var str = thetoday + " tháng " + themonth + " năm " + theyear + "\t\t\t" + theHours + "h" + theMinute + "p";
        //  time.toLocaleString();
        return str;
    }

    let JsxContent = listOrder.map((order, index) => {
        let price = order.total || 0;
        let status = order.status || ""

        let info = order.listOrderdetail.map((detail) => {
            let prices = detail.price || 0
            return <>
                <tr>
                    <td width="600" className="product-col">
                        <div className="product">
                            <figure className="product-media">
                                <Link to={{ pathname: `/product/${detail.productid}` }}>
                                    <img src={idToUrl(detail.productid)} alt="Product image" />
                                </Link>
                            </figure>
                            <h3 className="product-title">
                                <Link to={{ pathname: `/product/${detail.productid}` }}>{idToName(detail.productid)}</Link>
                            </h3>
                        </div>
                    </td>
                    <td width="300" className="price-col">
                        <p style={{ marginTop: 20, fontSize: 15, fontWeight: 400, color: 'black' }}>Số Lượng: {detail.quantity}</p>
                    </td>
                    <td width="300" className="price-col">
                        <p style={{ marginTop: 20, fontSize: 15, fontWeight: 400, color: 'black' }}>Size: {detail.size}</p>
                    </td>
                    <td width="300" style={{ marginRight: 50 }} className="price-col"></td>
                    <td width="300" className="total-col">
                        <p style={{ color: "black", fontWeight: 400, marginTop: 20 }}>
                            {prices.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </p>
                    </td>
                </tr>
            </>
        })


        return <>
            <table className="table table-cart table-mobile">
                <thead>
                    <tr>
                        <th  >
                            <p style={{ color: "black", fontWeight: 500 }}> {getTime(order.createdDate)}</p>
                        </th>
                        <th></th>
                        <th></th>
                        <th>
                            {(status == "DELIVERED" ?
                                <p style={{ color: 'green', fontSize: 16 }}>ĐÃ GIAO</p>
                                : "")}
                            {(status == "CANCEL" ?
                                <p style={{ color: 'red', fontSize: 16, textAlign: 'left' }}>ĐÃ HỦY</p>
                                : "")}
                            {(status == "DELIVERING" ?
                                <p style={{ color: 'blue', fontSize: 16 }}>ĐANG GIAO</p>
                                : "")}
                            {(status == "UNCONFIRM" ?
                                <p style={{ color: 'purple', fontSize: 16 }}>CHỜ XÁC NHẬN</p>
                                : "")}
                        </th>
                        <th>
                            <p style={{ color: "#CC9966", fontWeight: 500, paddingTop: 50 }}>
                                {price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                            </p>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {info}
                    <tr style={{ border: 'none' }} >
                        <td></td>
                        <td></td>
                        <td></td>
                        {(status === "DELIVERING" || status === "UNCONFIRM" ?
                            <>
                                <td>
                                    <button style={{ width: 150 }} type="button" onClick={(e) => showHide(order.id)} className="btn btn-outline-primary-2">
                                        <span>Chi tiết </span>
                                    </button>
                                </td>
                                <td>
                                    <button style={{ width: 150 }} type="button" onClick={(e) => DeniedOrder(order)} className="btn btn-outline-primary-2">
                                        <span>Hủy Đơn Hàng</span>
                                    </button>

                                </td>
                            </>
                            :
                            <>
                                <td width="180" ></td>
                                <td>
                                    <button style={{ width: 150 }} type="button" onClick={(e) => showHide(order.id)} className="btn btn-outline-primary-2">
                                        <span>Chi tiết </span>
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                </tbody>
            </table>
            {(open === order.id ?
                <div style={{ display: 'flex' }} >
                    <div style={{ width: 150 }}>
                        <p>Người nhận:</p>
                        <p style={{ width: 200, wordBreak: 'break-all' }} >{order.fullname}</p>
                    </div>
                    <div style={{ marginLeft: 50 }}>
                        <p>số điện thoại</p>
                        <p>{order.phone}</p>
                    </div>
                    <div style={{ marginLeft: 50 }}>
                        <p>email</p>
                        <p>{order.email}</p>
                    </div>
                    <div style={{ marginLeft: 50, width: 200 }}>
                        <p>địa chỉ</p>
                        <p style={{ width: 200, wordBreak: 'break-all' }}>{order.address}</p>
                    </div>
                    <div style={{ marginLeft: 50 }}>
                        <p>phương thức thanh toán</p>
                        <p style={{ textAlign: "center" }}>{order.paymentEntity.name}</p>
                    </div>
                </div>
                : "")}
        </>
    })

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




    return (
        <>
            <main claclassNamess="main">
                <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">My Order</li>
                        </ol>
                    </div>
                </nav>
                <div className="page-header text-center" style={{ backgroundImage: "url(" + PageHeader + ")" }} >
                    <div className="container">
                        <h1 className="page-title">My Order<span>Shop</span></h1>
                    </div>
                </div><br></br>
                <div className="page-content">
                    <div className="dashboard">
                        <div className="container">
                            <div className="row">
                                <aside className="col-md-2 col-lg-2">
                                    <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                                        <li className="nav-item">
                                            <Link className="nav-link" id="tab-account-link" data-toggle="tab" to="/account" role="tab" aria-controls="tab-account" aria-selected="false">Account Details</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link style={{ color: '#CC9966' }} className="nav-link active" id="tab-orders-link" data-toggle="tab" to="/order" role="tab" aria-controls="tab-orders" aria-selected="false" type="button">Orders</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" onClick={logout} style={{ cursor: 'pointer' }}>Sign Out</a>
                                        </li>
                                    </ul>
                                </aside>

                                <div className="col-md-10 col-lg-10">

                                    {JsxContent}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Order;
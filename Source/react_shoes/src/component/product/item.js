
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function Item(props) {
    let history = useHistory();
    const hostname = "https://localhost:3000";
    let tokenStr = localStorage.getItem("token");
    const config = {
        headers: { "Authorization": `Bearer_${tokenStr}`, 'Content-Type': 'application/json' }
    };

    const insertshopcart = () => {

        if (props.login !== "1") {
            alert("bạn phải đăng nhập trước")
            return false
        }

        // check inventory
        var proactive = ""
        props.product.listsize.filter((pro) => {
            if (pro.inventory > 0) {
                proactive = pro;
                return proactive
            }
        })

        if (proactive === "") {
            alert("Sản phẩm tạm thời hết hàng! Quay lại sau")
            return false
        }

        const bodyParameters = {
            productdetail: {
                id: proactive.id,
                productid: proactive.productid,
                size: proactive.size,
                inventory: proactive.inventory
            },
            quantity: 1
        };


        axios.post(hostname + '/api/shopcart/create', bodyParameters, config)
            .then((Response) => {
                console.log(" insert shopcart success")
                alert("thêm thành công ")
                let listSC = JSON.parse(localStorage.getItem("SC")) || []
                let number = 1;
                listSC.filter((sc) => {
                    if (sc.id !== props.product.listsize[0].id) {
                        number++
                    }
                })
                props.setSC(number)

                if (number === listSC.length) {
                    listSC.push({
                        id: props.product.listsize[0].id
                    })
                    localStorage.setItem("SC", JSON.stringify(listSC))
                }

            })
            .catch((error) => {
                console.log(bodyParameters)
                console.log(JSON.stringify(bodyParameters))
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            })
    }


    const addWWishlist = () => {

        if (props.login !== "1") {
            alert("bạn phải đăng nhập trước")
            return false
        }

        var customerid = localStorage.getItem("customerid");
        const bodyParameters = {
            customerid: customerid,
            productid: props.product.id
        };

        axios.post(hostname + '/api/wishlist', bodyParameters, config)
            .then((Response) => {
                alert("thêm thành công")
                console.log(" insert wishlist success")
                let listWL = JSON.parse(localStorage.getItem("WL")) || []
                console.log("get wl " + listWL.length)
                let number = 1;
                listWL.filter((wl) => {
                    if (wl.id !== props.product.id) {
                        number++
                    }
                })
                props.setWL(number)
                if (number === listWL.length) {

                } else {
                    listWL.push({
                        id: props.product.id
                    })
                    localStorage.setItem("WL", JSON.stringify(listWL))
                }
            })
            .catch((error) => {
                alert("sản phẩm đã ở trong wishlist")
                console.log('Error', error.message);
            })
    }

    const handleClick = (e) => {
        // history.push("/product/"+e)
        axios.get(hostname + `/api/product/id/` + e)
            .then((Response) => {
                props.setPro(Response.data)
                props.setImg(Response.data.listimage[0].url)
                getRandom(Response.data.categoryid)
            })
            .catch((error) => {
                console.log("error ")
            })
        history.push("/product/" + e)
    }

    const getRandom = (e) => {
        axios.get(hostname + '/api/product/page/random?limit=6&category=' + e)
            .then((Response) => {
                console.log(" get list product random success")
                props.setRandom(Response.data)
                window.scrollTo(0, 0)
            })
            .catch((error) => {
                console.log("error " + error.response)
            })
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

    var percent = 0;
    var percent100
    if (props.product.discount !== null && props.product.discount !== "") {
        let sales = props.saless || []
        sales.filter((sale) => {
            if (sale.id === props.product.discount && checkdate(sale.deadline)) {
                percent100 = sale.percent
                percent = (sale.percent) / 100;
                return percent
            }
        })
    }
    return (
        <>
            <div className="product-item lighting sale col-12 col-md-12 col-lg-12">
                <div className="product product-4">
                    {(percent !== 0 ?
                        <span class="product-label" style={{ color: 'red' }}>SALE {percent100}%</span>
                        :
                        <span class="product-label" style={{ color: 'red' }}>Đề Xuất</span>
                    )}
                    {/* <span class="product-label">Sale</span> */}
                    <figure className="product-media">
                        <a onClick={(e) => handleClick(props.product.id)} style={{ cursor: 'pointer' }}>
                            <img src={props.product.listimage[0].url} alt="Product image" className="product-image" />
                        </a>

                        <div className="product-action-vertical">
                            <a style={{ cursor: "pointer" }} onClick={addWWishlist} className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                        </div>

                        <div className="product-action">
                            <Link to={{ pathname: `/product/${props.product.id}` }} className="btn-product btn-quickview" title="Quick view"><span>quick view</span></Link>
                        </div>
                    </figure>

                    <div className="product-body">
                        <h3 className="product-title"><Link to={{ pathname: `/product/${props.product.id}` }}>{props.product.name}</Link></h3>
                        <div className="product-price">
                            {(percent !== 0 ?
                                <>
                                    <p style={{ color: '#CC9966', textDecorationLine: 'line-through' }}> {props.product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}  </p>
                                    <p style={{ color: '#CC9966', marginLeft: 15 }}> {(props.product.price - (props.product.price * percent)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                </>
                                :
                                <p style={{ color: '#CC9966' }}> {props.product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}  </p>
                            )}
                        </div>

                        <div className="product-action">
                            <a style={{ cursor: "pointer" }} onClick={insertshopcart} className="btn-product btn-cart"><span>add to cart</span><i className="icon-long-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Item;

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './style1.css'
import Item from "./item";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'react-slideshow-image/dist/styles.css'

function Product(props) {
    const hostname = "https://localhost:3000";
    let { id } = useParams();
    const [imagepro, setimagepro] = useState("")
    const [products, setproducts] = useState({ listsize: [], listimage: [1], price: 0 })
    const [value, setvalue] = useState("1")
    const [listSale, setlistSale] = useState([])
    const [listProductRandom, setlistProductRandom] = useState([])
    const [conhang, setconhang] = useState(0)

    var tokenStr = localStorage.getItem("token")
    var PageSize = 6;
    const config = {
        headers: { "Authorization": `Bearer_${tokenStr}` }
    };

    useEffect(() => {
        axios.get(hostname + `/api/product/id/${id}`)
            .then((Response) => {
                console.log(" product success ")
                setimagepro(Response.data.listimage[0].url)
                setproducts(Response.data)

                // get sale
                axios.get(hostname + '/api/discount/get')
                    .then((Response) => {
                        console.log(" get list sale success")
                        setlistSale(Response.data)

                    })
                    .catch((error) => {
                        console.log("error ")
                    })

                // get list product random
                getRandom(Response.data.categoryid)

                // check inventory
                setconhang(Response.data.listsize[0].inventory)
            })
            .catch((error) => {
                console.log("error ")
            })
        window.scrollTo(0, 0)
    }, []);


    const getRandom = (e) => {
        axios.get(hostname + '/api/product/page/random?limit=6&category=' + e)
            .then((Response) => {
                console.log(" get list product category success")
                setlistProductRandom(Response.data)

            })
            .catch((error) => {
                console.log("error " + error.response)
            })
    }


    const insertshopcart = () => {

        if (props.login !== "1") {
            alert("bạn phải đăng nhập trước")
            return false
        }

        if (products.status === "INACTIVE") {
            alert("sản phẩm tạm thời ngừng bán")
            return false
        }

        var productdetailid = document.getElementById("size").value;
        let index = document.getElementById("size").selectedIndex;
        let size = document.getElementById("size")[index].text;
        var quantitys = document.getElementById("quantity").value;

        // check quantity
        {
            if (quantitys === '' || quantitys === '0') {
                alert("số lượng sản phẩm một lần mua tối thiểu là 1");
                return false
            }
        }


        if (conhang === 0 || (conhang - quantitys < 0)) {
            alert("size này tạm thời chỉ còn " + conhang + " sản phẩm!")
            return false;
        }

        const bodyParameters = {
            productdetail: {
                id: productdetailid,
                productid: products.id,
                size: size,
                inventory: conhang
            },
            quantity: quantitys
        };
        console.log(bodyParameters)
        axios.post(hostname + '/api/shopcart/create', bodyParameters, config)
            .then((Response) => {
                console.log(" insert shopcart success")
                alert("thêm thành công")

                let listSC = JSON.parse(localStorage.getItem("SC")) || []
                let number = 1;
                listSC.filter((sc) => {
                    if (sc.id !== productdetailid) {
                        number++
                    }
                })
                props.setSC(number)
                if (number === listSC.length) {
                } else {
                    listSC.push({
                        id: productdetailid
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
            productid: products.id
        };


        axios.post(hostname + '/api/wishlist', bodyParameters, config)
            .then((Response) => {
                console.log(" insert wishlist success")
                alert("thêm thành công")

                let listWL = JSON.parse(localStorage.getItem("WL")) || []
                console.log("get wl " + listWL.length)
                let number = 1;
                listWL.filter((wl) => {
                    if (wl.id !== products.id) {
                        number++
                    }
                })
                props.setWL(number)
                if (number === listWL.length) {

                } else {
                    listWL.push({
                        id: products.id
                    })
                    localStorage.setItem("WL", JSON.stringify(listWL))
                }
            })
            .catch((error) => {
                alert("sản phẩm đã ở trong wishlist")
                console.log('Error', error.message);
            })
    }

    const change = () => {
        var quantitys = document.getElementById("quantity").value;
        setvalue(quantitys);
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
    var percent100 = 0;
    if (products.discount !== null && products.discount !== "") {
        listSale.filter((sale) => {
            if (sale.id == products.discount && checkdate(sale.deadline)) {
                percent100 = sale.percent
                percent = (sale.percent) / 100;
                return percent
            }
        })
    }

    const changeSize = (e) => {
        let prodetailid = document.getElementById("size").value;
        let c = 0;
        products.listsize.filter((pro) => {
            if (pro.id == prodetailid) {
                setconhang(pro.inventory);
                c = pro.inventory;
                return c;
            }
        })

    }

    const changeImage = (e) => {
        setimagepro(e)
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <>
            <main className="main">
                <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                    <div className="container d-flex align-items-center">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/product">Sản Phẩm</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{products.name}</li>
                        </ol>
                    </div>
                </nav>

                <div className="page-content">
                    <div className="container">
                        <div className="product-details-top mb-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="product-gallery product-gallery-vertical">
                                        <div className="row rowproduct " >


                                            {/*figure className="product-main-image" */}
                                            <div className="col-md-10">
                                                <div className="item">
                                                    <img id="product-zoom" src={imagepro} data-zoom-image="" alt="product image" />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="item">
                                                    {products.listimage.map((image, index) =>
                                                        <a style={{ cursor: "pointer" }} className="product-gallery-item active" onClick={(e) => changeImage(image.url)} data-image="{image.url}" data-zoom-image={image.url} >
                                                            <img src={image.url} alt="product side" />
                                                        </a>
                                                    )}

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="product-details product-details-centered">
                                        <h1 className="product-title">
                                            <div>
                                                <p style={{ fontSize: 22, color: 'black' }}>{products.name} </p>
                                                {(percent100 !== 0 ?
                                                    <p style={{ fontSize: 18, color: 'red' }}>Giảm {percent100} %</p>
                                                    : "")}
                                            </div>
                                        </h1>
                                        <div className="product-price">
                                            {(percent !== 0 ?
                                                <>
                                                    <p style={{ color: '#CC9966', fontSize: 18, textDecorationLine: 'line-through' }}>{products.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                                    <p style={{ color: '#CC9966', fontSize: 18, marginLeft: 15 }}>{(products.price - (products.price * percent)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                                </>
                                                :
                                                <p style={{ color: '#CC9966', fontSize: 18 }}>{products.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                            )}


                                        </div>
                                        <div>
                                            {(conhang !== 0) ?
                                                <>
                                                    <p>Tình trạng: Còn {conhang} sản phẩm</p>
                                                </>
                                                :
                                                <p>Tình trạng: hết hàng</p>
                                            }
                                        </div>
                                        <div className="details-filter-row details-row-size">
                                            <label for="size">Size:</label>
                                            <div className="select-custom">
                                                <select name="size" id="size" className="form-control" onChange={(e) => changeSize(e)}>
                                                    {products.listsize.map((pro) =>
                                                        <option value={pro.id} >{pro.size}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="product-details-action">
                                            <div className="details-action-col">
                                                <div className="product-details-quantity">
                                                    <input type="number" id="quantity" class="form-control" value={value} onChange={change} min="1" max="10" step="1" required />
                                                </div>
                                                <a style={{ cursor: "pointer" }} onClick={insertshopcart} className="btn-product btn-cart"><span>add to cart</span></a>
                                            </div>

                                            <div className="details-action-wrapper">
                                                <a style={{ cursor: 'pointer' }} onClick={addWWishlist} className="btn-product btn-wishlist" title="Wishlist"><span>Add to Wishlist</span></a>
                                            </div>
                                        </div>

                                        <div className="product-details-footer">
                                            <div className="product-cat">
                                                <span>Category: {products.categoryname}</span>
                                                <p></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product-details-tab">
                            <ul className="nav nav-pills justify-content-center" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link" id="product-desc-link" data-toggle="tab" role="tab" aria-controls="product-desc-tab" aria-selected="true">Description</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="product-desc-tab" role="tabpanel" aria-labelledby="product-desc-link">
                                    <div className="product-desc-content">
                                        <h3>Product Information</h3>
                                        <p>{products.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className="title text-center mb-4">Có Thể Bạn Quan Tâm</h2>
                        <Carousel
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            // autoPlay={props.deviceType !== "mobile" ? true : false}
                            autoPlay={true}
                            autoPlaySpeed={6000}
                            centerMode={true}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                        >
                            {listProductRandom.map((product) => (
                                <Item product={product} checks="1" saless={listSale} setPro={setproducts}
                                    setImg={setimagepro} setRandom={setlistProductRandom}
                                    setWL={props.setWL} setSC={props.setSC}
                                    login={props.login}
                                ></Item>
                            ))}
                        </Carousel>;
                    </div>
                </div>
            </main>
        </>
    )
}
export default Product;





import { Link, useHistory } from "react-router-dom";
import PageHeader from '../../assets/images/page-header-bg.jpg';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Item from "./item";

function Wishlist(props) {
    const hostname = "https://localhost:3000";
    let history = useHistory();
    const [listWishlist, setlistWishlist] = useState([])
    const [listProduct, setlistProduct] = useState([])
    const [deletewl, setdeletewl] = useState("")


    let tokenStr = localStorage.getItem("token");
    //  check login 
    if (props.login === "0") {
        history.push("/login")
    }

    useEffect(() => {
        const config = {
            headers: { "Authorization": `Bearer_${tokenStr}` }
        };
        axios.get(hostname + `/api/wishlist`, config)
            .then((Response) => {
                console.log("get list wishlist success")
                setlistWishlist(Response.data)
            })
            .catch((error) => {
                console.log("error ")
            })
    }, []);

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            let listId = [];
            listWishlist.map((wl) => {
                if (listId.indexOf(wl.productid) === -1) listId.push(wl.productid);
            })
            let listTemp = [];
            listId.map((id) => {
                axios.get(hostname + `/api/product/id/${id}`)
                    .then((response => {
                        listTemp.push(response.data);
                    }))
                    .catch((error) => console.log(error.response))
            })
            console.log(listTemp);
            setTimeout(() => {
                setlistProduct(listTemp);
            }, 1000);
        }
    }, [listWishlist])


    // delete wl
    if (deletewl !== "") {
        let arr = []
        listWishlist.filter((wl, index) => {
            if (wl.id !== deletewl) {
                arr.push(wl)
            }
        })
        setdeletewl("")
        setlistWishlist(arr)
    }


    return (
        <>
            <main className="main">
                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Wishlist</li>
                        </ol>
                    </div>
                </nav>
                <div className="page-header text-center" style={{ backgroundImage: "url(" + PageHeader + ")" }}>
                    <div className="container">
                        <h1 className="page-title">Wishlist<span>Shop</span></h1>
                    </div>
                </div><br />

                <div className="page-content">

                </div>
                <div className="container">
                    <div className="products-container" data-layout="fitRows">
                        {listProduct.map((product) => (
                            <Item product={product} wishlists={listWishlist} deletes={setdeletewl} setWL={props.setWL}  ></Item>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}
export default Wishlist;


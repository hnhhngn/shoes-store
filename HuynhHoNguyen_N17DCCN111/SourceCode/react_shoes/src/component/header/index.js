import icon from '../../assets/logo.png'
import '../../assets/css/style.css'
import './style1.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
// import "../../assets/css/bootstrap.min.css"
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

function Header(props) {
    const hostname = "http://localhost:8080";
    const [isLogin, setisLogin] = useState("");

    useEffect(() => {
        var tokenStr = localStorage.getItem("token");
        //  check login 
        if (tokenStr == "0") {
            props.check("0");
        }

        const config = {
            headers: { "Authorization": `Bearer_${tokenStr}` }
        };

        axios.get(hostname + '/api/customers', config)
            .then((Response) => {
                console.log(" get customer success")
                localStorage.setItem("customerid", Response.data.id);
                props.check("1");
            })
            .catch((error) => {
                console.log("error " + error.response)
                props.check("0");
            })

        // wishlist
        axios.get(hostname + `/api/wishlist`, config)
            .then((Response) => {
                console.log("get list wishlist success")
                props.setWL(Response.data.length)
                let list = []
                Response.data.filter((wl) => {
                    list.push({
                        id: wl.productid
                    })
                })
                localStorage.setItem("WL", JSON.stringify(list))
                console.log("save item wl " + list.length)
            })
            .catch((error) => {
                console.log("error ")
                let list = []
                localStorage.setItem("WL", JSON.stringify(list))
            })

        //shopcart
        axios.get(hostname + `/api/shopcart`, config)
            .then((Response) => {
                console.log("success get shopcart " + Response.data);
                props.setSC(Response.data.length)
                let list = []
                Response.data.filter((sc) => {
                    list.push({
                        id: sc.productdetail.id
                    })
                })
                localStorage.setItem("SC", JSON.stringify(list))
                console.log("save item sc " + list.length)
            })
            .catch((error) => {
                console.log("error " + error.response);
                let list = []
                localStorage.setItem("SC", JSON.stringify(list))
            })


    }, [])


    var login = localStorage.getItem("token") || "";
    var name = localStorage.getItem("nameUser") || "";

    let jsx = <>
        <Link to="/login" className="wishlist-link">
            <p className="dangnhap">Đăng Nhập</p>
            <i className="icon-user"></i>
        </Link>
    </>

    let jsx1 = <>
        <Link to="/account" className="wishlist-link">
            {
                (name.length < 6) ?
                    <div style={{ textAlign: 'center' }}>
                        <p className="dangnhap1">Chào {name}</p>
                    </div>
                    :
                    <div style={{ textAlign: 'center' }}>
                        <p className="dangnhap1">Chào</p>
                        <p className="dangnhap1">{name}</p>
                    </div>
            }
            <i className="icon-user"></i>
        </Link>
    </>

    return (
        <>
            <header className="header header-7" >
                <div className="header-middle sticky-header">
                    <div className="container">
                        <div className="header-left">
                            <button className="mobile-menu-toggler">
                                <span className="sr-only">Toggle mobile menu</span>
                                <i className="icon-bars"></i>
                            </button>
                            <Link to="/" className="logo" >
                                <img src={icon} alt="Molla Logo" width="150" height="50" />
                            </Link>
                        </div>
                        <div className="header-right">
                            <nav style={{ marginRight: 400 }} className="main-nav">
                                <ul className="menu sf-arrows" >
                                    <li className="megamenu-container active">
                                        <Link to="/" >Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/product" >Sản Phẩm</Link>
                                    </li>
                                </ul>
                            </nav>
                            <Link to="/wishlist" className="wishlist-link">
                                <i className="icon-heart-o"></i>
                                {(props.WL !== 0 ?
                                    <span class="wishlist-count">{props.WL}</span>
                                    : "")}
                            </Link>

                            <Link to="/shopcart" className="wishlist-link">
                                <i className="icon-shopping-cart"></i>
                                {(props.SC !== 0 ?
                                    <span class="wishlist-count">{props.SC}</span>
                                    : "")}

                            </Link>

                            {
                                (props.logout == '1') ? jsx1 : jsx
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header
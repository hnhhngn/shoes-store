import './style1.css'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from '../../assets/images/login-bg1.jpg';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';



function Login(props) {
    const hostname = "https://localhost:3000";
    let history = useHistory();
    const linkgg = 'https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=https://localhost:3000/api/auth/login-google&response_type=code&client_id=721465338797-4lcqo4qql4vmevh90pnaahvo6tem4lsr.apps.googleusercontent.com&approval_prompt=force';
    const linkfb = 'https://www.facebook.com/dialog/oauth?client_id=1101972766995519&redirect_uri=https://localhost:3000/api/auth/login-facebook';


    useEffect(() => {
        let title = (new URLSearchParams(window.location.search)).get("platform")
        let token = (new URLSearchParams(window.location.search)).get("token")
        if (title !== null && title !== "" && token !== null && token !== "") {
            // alert(title)
            console.log(token)
            getUser(token)
        }
    }, [])

    const loginAccount = () => {

        var username = document.getElementById("singin-email");
        var password = document.getElementById("singin-password");
        console.log("u " + username.value)
        console.log("p " + password.value)
        const bodyParameters = {
            username: username.value,
            password: password.value
        };

        axios.post(hostname + '/api/auth/signin', bodyParameters)
            .then((Response) => {
                console.log(" login success")
                console.log(Response.data);
                localStorage.setItem("token", Response.data.token)
                getUser(Response.data.token)

                // check admin
                console.log(Response.data.roles[0])
                let check = Response.data.roles[0];
                if (check === "ADMIN") {
                    localStorage.setItem("username", Response.data.username)
                    localStorage.setItem("role", Response.data.roles[0])
                    props.checkAdmin(1)
                } else {
                    getList(Response.data.token)
                }
            })
            .catch((error) => {
                console.log("error " + error.response)
                alert("login error! try again")
            })
    }



    const getUser = (e) => {
        // get name
        const config = {
            headers: { "Authorization": `Bearer_${e}` }
        };
        axios.get(hostname + '/api/users', config)
            .then((Response) => {
                localStorage.setItem("token", e)
                let str = Response.data.name;
                // Returns 12
                if (str.length > 10) {
                    let name = str.substring(0, 11)
                    localStorage.setItem("nameUser", name)
                } else {
                    localStorage.setItem("nameUser", str)
                }
                props.logout("1");
                history.push("/")
                console.log(" get user success")
            })
            .catch((error) => {
                console.log("error 1 " + error.data)
                alert("signup error! try again")
            })
    }


    const getList = (e) => {
        const config = {
            headers: { "Authorization": `Bearer_${e}` }
        };
        // wishlist
        axios.get(hostname + `/api/wishlist`, config)
            .then((Response) => {
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
                console.log("error " + error.response)
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

    }

    return (
        <>
            <main className="main">
                <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" href="" aria-current="page">Login</li>
                        </ol>
                    </div>
                </nav>

                <div className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17" style={{ backgroundImage: "url(" + Background + ")" }} >
                    <div className="container">
                        <div className="form-box">
                            <div className="form-tab">
                                <ul className="nav nav-pills nav-fill" role="tablist">
                                    <li className="nav-item">
                                        <Link className="nav-link active" id="signin-tab-2" data-toggle="tab" role="tab" to="/login" aria-controls="signin-2" aria-selected="true">Sign In</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link " id="register-tab-2" data-toggle="tab" to="/signup" role="tab" aria-controls="register-2" aria-selected="false">Register</Link>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="signin-2" role="tabpanel" aria-labelledby="signin-tab-2">
                                        <form action="">
                                            <div className="form-group">
                                                <label for="singin-email-2">Username or email address *</label>
                                                <input style={{ fontSize: 14 }} type="text" className="form-control" id="singin-email" name="singin-email" required />
                                            </div>

                                            <div className="form-group">
                                                <label for="singin-password-2">Password *</label>
                                                <input style={{ fontSize: 14 }} type="password" className="form-control" id="singin-password" name="singin-password" required />
                                            </div>

                                            <div className="form-footer">
                                                {/* <button type="button" onClick={loginAccount} className="btn btn-outline-primary-2">
                                                            <span>LOG IN</span>
                                                            <i className="icon-long-arrow-right"></i>
                                                        </button> */}
                                                <button type="button" onClick={loginAccount} className="btn btn-outline-primary-2">
                                                    <span >LOG IN</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </button>

                                                {/* <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="signin-remember-2"/>
                                                            <label className="custom-control-label" for="signin-remember-2">Remember Me</label>
                                                        </div> */}
                                                {/* <a href="/forgot" className="forgot-link">Forgot Your Password?</a> */}
                                            </div>
                                        </form>
                                        <div className="form-choice">
                                            <p className="text-center">or sign in with</p>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <a href={linkgg} className="btn btn-login btn-g">
                                                        <i className="icon-google"></i>
                                                        Login With Google
                                                    </a>
                                                </div>
                                                <div className="col-sm-6">
                                                    <a href={linkfb} className="btn btn-login btn-f">
                                                        <i className="icon-facebook-f"></i>
                                                        Login With Facebook
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
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

export default Login;
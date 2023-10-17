import { BrowserRouter as Router, Switch, Route, BrowserRouter } from "react-router-dom";
import React, { useState } from 'react';
import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
// import 'jquery/dist/jquery.min.js';
//user
import Header from './component/header';
import Footer from "./component/footer";
import Login from "./component/login";
import Signup from "./component/signup";
import Home from "./component/home";
import Error from "./component/error";
import Shopcart from "./component/shopcart";
import Product from "./component/product";
import Checkout from "./component/checkout";
import Account from "./component/account";
import Order from "./component/order";
import Wishlist from "./component/wishlist";
import MoreProduct from "./component/MoreProduct";

// admin
import ProductAdmin from "./component/Admin/ProductAdmin";
import MainAdmin from "./component/Admin/MainAdmin";
import PageSpinner from "./component/Admin/Pages/PageSpinner";
import OrderAdmin from "./component/Admin/OrderAdmin";
import CategoryAdmin from "./component/Admin/CategoryAdmin";
import DiscountAdmin from "./component/Admin/DiscountAdmin";
import RepositoryAdmin from "./component/Admin/RepositoryAdmin";
import ChartOrder from "./component/Admin/ChartAdmin/ChartOrder";
import ChartProduct from "./component/Admin/ChartAdmin/ChartProduct";
import ChartDoanhThuAdmin from "./component/Admin/ChartAdmin/ChartDoanhThuAdmin";
import CreateAccount from "./component/Admin/AccountAdmin/CreateAccount";
import ChangePassword from "./component/Admin/AccountAdmin/ChangePassword";
import { createBrowserHistory } from "history";
function App() {
  // redux,concext
  const hostname = "https://localhost:3000";
  const [state, setstate] = useState("")
  const [isAdmin, setisAdmin] = useState(0)
  // wishlist and shopcart customer
  const [WishlistSize, setWishlistSize] = useState(0)
  const [ShopcartSize, setShopcartSize] = useState(0)


  // check login
  var tokenStr = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  return (
    <>
      {(role === "ADMIN" ?
        <Router>
          <Switch>
            <MainAdmin logout={setstate} checkAdmin={setisAdmin} history={createBrowserHistory()} >
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/product" >
                  <ProductAdmin></ProductAdmin>
                </Route>
                <Route exact path="/order" >
                  <OrderAdmin></OrderAdmin>
                </Route>
                <Route exact path="/category" >
                  <CategoryAdmin></CategoryAdmin>
                </Route>
                <Route exact path="/discount" >
                  <DiscountAdmin></DiscountAdmin>
                </Route>
                <Route exact path="/repository" >
                  <RepositoryAdmin></RepositoryAdmin>
                </Route>
                <Route exact path="/chartorder" >
                  <ChartOrder></ChartOrder>
                </Route>
                <Route exact path="/chartproduct" >
                  <ChartProduct></ChartProduct>
                </Route>
                <Route exact path="/chartdoanhthu" >
                  <ChartDoanhThuAdmin></ChartDoanhThuAdmin>
                </Route>
                <Route exact path="/createaccount" >
                  <CreateAccount></CreateAccount>
                </Route>
                <Route exact path="/changepassword" >
                  <ChangePassword></ChangePassword>
                </Route>
              </React.Suspense>
            </MainAdmin>
          </Switch>
        </Router>
        :
        <>
          <Router>
            <Header logout={state} check={setstate}
              setWL={setWishlistSize} WL={WishlistSize} setSC={setShopcartSize} SC={ShopcartSize} >
            </Header>
            <Switch>

              <Route exact path="/">
                <Home login={state} setWL={setWishlistSize} setSC={setShopcartSize} ></Home>
              </Route>

              <Route path="/signup" component={Signup} />

              <Route exact path="/login" >
                <Login checkAdmin={setisAdmin} logout={setstate} setWL={setWishlistSize} setSC={setShopcartSize} ></Login>
              </Route>

              <Route exact path="/shopcart">
                <Shopcart login={state} setSC={setShopcartSize} ></Shopcart>
              </Route>

              <Route exact path="/checkout">
                <Checkout login={state} setSC={setShopcartSize}  > </Checkout>
              </Route>

              <Route exact path="/account" >
                <Account logout={setstate} setWL={setWishlistSize} setSC={setShopcartSize}  ></Account>
              </Route>

              <Route exact path="/order" >
                <Order login={state} logout={setstate} setWL={setWishlistSize} setSC={setShopcartSize}  ></Order>
              </Route>

              <Route exact path="/wishlist">
                <Wishlist login={state} setWL={setWishlistSize} ></Wishlist>
              </Route>

              <Route exact path="/product">
                <MoreProduct login={state} setWL={setWishlistSize} setSC={setShopcartSize}></MoreProduct>
              </Route>

              {/* <Route path="/product/:id" component={Product}/> */}
              <Route path="/product/:id" children={<Product login={state} setWL={setWishlistSize} setSC={setShopcartSize} />} />
              <Route path="**" component={Error} />
            </Switch>
            <Footer></Footer>
          </Router>
        </>
      )}

    </>
  );
}

export default App;

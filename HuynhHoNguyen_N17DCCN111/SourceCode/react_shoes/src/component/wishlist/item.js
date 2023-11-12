
import { Link } from 'react-router-dom';
import axios from 'axios';

function Item(props){
    const hostname = "http://localhost:8080"; 

    const deletewishlist =()=>{
        
        var tokenStr = localStorage.getItem("token");
        const config = {
            headers: {"Authorization" : `Bearer_${tokenStr}`}
        };

        var wls = "";
        props.wishlists.filter((wl)=>{
            if(wl.productid === props.product.id){
                wls = wl;
                return wls;
            }
        })
        console.log(JSON.stringify(wls));  
        axios.post(hostname+'/api/wishlist/delete',wls,config)
        .then((Response)=>{
            alert("đã xóa sản phẩm trong wishlist")
            props.deletes(wls.id)
            // change shopcart span
			let listWL = JSON.parse(localStorage.getItem("WL"))|| []
            let listWLnew = [];
            listWL.filter((wl)=>{
                if(wl.id !== props.product.id){
                  return  listWLnew.push(wl)
                }
            })
            props.setWL(listWLnew.length)
            localStorage.setItem("WL",JSON.stringify(listWLnew))
            })
        .catch((error) =>{
            if (error.response) {
				// Request made and server responded
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			}
            console.log(error.message);  
            alert("error")
            })
    }

    return(
       <>
            <div className="product-item lighting sale col-6 col-md-4 col-lg-3">
                <div className="product product-4">
                {/* <span class="product-label">Sale</span> */}
                    <figure className="product-media">
                        <Link to={{pathname: `/product/${props.product.id}`}}>
                            <img src={props.product.listimage[0].url} alt="Product image" className="product-image"/>
                        </Link>
                    </figure>

                    <div className="product-body">
                            <h3 className="product-title"><Link to={{pathname: `/product/${props.product.id}`}}>{props.product.name}</Link></h3>
                            <div className="product-action">
                                <a style={{cursor:"pointer"}} onClick={deletewishlist} className="btn-product btn-cart"><span>Xóa khỏi wishlist</span><i className="icon-long-arrow-right"></i></a>
                            </div>
                     </div>

               </div>
            </div>
       </>
    )
};
export default Item;

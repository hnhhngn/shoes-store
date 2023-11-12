import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import Item from './item.js'
import 'react-slideshow-image/dist/styles.css'
import {useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../../assets/images/page-header-bg.jpg';
import Pagination from 'react-bootstrap/Pagination'
import { Link, useHistory } from 'react-router-dom';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

function MoreProduct(props){
    const hostname = "http://localhost:8080";  
    // var filter = "";
    var PageSize = 8;
    let history = useHistory();
    const [active, setactive] = useState("1")
    const [filter, setfilter] = useState("?page=1|&size="+PageSize)
    const [products, setProducts] = useState([])
    const [totalpage, settotalpage] = useState(0)
    const [pagepresent, setpagepresent] = useState(0)
    const [categorys, setcategorys] = useState([])
    const [selectFilter, setselectFilter] = useState("Lọc Sản Phẩm")
    const [titles, settitles] = useState("")
    const [listSale, setlistSale] = useState([])

    useEffect(() =>{   
        let title = (new URLSearchParams(window.location.search)).get("title")
        if(title !== null && title !==""){
            settitles(title)
            searchProduct(title)
        }else{
        axios.get(hostname+'/api/product/page?page=1&size='+PageSize)
        .then((Response)=>{
            console.log(" get list product success")  
            const data = Response.data;
            settotalpage(data.totalpage)
            console.log("totalpage"+totalpage)
            setProducts(data.listResult)
            setpagepresent(data.page)
            console.log("pagepresent"+ data.page)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })
    }  
    axios.get(hostname+'/api/discount/get')
    .then((Response)=>{
            console.log(" get list sale success")
            setlistSale(Response.data)
        })
    }, []);

    useEffect(() => {
        axios.get(hostname+'/api/category/get')
            .then((Response)=>{
                console.log(" get list category success")  
                setcategorys(Response.data)
                })
            .catch((error) =>{
                    console.log("error "+error.response)
            })
    }, [])

    
    const filterALL =()=>{
        var title = document.getElementById("ws");
        axios.get(hostname+'/api/product/page?page=1&size='+PageSize)
        .then((Response)=>{
            const data = Response.data;
            console.log(" get list product success "+data.listResult.length)  
            settotalpage(data.totalpage)
            console.log("totalpage"+totalpage)
            setProducts(data.listResult)
            setpagepresent(data.page)
            console.log("pagepresent"+ data.page)
            setfilter("?page=1|&size="+PageSize);
            history.push("/product")
            title.value = ""
            settitles("")
            })
        .catch((error) =>{
                console.log("error "+error.response)
            }) 
    }

    const filterPrice =(e)=>{
        let temp = ""
        if(titles!==""){
            temp = "&title="+titles;
        }

        axios.get(hostname+'/api/product/page?page=1&size='+PageSize+'&order='+e+'&sort=price'+temp)
        .then((Response)=>{
            console.log(" get list product price success")  
            const data = Response.data;
            settotalpage(data.totalpage)
            console.log("totalpage"+totalpage)
            setProducts(data.listResult)
            setpagepresent(data.page)
            console.log("pagepresent"+ data.page)
            setfilter("?page=1|&size="+PageSize+"&sort=price");
            })
        .catch((error) =>{
                console.log("error "+error.response)
            }) 
    }

    const filterCategory =(e)=>{
        let temp = ""
        if(titles!==""){
            temp = "&title="+titles;
        }
        axios.get(hostname+'/api/product/page?page=1&size='+PageSize+'&category='+e+temp)
        .then((Response)=>{
            console.log(" get list product category success")  
            const data = Response.data;
            settotalpage(data.totalpage)
            console.log("totalpage"+totalpage)
            setProducts(data.listResult)
            setpagepresent(data.page)
            console.log("pagepresent"+ data.page)
            setfilter('?page=1&size='+PageSize+'&category='+e);
            })
        .catch((error) =>{
                console.log("error "+error.response)
            }) 
    }

    const changepage =(e) =>{
        let temp = ""
        if(titles!==""){
            temp = "&title="+titles;
        }
        var number = (e.target.text);       
        var arr = filter.split("|");
        var str = arr[0].split("=")
        var filterStr = str[0]+"="+number+arr[1];
        console.log(filterStr)
        axios.get(hostname+'/api/product/page'+filterStr+temp)
        .then((Response)=>{
            console.log(" get list product success")  
            const data = Response.data;
            settotalpage(data.totalpage)
            console.log("totalpage"+totalpage)
            setProducts(data.listResult)
            setpagepresent(data.page)
            console.log("pagepresent"+ data.page)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })

    }

    const nextpage =() =>{
        let temp = ""
        if(titles!==""){
            temp = "&title="+titles;
        }
        var number = pagepresent + 1;
 
        var arr = filter.split("|");
        var str = arr[0].split("=")
        var filterStr = str[0]+"="+number+arr[1];
        axios.get(hostname+'/api/product/page'+filterStr+temp)
        .then((Response)=>{
            console.log(" get list product success")  
            const data = Response.data;
            settotalpage(data.totalpage)
            console.log("totalpage"+totalpage)
            setProducts(data.listResult)
            setpagepresent(data.page)
            console.log("pagepresent"+ data.page)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })

    }

    const prevpage =() =>{
        let temp = ""
        if(titles!==""){
            temp = "&title="+titles;
        }
        var number = pagepresent - 1;

        var arr = filter.split("|");
        var str = arr[0].split("=")
        var filterStr = str[0]+"="+number+arr[1];
        axios.get(hostname+'/api/product/page'+filterStr+temp)
        .then((Response)=>{
            console.log(" get list product success")  
            const data = Response.data;
            settotalpage(data.totalpage)
            console.log("totalpage"+totalpage)
            setProducts(data.listResult)
            setpagepresent(data.page)
            console.log("pagepresent"+ data.page)
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })

    }

    const getFilterSearch =()=>{
        var title = document.getElementById("ws").value;
        if(title===""){
            history.push("/product")
        }else{
            history.push("/product?title="+title)
        }
        searchProduct(title)
        settitles(title)
    }

    const searchProduct =(e) =>{
        // if(title === "") return false;
        axios.get(hostname+'/api/product/page?page=1&size='+PageSize+'&title='+e)
        .then((Response)=>{
            console.log(" get list product success")  
            const data = Response.data;
            settotalpage(data.totalpage)
            console.log("totalpage"+totalpage)
            setProducts(data.listResult)
            setactive("1")
            setpagepresent(data.page)
            console.log("pagepresent"+ data.page)
            return false
            })
        .catch((error) =>{
                console.log("error "+error.response)
            })
    }

    const filterProduct=(e)=>{
        if(e === "1"){
            setactive("1")
            filterALL();
        }else if(e === "2"){
            setactive("2")
            filterPrice('ASC')
        }else if(e === "3"){
            setactive("3")
            filterPrice('DESC')
        }else{
            setactive("4")
            let id ;
            categorys.filter((cate)=>{
                if(cate.name == e){
                    id = cate.id;
                    return id;
                }
            })
            filterCategory(id)
        }
    }

    const ChangeSelect = () =>{
        alert("a")
    }

        //setting pagination
        let actives = pagepresent;
        let items = [];
        for (let number = 1; number <= totalpage; number++) {
            items.push(
                <Pagination.Item onClick={(e) => changepage(e)}  key={number} active={number === actives}>
                    {number}
                </Pagination.Item>,
            );
        }
        let startItem = (actives-1)*8 +1;
        let endItem = startItem + products.length - 1;

    return(
       

        <>        
        <main className="main"> <br/>
                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Sản Phẩm</li>
                            </ol>
                        </div>
                    </nav>
                    <div className="page-header text-center" style={{backgroundImage: "url(" + PageHeader + ")" }}>
                        <div className="container">
                            <h1 className="page-title">Sản Phẩm<span>Shop</span></h1>
                        </div>
                    </div><br/>

                <div className="container">
                    <aside className="col-lg-4">
                        <div className="sidebar">
                           
                        </div>
                    </aside>
                    <div className="toolbox toolbox-filter">
                        <div className="toolbox-left">
                            <div className="widget widget-search">
                                <h3 className="widget-title">Search</h3>
                                <Form inline className="cr-search-form">
                                <MdSearch
                                onClick={getFilterSearch} style={{marginLeft:10,cursor:'pointer'}} size="25"
                                className="cr-search-form__icon-search text-secondary"/>
                                <Input  style={{marginLeft:10,width: 350}} type="search" defaultValue={titles}   autoComplete="off"
                                className="cr-search-form__input" placeholder="Search in product..."  id="ws"/>
                                </Form>
                            </div>
                        </div>
                        <div className="toolbox-right">
                            <ul className="nav-filter product-filter">
                            </ul>
                                <DropdownButton
                                    style={{fontSize:18}}
                                    as={ButtonGroup}
                                    key='Info'
                                    id={`dropdown-variants-Info`}
                                    variant='Info'
                                    title={selectFilter}
                                    onSelect={(e)=>filterProduct(e)}
                                 >
                                {
                                    (active ==="1"?<Dropdown.Item  style={{fontSize:16,textAlign:'center'}} eventKey="1"  active>- Tất Cả -</Dropdown.Item>
                                    :<Dropdown.Item  style={{fontSize:16,textAlign:'center'}} eventKey="1" >- Tất Cả -</Dropdown.Item> )
                                }
                                {
                                    (active ==="3"? <Dropdown.Item style={{fontSize:14}} eventKey="3" active>Giá : Cao - Thấp</Dropdown.Item>
                                    : <Dropdown.Item style={{fontSize:14}} eventKey="3" >Giá : Cao - Thấp</Dropdown.Item> )
                                }
                                {
                                    (active ==="2"?<Dropdown.Item  style={{fontSize:14}} eventKey="2" active>Giá : Thấp - Cao</Dropdown.Item>
                                    :<Dropdown.Item  style={{fontSize:14}} eventKey="2">Giá : Thấp - Cao</Dropdown.Item> )
                                }
                                <Dropdown.Divider />
                                {categorys.map((cate)=>(
                                    <Dropdown.Item style={{fontSize:14}} eventKey={cate.name} >{cate.description}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </div>
                    </div>
                    <div className="products-container" data-layout="fitRows">
                        <div>
                            {products.map((product) => (
                                <Item product={product}  sales={listSale}
                                setWL={props.setWL} setSC={props.setSC} 
                                login={props.login}
                                ></Item>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <div className="more-container text-center mt-0 mb-7">
                    <a href="category.html" className="btn btn-outline-dark-3 btn-more"><span>more products</span><i className="la la-refresh"></i></a>
                </div> */}
            </main>

            <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center">
                                        
                            {(pagepresent == 1)?
                                <li  id ="btnprev" className="page-item disabled" >
                                     <a className="page-link page-link-prev" style={{cursor:"pointer"}}  onClick={prevpage} aria-label="Previous" tabindex="-1" aria-disabled="true">
                                         <span aria-hidden="true"><i className="icon-long-arrow-left"></i></span>Prev
                                     </a>
                                 </li>
                                 :
                                 <li  id ="btnprev" className="page-item " >
                                    <a className="page-link page-link-prev" style={{cursor:"pointer"}}  onClick={prevpage} aria-label="Previous" tabindex="-1" aria-disabled="true">
                                        <span aria-hidden="true"><i className="icon-long-arrow-left"></i></span>Prev
                                    </a>
                                 </li>
                            }
                            {/* {itemNavpage.map((item) =>
                              (item === (pagepresent)?
                                  <li className="page-item active"  aria-current="page"><a id={item} className="page-link" href="#">{item}</a></li>
                                   : <li className="page-item"  aria-current="page"><a id={item} onClick={(e) => changepage(e)}  className="page-link" href="#">{item}</a></li>)
                                )} */}
                                <div style={{marginTop:18,marginRight:10}}>
                                <Pagination>{items}</Pagination>
                                </div>
                               
                            {(pagepresent == totalpage || totalpage == 0)?
                              <li id ="btnnext" className="page-item disabled"   >
                                   <a class="page-link page-link-next" style={{cursor:"pointer"}} onClick={nextpage}  aria-label="Next">
                                       Next <span aria-hidden="true"><i className="icon-long-arrow-right"></i></span>
                                   </a>
                               </li>   
                               :
                               <li id ="btnnext" className="page-item ">
                                 <a class="page-link page-link-next" style={{cursor:"pointer"}} onClick={nextpage}  tabindex="-1" aria-disabled="true" aria-label="Next">
                                     Next <span aria-hidden="true"><i className="icon-long-arrow-right"></i></span>
                                 </a>
                             </li>   
                             }                        
                                               
                            </ul>
                </nav>
            <button id="scroll-top" title="Back to Top"><i class="icon-arrow-up"></i></button>
            
      
        </>
    )
}
export default MoreProduct;

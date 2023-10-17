import { Link } from 'react-router-dom';
import Background from '../../assets/images/error-bg.jpg';
function Error(){
    return(
        <>
            <main class="main">
            <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
                <div class="container">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li class="breadcrumb-item"><Link to="/page">Pages</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">404</li>
                    </ol>
                </div>
            </nav>

        	<div class="error-content text-center" style={{backgroundImage: "url(" + Background + ")" }}>
            	<div class="container">
            		<h1 class="error-title">Error 404</h1>
            		<p>We are sorry, the page you've requested is not available.</p>
            		<Link to="/" class="btn btn-outline-primary-2 btn-minwidth-lg">
            			<span>BACK TO HOMEPAGE</span>
            			<i class="icon-long-arrow-right"></i>
            		</Link>
            	</div>
        	</div>
        </main>
        </>
    )
}
export default Error;
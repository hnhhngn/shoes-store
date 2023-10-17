import "../../assets/css/bootstrap.min.css"
import './style1.css'

function footer(){
    return(
        <>
        <footer className="footer footer-2">
            <div className="footer-bottom">
                <div className="container">
                    <p className="footer-copyright">Copyright © 2021 Shopshoe</p>
                    <ul className="footer-menu">
                        <li><a style={{cursor:'pointer'}}>Terms Of Use</a></li>
                        <li><a style={{cursor:'pointer'}}>Privacy Policy</a></li>
                    </ul>

                    <div class="social-icons social-icons-color">
                        <a href="/fb" className="social-icon social-facebook" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
                        <a href="/tw" className="social-icon social-twitter" title="Twitter" target="_blank"><i className="icon-twitter"></i></a>
                        <a href="/ins" className="social-icon social-instagram" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
                        <a href="/you" className="social-icon social-youtube" title="Youtube" target="_blank"><i className="icon-youtube"></i></a>
                        <a href="/print" className="social-icon social-pinterest" title="Pinterest" target="_blank"><i className="icon-pinterest"></i></a>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}
export default footer;
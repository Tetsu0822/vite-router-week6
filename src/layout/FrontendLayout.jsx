import { Outlet, Link } from "react-router-dom";
import { ShoppingCart, Copyright } from "lucide-react";
import logo from "../assets/Handmade_Bow.png";
import fb from "../assets/fb.png";
import line from "../assets/line.png";
import ig from "../assets/ig.png";

const FrontendLayout = () => {
    return  (<>
        <header>
            <nav className="navbar bg-white py-4">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    {/* 左側：Logo */}
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img src={logo} alt="Logo" width="36" height="20" className="me-2"/>
                        <span className="h6 mb-0">愛哆啦也愛<span className="text-primary-700">手作</span></span>
                    </a>

                    {/* 中間：菜單 */}
                    <div className="d-flex gap-4">
                        <Link className="nav-link px-4 py-2" to="/">
                            首頁
                        </Link>
                        <Link className="nav-link px-4 py-2" to="/product">
                            產品列表
                        </Link>
                        <Link className="nav-link px-4 py-2" to="/cart">
                            <ShoppingCart />
                        </Link>
                    </div>

                    {/* 右側：購物車 + 用戶 */}
                    {/* <div className="d-flex justify-content-end align-items-center gap-3">
                        <Link className="nav-link px-4 py-2" to="/cart">
                            <ShoppingCart />
                        </Link>
                        <a className="nav-link px-4 py-2" href="#">
                            <User />
                        </a>
                    </div> */}
                </div>
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <div className="footer__left">
                <a className="navbar-brand d-flex align-items-center mb-3" href="#">
                    <img src={logo} alt="Logo" width="36" height="20" className="me-2"/>
                    <span className="h6 mb-0">愛哆啦也愛<span className="copyright text-primary-700">手作</span></span>
                </a>
                <p className="d-none d-sm-block">
                    <Copyright className="text-secondary-400 me-1" size={20} />
                    <span className="copyright">Copyright 2025 愛哆啦也愛手作</span>
                </p>
            </div>
            <div className="footer__center">
                <p className="text-p-24 contact mb-2">聯絡我們</p>
                <div className="d-flex social-icon">
                    <a href="#"><img src={fb} alt="Facebook" /></a>
                    <a href="#"><img src={line} alt="Line" /></a>
                    <a href="#"><img src={ig} alt="Instagram" /></a>
                </div>
            </div>
            <div className="footer__right">
                <p className="text-p-24 quick-link">快速連結</p>
                <ul className="list-unstyled d-flex justify-content-start mb-4">
                    <li className="text-p-16-b"><Link to="/">常見問題</Link></li>
                    <li className="text-p-16-b"><Link to="/">文章專區</Link></li>
                    <li className="text-p-16-b"><Link to="/">網站地圖</Link></li>
                </ul>
                <p className="d-block d-sm-none">
                    <Copyright className="text-secondary-400 me-1" size={20} />
                    <span className="copyright">Copyright 2025 愛哆啦也愛手作</span>
                </p>
            </div>
        </footer>
    </>)
}

export default FrontendLayout;
import { Link } from "react-router";
import logo from "../../assets/Handmade_Bow.png";

function Side () {
  return (
    <>
    <div className="d-flex p-2 align-items-center mb-4">
      <img src={logo} alt="Logo" width="28" height="15" className="me-2"/>
      <span className="">愛哆啦也愛<span className="text-primary-700">手作</span></span>
    </div>
    <div>
      <Link className="nav-link" to="/admin/products">
        產品管理
      </Link>
      <Link className="nav-link" to="/admin/orders">
        訂單管理
      </Link>
    </div>
    </>
  )
}

export default Side;
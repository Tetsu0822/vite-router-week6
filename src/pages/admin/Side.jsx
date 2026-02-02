import { Link } from "react-router";

function Side () {
  return (
    <div>
      <Link className="nav-link" to="/admin/products">
        產品管理
      </Link>
      <Link className="nav-link" to="/admin/orders">
        訂單管理
      </Link>
    </div>
  )
}

export default Side;
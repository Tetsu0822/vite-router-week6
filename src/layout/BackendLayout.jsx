import { Outlet } from "react-router-dom";
import Side from "../pages/admin/Side";

const BackendLayout = () => {
    return (<>
    <div className="container">
        <div className="row">
            <div className="col-2">
                <nav className="nav flex-column mt-5">
                    <Side />
                </nav>
            </div>
            <div className="col-10">
                <Outlet />
            </div>
        </div>
    </div>
    </>)
}

export default BackendLayout;
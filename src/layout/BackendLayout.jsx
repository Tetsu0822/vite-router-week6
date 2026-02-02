import { Outlet } from "react-router-dom";
import Side from "../pages/admin/Side";

const BackendLayout = () => {
    return (<>
        <div className="row">
            <div className="col-3">
                <nav className="nav flex-column mt-5">
                    <Side />
                </nav>
            </div>
            <div className="col-9">
                <Outlet />
            </div>
        </div>
    </>)
}

export default BackendLayout;
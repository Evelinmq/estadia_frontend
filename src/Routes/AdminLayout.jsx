import { Outlet} from "react-router-dom";
import Sidebar from "../Components/Structure/Sidebar.jsx";

export default function AdminLayout() {

    return (
        <>
            <Sidebar />

            <div className="sidebar-page-content">
                <Outlet />
            </div>
        </>
    );

}
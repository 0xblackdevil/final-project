
import { Link, Outlet } from "react-router-dom";

function AdminPage() {
    return (
        <div>
            <div className="flex px-5 py-2">
                <p className="bg-blue-700 text-white px-10 py-1 rounded-full">Admin</p>
            </div>
            <div className=" flex gap-10">
                <div className="flex py-5">
                    <ul className="flex flex-col gap-5 pl-5 text-lg text-white">
                        <li className="bg-slate-950 px-5 py-2 rounded-xl cursor-pointer "><Link to={"admin/users"}>Manage User</Link></li>
                        <li className="bg-slate-950 px-5 py-2 rounded-xl cursor-pointer "><Link to={"admin/docs"}>Requested Documents</Link></li>
                        <li className="bg-slate-950 px-5 py-2 rounded-xl cursor-pointer "><Link to={"admin/mooc"}>MOOCs Application</Link></li>
                    </ul>
                </div>

                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminPage;
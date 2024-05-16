
import { Link, Outlet } from "react-router-dom";

function StudentPage() {
    return (
        <div className=" flex gap-10">

            <div className="flex py-10">

                <ul className="flex flex-col gap-5 pl-5 text-lg text-white">
                    <li className="bg-slate-950 px-5 py-2 rounded-xl cursor-pointer "> <Link to={"student/docs"}>Issued Documents</Link></li>
                    <li className="bg-slate-950 px-5 py-2 rounded-xl cursor-pointer "> <Link to={"student/request"}>Request Documents</Link></li>
                    <li className="bg-slate-950 px-5 py-2 rounded-xl cursor-pointer "> <Link to={"student/mooc"}>Mooc Application</Link></li>
                </ul>

            </div>

            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    )
}

export default StudentPage
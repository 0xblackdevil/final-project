import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useSelector } from "react-redux"

function Navbar() {


    const authStatus = useSelector(store => store.auth.userRole);
    return (
        <nav className="flex justify-between items-center py-5 px-10 border-b border-gray-300">
            <div className="text-3xl font-extrabold">MIT ADT</div>
            {authStatus === null && <ul className="flex gap-10">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">Feature</li>
                <li className="cursor-pointer">FAQs</li>
                {/* <li className="cursor-pointer">Contact</li> */}
            </ul>}
            <ConnectButton />
        </nav>

    )
}

export default Navbar
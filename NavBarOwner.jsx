import React from "react";
import { dummyMyBookingsData } from "../../assets/assets";

const NavBarOwner = () => {

    const user = dummyMyBookingsData;
    return(
        <div className = 'flex items-center justify between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'>
            <Link to ='/'>
             <img src={assets.logo} alt="" className="h-7"/>
            </Link>
            <p>Welcome, {user.name || "Owner"} </p>

        </div>
    )
}

export default NavBarOwner
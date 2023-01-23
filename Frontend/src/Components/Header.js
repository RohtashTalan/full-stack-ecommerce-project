import React from "react";
import logo from "../assests/img/logo.png";



const Header = () => {


    return(
        <header className="bg-blue-700 h-20 text-white">
            <div className="flex justify-center gap-20 items-center py-5">
                <img className="h-12 w-40" src={logo} alt="Logo"/>
                <div className="w-1/5"> <input type="text" /> <i class="fa-solid fa-magnifying-glass"></i></div>
                <div className="flex justify-between items-center w-1/5">
                    <button>Login</button>
                    <div className="inline-flex">
                    <i class="fa-solid fa-cart-shopping"></i> 
                    <p>Cart</p>
                        </div>
                </div>
            </div>
        </header>
    )

}


export default Header;
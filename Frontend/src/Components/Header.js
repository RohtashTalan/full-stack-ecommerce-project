import React from "react";
import logo from "../assests/img/logo.png";

const Header = () => {
  return (
    <header className="bg-blue-700 h-20 text-white">
      <div className="w-[80%] m-auto flex justify-between gap-10 items-center py-5">
        <img className="h-10" src={logo} alt="Logo" />
        <div className="w-1/3 inline-flex items-center">
          {" "}
          <input className="w-full rounded px-2 py-1 bg-gray-300" type="text" placeholder="search...."/>{" "}
          <i class="fa-solid fa-magnifying-glass -ml-8 text-black cursor-pointer"></i>
        </div>
        <div className="flex gap-5 items-center md:w-1/5 ">
          <button className="bg-gray-600 p-1 px-4 rounded text-xl font-bold">
            Login
          </button>
          <div className="inline-flex gap-2 items-center hover:cursor-pointer">
            <i class="fa-solid fa-cart-shopping"></i>
            <p>Cart</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

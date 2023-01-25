import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = () => {
    const [products, setProducts] = useState('');

    
const getProducts = async () =>{
    const {data} = await axios.get('https://dummyjson.com/products');
    setProducts(data.products);

    console.log(products);
}

useEffect(()=>{
    getProducts();
},[])

  return (
    <>
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products && products.map((item)=>(
                <div key={item.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
              <img
                className="p-2 rounded-8 object-cover h-96 w-96"
                src={item.thumbnail}
                alt="product image"
              />
            <div className="px-5 py-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                 {item.brand + " "+ item.title}
                </h5>
              </a>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${item.price}
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add to cart
                </a>
              </div>
            </div>
          </div>
            ))}
          


        </div>
      </div>
    </>
  );
};

export default Products;

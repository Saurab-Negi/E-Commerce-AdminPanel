import axios from 'axios';
import './ListProduct.css'
import { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await axios.get('http://localhost:3000/product/allproduct');
      setAllProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    }
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  return (
    <div className='list-product flex flex-col items-center w-full gap-6 p-8 m-2 rounded-xl bg-white'>
      
      <p className='text-3xl font-[500] '>All Products</p>
      
      <div className="list-product-format-main mt-4 text-[1rem] font-[500] tracking-wider">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <hr className='w-full' />
      
      <div className="list-product-allproducts">
        {allProducts.map((product, i) => (
          <div key={i} className="list-product-format-main list-product-format text-[0.8rem] text-[#454545]">
            <img src={product.image} className='list-product-icon w-12' alt="" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <MdDeleteForever className='list-product-remove-icon text-xl text-[#f00] cursor-pointer m-auto' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListProduct;

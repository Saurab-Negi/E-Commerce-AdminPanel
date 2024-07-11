import axios from 'axios';
import './ListProduct.css';
import { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

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

  const remove_product = async (id) => {
    try {
      await axios.post('http://localhost:3000/product/deleteproduct', { id });
      await fetchInfo();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  }

  // Calculate the products to display based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

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
        {currentProducts.map((product, i) => {
          const { id, image, name, old_price, new_price, category } = product;
          return (
            <div key={i} className="list-product-format-main list-product-format text-[0.8rem] text-[#454545]">
              <img src={image} className='list-product-icon w-12' alt={name} />
              <p>{name}</p>
              <p>${old_price}</p>
              <p>${new_price}</p>
              <p>{category}</p>
              <MdDeleteForever onClick={() => remove_product(id)} className='list-product-remove-icon text-xl text-[#f00] cursor-pointer m-auto' />
            </div>
          )
        })}
      </div>
      <div className='pagination flex justify-center mt-1'>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className='text-[0.6rem]'>
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ListProduct;

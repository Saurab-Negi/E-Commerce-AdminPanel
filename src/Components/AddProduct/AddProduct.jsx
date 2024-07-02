import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'
import axios from 'axios';

const AddProduct = () => {

    const [image, setImage]= useState(false);

    const imageHandler= (e) =>{
        setImage(e.target.files[0]);
    }

    const [productDetails, setProductDetails]= useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:"",
    })

    const changeHandler = (e) =>{
        setProductDetails({...productDetails, [e.target.name] : e.target.value})
    }

    const Add_Product = async () => {
        console.log(productDetails);
    
        try {
            // Connecting with backend to upload the image
            let product = { ...productDetails };
    
            let formData = new FormData();
            formData.append('product', image);

            const uploadResponse = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            const uploadData = uploadResponse.data;
            console.log('Image uploaded successfully:', uploadData);
    
            if (uploadData.success) {
                product.image = uploadData.image_url;
                console.log(product);

                const addProductResponse = await axios.post('http://localhost:3000/product/addproduct', product, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
    
                const addProductData = addProductResponse.data;
                console.log(addProductData);
    
                if (addProductData.success) {
                    alert('Product Added');
                } else {
                    alert('Failed to add product');
                }
            } 
            else {
                alert('Image upload failed');
            }
        } 
        catch (error) {
            console.error(error);
        }
    };
    

  return (
    <div className='add-product box-border w-full max-w-[45rem] p-8 m-2 rounded-xl bg-white'>

        <div className="add-product-itemfield">
            <p>Product Title</p>
            <input type="text" name='name' placeholder='Name' value={productDetails.name} onChange={changeHandler} />
        </div>

        <div className="add-product-price flex gap-10 mt-4">
            <div className="add-product-itemfield">
                <p>Price</p>
                <input type="number" name='old_price' placeholder='Old Price' value={productDetails.old_price} onChange={changeHandler} />
            </div>
            <div className="add-product-itemfield">
                <p>Offer Price</p>
                <input type="number" name='new_price' placeholder='New Price' value={productDetails.new_price} onChange={changeHandler} />
            </div>
        </div>

        <div className="add-product-itemfield mt-4">
            <p>Product Category</p>
            <select name="category"  value={productDetails.category} onChange={changeHandler}  className="add-product-selector p-2 w-full text-[1rem] text-[#7b7b7b] border-[2px] border-solid border-[#7b7b7b8d] rounded-lg">
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        
        <div className="add-product-itemfield mt-4">
            <label htmlFor="file-input">
                <img className='add-product-thumbnail w-[6rem] my-6 rounded-lg object-contain' src={image ? URL.createObjectURL(image) : upload_area} alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>

        <button onClick={() =>{Add_Product()}} className='add-product-btn py-2 px-8 bg-[#6079ff] rounded-3xl border-none text-white text-[1rem] font-[500] shadow-customBtn'>Add</button>
    </div>
  )
}

export default AddProduct

import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'

import { Routes, Route } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='admin flex'>
      <Sidebar />
      <Routes>
        <Route path='/product/addproduct' element={<AddProduct/>} />
        <Route path='/product/listproduct' element={<ListProduct/>} />
      </Routes>
    </div>
  )
}

export default Admin

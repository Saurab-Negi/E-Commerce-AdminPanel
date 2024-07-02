import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbary flex items-center justify-between py-2 px-10 mb-1 bg-white shadow-customBtn '>
      <img className='nav-logo w-[12rem]' src={navlogo} alt="" />
      <img className='nav-profile w-12' src={navProfile} alt="" />
    </div>
  )
}

export default Navbar

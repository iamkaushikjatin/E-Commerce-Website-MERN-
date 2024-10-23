import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/auth/authSlice';


function AdminHeader({setOpen}) {
  const dispatch = useDispatch();
  function handleLogout(){
    dispatch(logoutUser());
  }
  return (
    <header className='flex items-center justify-between md:justify-end'>
      <Button onClick={()=> setOpen(true)} className='lg:hidden sm:block' variant='ghost'>
      <RxHamburgerMenu />
      <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end '>
      <Button onClick={handleLogout} className="px-4 py-2 gap-3 inline-flex items-center rounded-md text-sm font-medium shadow">
      <FiLogOut />
      Logout
      </Button>
      
      </div>
    </header>
  )
}

export default AdminHeader
import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {  //  here in this line the 'logout' is from authService where we had defined the working of logout
            dispatch(logout()) // if logout in the above line is successful then we dispatch it so that it gets updated in the store
        })
    }
    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}>
            Logout
        </button>
    );
}

export default LogoutBtn;
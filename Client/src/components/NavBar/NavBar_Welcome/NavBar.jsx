import React from 'react';
import {Link }  from 'react-router-dom';
import './NavBar.css';
import Button from '../../Button/Button';

const NavBar = () => {
    return (
        <>
            <nav>
                <img src="/Logo_.png" alt="Logo" />
                <ul>
                    <li><Link to ="/">Home</Link></li>
                    <li><Link to ="/about">About</Link></li>
                    <li><Link to ="/course">Courses</Link></li>
                    <li><Link to ="/contact">Contact</Link></li>
                </ul>
                <Link to='/login'> <Button BtnName="Get Started" /> </Link>
            </nav>
        </>
    )
}

export default NavBar;
       
   
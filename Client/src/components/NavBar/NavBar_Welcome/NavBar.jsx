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
                    <li><Link to ="/E-Grantha">Home</Link></li>
                    <li><Link to ="/E-Grantha/about">About</Link></li>
                    <li><Link to ="/E-Grantha/course">Courses</Link></li>
                    <li><Link to ="/E-Grantha/contact">Contact</Link></li>
                </ul>
                <Link to='/E-Grantha/register'> <Button BtnName="Get Started" /> </Link>
            </nav>
        </>
    )
}

export default NavBar;
       
   
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavLeft = () => {

    const location = window.location;
    const role = localStorage.getItem('role');
    const sections = document.getElementsByClassName('nav-left__section');

    useEffect(()=>{
        for (let i = 0; i < sections.length; i++) {
            sections[i].classList.remove('select');
        };
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].hash === location.hash) {
                sections[i].classList.add('select');
            }
        };
    },[location,sections]);

    return (
        <div className='nav-left__body'>
            <div className='nav-left__container'>
                <Link to='/home' className='nav-left__section'>
                    <ion-icon name="home-outline"></ion-icon>
                </Link>
                {
                    role !== 'asesor' ?
                        <Link to='/input' className='nav-left__section'>
                            <ion-icon name="pencil"></ion-icon>
                        </Link>
                    :
                        <></>
                }
                {
                    role !== 'supervisor' ?
                        role !== 'asesor'?
                        <Link to='/files' className='nav-left__section'>
                            <ion-icon name="folder-outline"></ion-icon>
                        </Link>
                        :
                        <></>
                    :
                        <></> 
                }
            </div> 
        </div>
    );
};

export default NavLeft;
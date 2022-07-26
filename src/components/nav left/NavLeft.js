import React, { useEffect } from 'react';

const NavLeft = () => {

    const path = window.location.pathname;
    const role = localStorage.getItem('role');
    const sections = document.getElementsByClassName('nav-left__section');

    const select = id=>{
        sections[id].classList.add('select');
        for (let i = 0; i < sections.length; i++) {
            if (i !== id) {
                sections[i].classList.remove('select');
            };
        };
    };

    useEffect(()=>{
        if (path === '/') {
            sections[0].classList.add('select');
        };
    },[path,sections]);

    return (
        <div className='nav-left__body'>
            <div className='nav-left__container'>
                <div className='nav-left__section' onClick={()=>select(0)}>
                    <ion-icon name="home-outline"></ion-icon>
                </div>
                <div className='nav-left__section' onClick={()=>select(1)}>
                    <ion-icon name="pencil"></ion-icon>
                </div>
                { role !== 'supervisor' ?
                    <div className='nav-left__section' onClick={()=>select(2)}>
                        <ion-icon name="folder-outline"></ion-icon>
                    </div>
                 :
                    <></> }
            </div> 
        </div>
    );
};

export default NavLeft;
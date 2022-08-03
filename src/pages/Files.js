import React from 'react';
import { useSelector } from 'react-redux';
import NavLeft from '../components/nav-left/NavLeft';
import NavTop from '../components/nav-top/NavTop';

const Files = () => {
    
    const role = useSelector(state=>state.role);

    return (
        <div className='page-container'>
          <NavTop />
          <div className='body-pages-container'>
            {
              role !== 'viewer' ?
              <NavLeft />
              :
              <></>
            }
            <div className='files'>
                files 
            </div>
          </div>
        </div>
    );
};

export default Files;
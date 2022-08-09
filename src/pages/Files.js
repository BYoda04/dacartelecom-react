import React from 'react';
import { useSelector } from 'react-redux';
import NavLeft from '../components/nav-left/NavLeft';
import NavTop from '../components/nav-top/NavTop';
import Reloj from '../components/reloj/Reloj';
import Upload from '../components/upload/Upload';

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
              <div className='files-container'>
                  <Reloj />
                  <Upload />
              </div>
          </div>
        </div>
      </div>
    );
};

export default Files;
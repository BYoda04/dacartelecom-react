import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dacar from '../../img/dacartelecom-logo.webp';
import { getCampaigns } from '../../store/slices/campaigns.slice';
import { setSectionsRedux } from '../../store/slices/sections.slice';
import { setSelectSection } from '../../store/slices/sectionSelect';
import { setUgi } from '../../store/slices/ugiVisible.slice';

const NavTop = () => {
    const campaigns = useSelector(state=>state.campaigns);
    const dispatch = useDispatch();
    const [sections,setSections] = useState([]);
    const [selectCamp,setSelectCamp] = useState('campaigns');
    const [selectSect,setSelectSect] = useState('sections');

    useEffect(()=>{
        dispatch(getCampaigns());
    },[dispatch]);
    
    useEffect(()=>{
        setSelectCamp(campaigns[0]?.name);
        setSections(campaigns[0]?.sections);
        dispatch(setSectionsRedux(campaigns[0]?.sections));
        dispatch(setSelectSection(campaigns[0]?.sections[0]));
        setSelectSect(campaigns[0]?.sections[0]?.name);
        campaigns[0]?.sections[0]?.name?.toLowerCase() === 'hogar'? dispatch(setUgi(true)) : dispatch(setUgi(false));
    },[campaigns,dispatch])

    const setCampaign = camp=>{
        setSelectCamp(camp.name);
        setSections(camp.sections);
    };

    const setSect = sect=>{
        dispatch(setSelectSection(sect));
        setSelectSect(sect.name);
        sect.name.toLowerCase() === 'hogar'? dispatch(setUgi(true)) : dispatch(setUgi(false))
        
    };
    
    return (
        <div className='nav-top'>
            <div className='nav-top__container'>
                <div className='nav-top__img'>
                    <img src={Dacar} alt='dacartelecom-logo'/>
                </div>
                <div className='nav-top__options'>
                    <div className='nav-top__campaign'>
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownCampaign" data-bs-toggle="dropdown" aria-expanded="false">
                                {selectCamp}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownCampaign">
                                {campaigns?.map(campaign=>(
                                    <li key={campaign.id}>
                                        <button className="dropdown-item" onClick={()=>setCampaign(campaign)}>{campaign?.name}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='nav-top__section'>
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownSection" data-bs-toggle="dropdown" aria-expanded="false">
                                {selectSect}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownSection">
                                {sections?.map(section=>(
                                    <li key={section?.id}>
                                        <button className="dropdown-item" onClick={()=>setSect(section)}>{section?.name}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='nav-top__login'>
                        <button type="button" className="btn btn-success">
                            <div>
                                <p>login</p>
                                <ion-icon name="log-in-outline"></ion-icon>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavTop;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Dacar from '../../img/dacartelecom-logo.webp';
import { getCampaigns } from '../../store/slices/campaigns.slice';
import { setSectionsRedux } from '../../store/slices/sections.slice';
import { setSelectSection } from '../../store/slices/sectionSelect';
import { setUgi } from '../../store/slices/ugiVisible.slice';

const NavTop = () => {

    const { register,handleSubmit } = useForm();
    const [errorUser,setErrorUser] = useState(false);
    const [errorPassword,setErrorPassword] = useState(false);
    const loged = useSelector(state=>state.loged);
    const campaigns = useSelector(state=>state.campaigns);
    const dispatch = useDispatch();
    const [sections,setSections] = useState([]);
    const [selectCamp,setSelectCamp] = useState('campaigns');
    const [selectSect,setSelectSect] = useState('sections');
    const [role] = useState(localStorage.getItem("role"));

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

    const login = async data=>{
        try {
            const response = await axios.post('https://api-dacartelecom.herokuapp.com/api/v1/users/login',data);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("role",response.data.role);
            if (response.data.campaign) {
                localStorage.setItem("campaign",response.data.campaign);
            };
            if (response.data.section) {
                localStorage.setItem("section",response.data.section);
            };
            setErrorUser(false);
            setErrorPassword(false);
            window.location.reload();
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.message === 'Invalid password') {
                setErrorUser(false);
                return setErrorPassword(true)
            }
            setErrorUser(true);
            setErrorPassword(true);
        }
    };

    const logout = ()=>{
        localStorage.clear();
        window.location.reload();
    };
    
    return (
        <div className='nav-top'>
            <div className="modal fade" id="modal" aria-hidden="true" aria-labelledby="modalLabel" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Log  In</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={ handleSubmit(login) }>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" className={ errorUser ? "form-control bad" : "form-control" } id="exampleInputEmail1" aria-describedby="emailHelp" {...register('email')}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className={ errorPassword ? "form-control bad" : "form-control" } id="exampleInputPassword1" {...register('password')}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary">LogIn</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='nav-top__container'>
                <div className='nav-top__img'>
                    <img src={Dacar} alt='dacartelecom-logo'/>
                </div>
                { loged ? 
                    role !== 'supervisor' ? 
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
                        <div className='nav-top__user'>
                            <div className='user-container'>
                                <ion-icon name="person-circle-outline"></ion-icon>
                            </div>
                        </div>
                        <div className='nav-top__logout'>
                            <button type="button" className="btn btn-danger" onClick={()=>logout()}>
                                <div>
                                    <p>logOut</p>
                                    <ion-icon name="log-out-outline"></ion-icon>
                                </div>
                            </button>
                        </div>
                    </div> 
                    :
                    <div className='nav-top__options'>
                        <div className='nav-top__user'>
                            <div className='user-container'>
                                <ion-icon name="person-circle-outline"></ion-icon>
                            </div>
                        </div>
                        <div className='nav-top__logout'>
                            <button type="button" className="btn btn-danger" onClick={()=>logout()}>
                                <div>
                                    <p>logOut</p>
                                    <ion-icon name="log-out-outline"></ion-icon>
                                </div>
                            </button>
                        </div>
                    </div> 
                : 
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
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" href="#modal">
                            <div>
                                <p>logIn</p>
                                <ion-icon name="log-in-outline"></ion-icon>
                            </div>
                        </button>
                    </div>
                </div> }
            </div>
        </div>
    );
};

export default NavTop;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Dacar from '../../img/dacartelecom-logo.webp';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRole } from '../../store/slices/role.slice';
import { setCampaigns } from '../../store/slices/campaigns.slice';
import { setSections } from '../../store/slices/sections.slice';
import { setAdvisers } from '../../store/slices/advisers.slice';
import { setProducts } from '../../store/slices/products.slice';
import { setSolds } from '../../store/slices/solds.slice';
import { setGoals } from '../../store/slices/goals.slice';
import { setUgi } from '../../store/slices/ugiVisible.slice';
import { setSectionSelect } from '../../store/slices/sectionSelect.slice';
import { setInvestments } from '../../store/slices/investments.slice';
import { setDates } from '../../store/slices/date.slice';
import { loggin } from '../../store/slices/loged.slice';
import getConfig from '../../utils/getConfig';
import { setRoles } from '../../store/slices/roles.slice';
import { setLocation } from '../../store/slices/location.slice';

const NavTop = () => {

    let day = new Date().getDate();
    let month = new Date().getMonth()+1;
    const year = new Date().getFullYear();
    
    if (month<10) {
        month = `0${month}`;
    };

    if (day<10) {
        day = `0${day}`
    };
    
    const role = useSelector(state=>state.role);
    const campaigns = useSelector(state=>state.campaigns);
    const sections = useSelector(state=>state.sections);
    const location = useSelector(state=>state.location);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectCamp,setSelectCamp] = useState('campaigns');
    const [selectSect,setSelectSect] = useState('sections');
    const [date,setDate] = useState(`${year}-${month}-${day}`);

    const getSolds =async (date,section)=>{
        try {
            const goals = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
            dispatch(setGoals(goals.data.goals));
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.message === 'jwt expired') {
                localStorage.clear();
                dispatch(loggin(false));
                navigate("/");
            };
        };
        try {
            const solds = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
            dispatch(setSolds(solds.data.sales));
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.message === 'jwt expired') {
                localStorage.clear();
                dispatch(loggin(false));
                navigate("/");
            };
        };
        try {
            const advisers = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/get/querys?roleId=5&sectionId=${section}`,getConfig());
            dispatch(setAdvisers(advisers.data.users));
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.message === 'jwt expired') {
                localStorage.clear();
                dispatch(loggin(false));
                navigate("/");
            };
        };
        try {
            const investments = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/investments/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
            dispatch(setInvestments(investments.data.investments));
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.message === 'jwt expired') {
                localStorage.clear();
                dispatch(loggin(false));
                navigate("/");
            };
        };
    };

    const getSoldsUser =async (date,user,section)=>{
        try {
            const goals = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
            dispatch(setGoals(goals.data.goals));
        } catch (error) {
            console.log(error.response.data);
        };
        try {
            const solds = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date}&userId=${user}`,getConfig());
            dispatch(setSolds(solds.data.sales));
        } catch (error) {
            console.log(error.response.data);
        };
        try {
            const adviser = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/${user}`,getConfig());
            dispatch(setAdvisers([adviser.data.user]));
        } catch (error) {
            console.log(error.response.data);
        };
        try {
            const investments = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/investments/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
            dispatch(setInvestments(investments.data.investments));
        } catch (error) {
            console.log(error.response.data);
        };
    };

    const getSoldsEnd =async (start,end,section)=>{
        try {
            const goals = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${start}&finishDate=${end}&sectionId=${section}`,getConfig());
            dispatch(setGoals(goals.data.goals));
        } catch (error) {
            console.log(error.response.data);
        };
        try {
            const solds = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${start}&finishDate=${end}&sectionId=${section}`,getConfig());
            dispatch(setSolds(solds.data.sales));
        } catch (error) {
            console.log(error.response.data);
        };
        try {
            const investments = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/investments/get/querys?startDate=${date}&finishDate=${end}&sectionId=${section}`,getConfig());
            dispatch(setInvestments(investments.data.investments));
        } catch (error) {
            console.log(error.response.data);
        };
    };

    const getSoldsEndUser =async (start,end,user,section)=>{
        try {
            const goals = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${start}&finishDate=${end}&sectionId=${section}`,getConfig());
            dispatch(setGoals(goals.data.goals));
        } catch (error) {
            console.log(error.response.data);
        };
        try {
            const solds = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${start}&finishDate=${end}&userId=${user}`,getConfig());
            dispatch(setSolds(solds.data.sales));
        } catch (error) {
            console.log(error.response.data);
        };
        try {
            const investments = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/investments/get/querys?startDate=${date}&finishDate=${end}&sectionId=${section}`,getConfig());
            dispatch(setInvestments(investments.data.investments));
        } catch (error) {
            console.log(error.response.data);
        };
    };

    useEffect(()=>{
        dispatch(setRole(localStorage.getItem("role")));
        dispatch(setDates({
            startDate: date,
            endDate: ''
        }));

        if (localStorage.getItem("role") === 'administrador') {
            const getRoles = async ()=>{
                try {
                    const res = await axios.get('https://api-dacartelecom.herokuapp.com/api/v1/roles',getConfig());
                    dispatch(setRoles(res.data.data));
                } catch (error) {
                    console.log(error.response.data);
                };
            };

            getRoles();
        };
        if (!localStorage.getItem("campaign")) {
            const date = `${year}-${month}-${day}`;
            const getCampaigns =async ()=>{
                try {
                    const res = await axios.get("https://api-dacartelecom.herokuapp.com/api/v1/campaigns",getConfig());
                    const advisers = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/get/querys?roleId=5&sectionId=${res.data.data[0]?.sections[0]?.id}`,getConfig());
                    dispatch(setAdvisers(advisers.data.users));
                    dispatch(setCampaigns(res.data.data));
                    dispatch(setSections(res.data.data[0]?.sections));
                    dispatch(setProducts(res.data.data[0]?.sections[0]?.products));
                    dispatch(setSectionSelect(res.data.data[0]?.sections[0]));
                    setSelectCamp(res.data.data[0]?.name);
                    setSelectSect(res.data.data[0]?.sections[0]);
                    res.data.data[0]?.sections[0]?.name?.toLowerCase().includes('hogar') ? dispatch(setUgi(true)) : dispatch(setUgi(false));

                    const getSolds =async (date,section)=>{
                        try {
                            const goals = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
                            dispatch(setGoals(goals.data.goals));
                        } catch (error) {
                            console.log(error.response.data);
                            if (error.response.data.message === 'jwt expired') {
                                localStorage.clear();
                                dispatch(loggin(false));
                                navigate("/");
                            };
                        };
                        try {
                            const solds = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
                            dispatch(setSolds(solds.data.sales));
                        } catch (error) {
                            console.log(error.response.data);
                            if (error.response.data.message === 'jwt expired') {
                                localStorage.clear();
                                dispatch(loggin(false));
                                navigate("/");
                            };
                        };
                        try {
                            const investments = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/investments/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
                            dispatch(setInvestments(investments.data.investments));
                        } catch (error) {
                            console.log(error.response.data);
                            if (error.response.data.message === 'jwt expired') {
                                localStorage.clear();
                                dispatch(loggin(false));
                                navigate("/");
                            };
                        };
                    };

                    getSolds(date,res.data.data[0]?.sections[0]?.id);
                } catch (error) {
                    console.log(error.response.data);
                    if (error.response.data.message === 'jwt expired') {
                        localStorage.clear();
                        dispatch(loggin(false));
                        navigate("/");
                    };
                };
            };
            
            getCampaigns();
        } else {
            const date = `${year}-${month}-${day}`;
            const getArea =async ()=>{
                try {
                    const resCamp = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/campaigns/${localStorage.getItem("campaign")}`,getConfig());
                    const resSect = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/sections/${localStorage.getItem("section")}`,getConfig());
                    const advisers = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/get/querys?roleId=5&sectionId=${localStorage.getItem("section")}`,getConfig());
                    dispatch(setAdvisers(advisers.data.users));
                    dispatch(setCampaigns([resCamp.data.campaign]));
                    dispatch(setSections([resSect.data.section]));
                    dispatch(setSectionSelect(resSect.data.section));
                    dispatch(setProducts(resSect.data.section.products));
                    setSelectSect(resSect.data.section);
                    resSect.data.section.name.toLowerCase().includes('hogar') ? dispatch(setUgi(true)) : dispatch(setUgi(false));
                    if (localStorage.getItem("role") !== 'asesor') {

                        const getSolds =async (date,section)=>{
                            try {
                                const goals = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
                                dispatch(setGoals(goals.data.goals));
                            } catch (error) {
                                console.log(error.response.data);
                            };
                            try {
                                const solds = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
                                dispatch(setSolds(solds.data.sales));
                            } catch (error) {
                                console.log(error.response.data);
                            };
                            try {
                                const investments = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/investments/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
                                dispatch(setInvestments(investments.data.investments));
                            } catch (error) {
                                console.log(error.response.data);
                            };
                        };

                        getSolds(date,resSect.data.section.id);
                    } else {

                        const getSoldsUser =async (date,user,section)=>{
                            try {
                                const adviser = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/${user}`,getConfig());
                                dispatch(setAdvisers([adviser.data.user]));
                            } catch (error) {
                                console.log(error.response.data);
                            };
                            try {
                                const goals = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
                                dispatch(setGoals(goals.data.goals));
                            } catch (error) {
                                console.log(error.response.data);
                            };
                            try {
                                const solds = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date}&userId=${user}`,getConfig());
                                dispatch(setSolds(solds.data.sales));
                            } catch (error) {
                                console.log(error.response.data);
                            };
                            try {
                                const investments = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/investments/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
                                dispatch(setInvestments(investments.data.investments));
                            } catch (error) {
                                console.log(error.response.data);
                            };
                        };
                        
                        getSoldsUser(date,localStorage.getItem("id"),localStorage.getItem("section"));
                    };
                } catch (error) {
                    console.log(error.response.data);
                    if (error.response.data.message === 'jwt expired') {
                        localStorage.clear();
                        dispatch(loggin(false));
                        navigate("/");
                    };
                };
            };

            getArea();
        };
    },[dispatch,day,month,year,date,navigate]);

    const setCampaign = camp=>{
        const date = `${year}-${month}-${day}`;
        dispatch(setSections(camp.sections));
        dispatch(setProducts(camp.sections[0].products));
        dispatch(setSectionSelect(camp.sections[0]));
        setSelectCamp(camp.name);
        setSelectSect(camp.sections[0]);
        camp.sections[0].name.toLowerCase().includes('hogar') ? dispatch(setUgi(true)) : dispatch(setUgi(false));
        getSolds(date,camp.sections[0].id);
    };

    const setSect = sect=>{
        const date = `${year}-${month}-${day}`;
        dispatch(setProducts(sect.products));
        dispatch(setSectionSelect(sect));
        setSelectSect(sect);
        sect.name.toLowerCase().includes('hogar') ? dispatch(setUgi(true)) : dispatch(setUgi(false));
        getSolds(date,sect.id);
    };

    const startDate = date=>{
        if (localStorage.getItem("role") !== 'asesor') {
            dispatch(setDates({
                startDate: date,
                endDate: ''
            }));
            setDate(date);
            getSolds(date,selectSect.id);
        } else {
            dispatch(setDates({
                startDate: date,
                endDate: ''
            }));
            setDate(date);
            getSoldsUser(date,localStorage.getItem("id"),localStorage.getItem("section"));
        };
    };

    const endDate = (end)=>{
        if (localStorage.getItem("role") !== 'asesor') {
            const start = document.getElementById('startDate');
            dispatch(setDates({
                startDate: start.value,
                endDate: end
            }));
            getSoldsEnd(start.value,end,selectSect.id);
        } else {
            const start = document.getElementById('startDate');
            dispatch(setDates({
                startDate: start.value,
                endDate: end
            }));
            getSoldsEndUser(start.value,end,localStorage.getItem("id"),localStorage.getItem("section"));
        };
    }

    const logout = ()=>{
        localStorage.clear();
        dispatch(setAdvisers([]));
        dispatch(setCampaigns([]));
        dispatch(setDates({
            startDate: '',
            endDate: ''
        }));
        dispatch(setGoals([]));
        dispatch(setInvestments([]));
        dispatch(setLocation(''));
        dispatch(setProducts([]));
        dispatch(setRole(""));
        dispatch(setRoles([]));
        dispatch(setSections([]));
        dispatch(setSectionSelect({}));
        dispatch(setSolds([]));
        dispatch(setUgi(false));
        dispatch(loggin(false));
        navigate("/");
    };
    
    return (
        <div className='nav-top'>
            <div className='nav-top__container'>
                <div className='nav-top__img'>
                    <img src={Dacar} alt='dacartelecom-logo'/>
                </div>
                {
                    role !== 'supervisor' ? 
                        role !== 'asesor' ?
                            role !== 'viewer' ?
                                location !== '#/home' ?
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
                                        <div className='nav-top__date'>
                                            <label htmlFor="startDate" className="form-label">Inicio</label>
                                            <input type='date' className="form-control" id='startDate' value={date} onChange={e=>startDate(e.target.value)}/>
                                        </div>
                                        <div className='nav-top__date'>
                                            <label htmlFor="endDate" className="form-label">Final</label>
                                            <input type='date' className="form-control" id='endDate' onChange={e=>endDate(e.target.value)}/>
                                        </div>
                                        <div className='nav-top__campaign'>
                                            <label htmlFor='campaigns' className='form-label'>Campañas</label>
                                            <div className="dropdown" id='campaigns'>
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
                                            <label htmlFor='sections' className='form-label'>Secciones</label>
                                            <div className="dropdown" id='sections'>
                                                <button className="btn btn-light dropdown-toggle" type="button" id="dropdownSection" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {selectSect?.name}
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
                                <div className='nav-top__campaign'>
                                    <label htmlFor='campaigns' className='form-label'>Campañas</label>
                                    <div className="dropdown" id='campaigns'>
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
                                    <label htmlFor='sections' className='form-label'>Secciones</label>
                                    <div className="dropdown" id='sections'>
                                        <button className="btn btn-light dropdown-toggle" type="button" id="dropdownSection" data-bs-toggle="dropdown" aria-expanded="false">
                                            {selectSect?.name}
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
                            <div className='nav-top__date'>
                                <label htmlFor="startDate" className="form-label">Inicio</label>
                                <input type='date' className="form-control" id='startDate' value={date} onChange={e=>startDate(e.target.value)}/>
                            </div>
                            <div className='nav-top__date'>
                                <label htmlFor="endDate" className="form-label">Final</label>
                                <input type='date' className="form-control" id='endDate' onChange={e=>endDate(e.target.value)}/>
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
                        <div className='nav-top__date'>
                            <label htmlFor="startDate" className="form-label">Inicio</label>
                            <input type='date' className="form-control" id='startDate' value={date} onChange={e=>startDate(e.target.value)}/>
                        </div>
                        <div className='nav-top__date'>
                            <label htmlFor="endDate" className="form-label">Final</label>
                            <input type='date' className="form-control" id='endDate' onChange={e=>endDate(e.target.value)}/>
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
                }
            </div>
        </div>
    );
};

export default NavTop;
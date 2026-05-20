import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from "../context/AppContext";

const Dashboard = () => {

    const navigate = useNavigate()
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

    //function to logout for company
    const logout = () => {
        setCompanyToken(null);
        localStorage.removeItem("companyToken");
        setCompanyData(null);
        navigate("/");
    };


    useEffect(() => {
        if (companyData) {
            navigate("/dashboard/manage-jobs");
        }
    }, [companyData]);


    return (
        <div className='min-h-screen'>

            {/* Navbar for Recruiter Panel */}
            <div className='shadow py-4'>
                <div className='px-5 flex justify-between items-center'>
                    <img onClick={e => navigate('/dashboard/add-job')} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />

                    {/* if there is companyData then display */}
                    {companyData && (
                        <div className='flex items-center gap-3'>
                             <p className='max-sm:hidden'>Welcome,  {companyData.name}</p>
                            <img
                                className='w-8 border rounded-full'
                                src={ companyData.image}
                                alt=""
                            />

                            <button
                                onClick={logout}
                                className='bg-blue-600 text-white px-6 py-2 rounded-full'
                            >
                                Logout
                            </button>
                        </div>
                    )}

                </div>
            </div>

            <div className='flex items-start'>

                {/* Left Sidebar with option to add job, manage jobs, view application */}
                <div className='inline-block min-h-screen border-r-2'>
                    <ul className='flex flex-col items-start pt-5 text-gray-800'>
                        <NavLink className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
                            <img className='min-w-4' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add Job</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
                            <img className='min-w-4' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>Manage Jobs</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
                            <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-1 h-full p-2 sm:p-5 '>
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

export default Dashboard
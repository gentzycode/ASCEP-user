import React, { useState } from 'react';
import AuthBanner from '../../../common/AuthBanner';
import Logo from '/assets/ansg_logo.png';
import { login } from '../../../apiCalls/authActions';
import { toast, ToastContainer } from 'react-toastify';
import ButtonLoader from '../../../common/ButtonLoader';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [loggingin, setLoggingin] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            username, password
        };

        login(data, setSuccess, setError, setLoggingin);
    };

    if (error !== null) {
        toast.error(error?.message);
        setError(null);
    }

    if (success !== null) {
        localStorage.setItem('isLoggedIn', JSON.stringify(success));
        navigate('/dashboard');
        location.reload();
    }

    return (
        <div className='w-full m-0 flex'>
            <AuthBanner />
            <div className='w-full flex justify-center h-screen items-center md:w-1/2 p-6'>
                <div className='w-full lg:w-2/3 space-y-3'>
                    <div className='flex justify-center'>
                        <img src={Logo} alt='logo' width="80px" />
                    </div>
                    <div className='w-full flex justify-center'>
                        <span className='text-3xl text-gray-700'>Anambra State Edu Portal</span>
                    </div>
                    <ToastContainer />
                    <form onSubmit={handleLogin} className='space-y-3'>
                        <input 
                            type='text'
                            className='w-full border border-gray-200 rounded-xl px-6 py-4 text-gray-500 text-xl'
                            placeholder='Username'
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type='password'
                            className='w-full border border-gray-200 rounded-xl px-6 py-4 text-gray-500 text-xl'
                            placeholder='Password'
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className='space-y-1'>
                            {/* Existing Buttons */}
                            {/* ... */}
                            <div
                                className='w-full flex justify-center border border-gray-200 shadow-md p-4 rounded-xl bg-white hover:bg-gray-200 text-sm font-bold uppercase cursor-pointer'
                                onClick={() => navigate('/check-result')}
                            >
                                Check result
                            </div>

                            {/* Call to Action Box */}
                            <div className='p-4 bg-yellow-200 text-black text-sm rounded-lg border border-yellow-400'>
                                <p>For result uploads, a valid token and a correctly formatted sheet as per the provided template are required.</p>
                            </div>

                            {/* External Links */}
                            <div className='flex justify-around my-4'>
                                <a href="https://edu.anambrastate.gov.ng" target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-gray-600'>Edu Portal</a>
                                <a href="https://anambrastate.gov.ng" target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-gray-600'>State Website</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

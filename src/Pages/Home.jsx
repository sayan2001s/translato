import React from 'react'
import { useUserStore } from '../store/user-store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Login from './Login';
import Signup from './Signup';
export const Home = () => {
    const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
    const [isSignupPopupOpen, setSignupPopupOpen] = React.useState(false);

    const { user } = useUserStore();
    const navigate = useNavigate();
    return (
        <div>
            <div className="head">
                <h1 className='home-heading'>Welcome to <span>TranslateX</span></h1>
                <p className='home-desc'>A versatile, user-friendly translation tool offering instant translations across multiple languages, ensuring accurate and context-aware results for travelers, students, and professionals alike.</p>
                <div className='desktop-only'>
                    <button className='home-start'

                        onClick={(e) => {
                            user ? navigate('/user/text-to-text') : toast.error('Please login to continue')
                        }}

                    >Get Started</button>
                </div>
                <div className="mobile-only">
                    {user ? (
                        <div>
                            <button className='home-start'

                                onClick={(e) => {
                                    user ? navigate('/user/text-to-text') : toast.error('Please login to continue')
                                }}

                            >Get Started</button>
                        </div>
                    ) : (
                        <div>
                            <div className="login-signup">
                                <button className="login" onClick={() => {
                                    setSignupPopupOpen(false)
                                    setLoginPopupOpen(true)
                                }}>Login</button>
                                <div></div>
                                <button onClick={() => {
                                    setLoginPopupOpen(false)
                                    setSignupPopupOpen(true)
                                }} className="signup" to={"/signup"}>Signup</button>
                            </div>
                            <Login isOpen={isLoginPopupOpen} onClose={() => {
                                setLoginPopupOpen(false)
                            }} />
                            <Signup isOpen={isSignupPopupOpen} onClose={() => {
                                setSignupPopupOpen(false)
                            }} />

                        </div>
                    )
                    }
                </div>

            </div>
        </div>
    )
}

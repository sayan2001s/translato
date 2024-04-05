import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogoutLogo, TranslatorLogo, UserLogo } from '../Image'
import { useUserStore } from '../store/user-store'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import User from '../Pages/User'
export const MainNav = () => {
    const { user } = useUserStore();
    const { fetchUser } = useUserStore();
    const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
    const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
    const [isUserPopupOpen, setUserPopupOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser(token);
        }
    }, [fetchUser]);

    return (
        <div id='main-nav' >
            <Link to={"/"}>
                <div className={`logo ${location.pathname === "/" ? "logo-down" : "move-up logo-up"}`}>
                    <img src={TranslatorLogo} alt="" />
                </div>
            </Link>
            {user ? (
                <div>
                    <div className="login-signup-done">
                        <button
                            onClick={() => {
                                setUserPopupOpen(true)

                            }}
                            className={`login ${location.pathname === "/" ? "" : "move-up"}`}><img src={UserLogo} alt="" /></button>
                        <div></div>
                        <button onClick={() => {
                            localStorage.removeItem("token");
                            fetchUser(null);
                            navigate("/")
                            window.location.reload();
                        }} className={`signup ${location.pathname === "/" ? "" : "move-up"}`}><img src={LogoutLogo} alt="" /></button>
                    </div>
                    <User isOpen={isUserPopupOpen} onClose={() => {
                        setUserPopupOpen(false)
                    }} />
                </div>
            ) : (
                <>
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

                </>
            )
            }

        </div>
    )
}

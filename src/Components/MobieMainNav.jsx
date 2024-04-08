import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CloseIcon, TranslatorLogo } from '../Image'
import { useUserStore } from '../store/user-store'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import User from '../Pages/User'
import { Menu } from '../Image'
import { main_nav_items } from '.'
export const MobieMainNav = () => {
    const { user } = useUserStore();
    const { fetchUser } = useUserStore();
    const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
    const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
    const [isUserPopupOpen, setUserPopupOpen] = useState(false);
    const navigate = useNavigate();

    const [isMenuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser(token);
        }
    }, [fetchUser]);

    return (
        <>
            <div className="mobile-main-nav">
                <div>
                    <Link to={"/"}>
                        <div className={`logo`}>
                            <img src={TranslatorLogo} alt="" />
                        </div>
                    </Link>
                    <button className='menubar'
                        onClick={() => {
                            setMenuOpen(!isMenuOpen)
                        }}>
                        <img src={Menu} alt="" />
                    </button>
                </div>
            </div >
            {isMenuOpen && (
                <div className="menu-background"
                    onClick={() => {
                        setMenuOpen(false)
                    }
                    }>
                    <div className="menu"
                        onClick={(e) => {
                            e.stopPropagation()
                        }}>
                        <div className="menu-close-btn">
                            <button
                                onClick={() => {
                                    setMenuOpen(false)
                                }}
                            ><img className='mobile-nav-close-btn' src={CloseIcon} alt="" /></button>
                        </div>
                        <ul>
                            {main_nav_items.map((item, index) =>
                                <li key={index}>
                                    <Link to={item.navigate}>{item.name}</Link>
                                </li>
                            )}
                            {
                                user ? (
                                    <>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setUserPopupOpen(true)

                                                }}>Profile</button>
                                        </li>
                                        <li>
                                            <button onClick={() => {
                                                localStorage.removeItem("token");
                                                fetchUser(null);
                                                navigate("/")
                                                window.location.reload();
                                            }} className={`signup`}>Logout</button>
                                        </li>

                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <button className="login" onClick={() => {
                                                setSignupPopupOpen(false)
                                                setLoginPopupOpen(true)
                                            }}>Login</button>
                                        </li>
                                        <li>
                                            <button onClick={() => {
                                                setLoginPopupOpen(false)
                                                setSignupPopupOpen(true)
                                            }} className="signup" to={"/signup"}>Signup</button>
                                        </li>
                                    </>

                                )
                            }
                        </ul>
                    </div>
                    {user && <User isOpen={isUserPopupOpen} onClose={() => {
                        setUserPopupOpen(false)
                    }} />}
                    <Login isOpen={isLoginPopupOpen} onClose={() => {
                        setLoginPopupOpen(false)
                    }} />
                    <Signup isOpen={isSignupPopupOpen} onClose={() => {
                        setSignupPopupOpen(false)
                    }} />
                </div>
            )
            }
        </>
        // <div id='main-nav' >
        //     <Link to={"/"}>
        //         <div className={`logo ${location.pathname === "/" ? "logo-down" : "move-up logo-up"}`}>
        //             <img src={TranslatorLogo} alt="" />
        //         </div>
        //     </Link>
        //     {user ? (
        //         <div>
        //             <div className="login-signup-done">
        //                 <button
        //                     onClick={() => {
        //                         setUserPopupOpen(true)

        //                     }}
        //                     className={`login ${location.pathname === "/" ? "" : "move-up"}`}><img src={UserLogo} alt="" /></button>
        //                 <div></div>
        //                 <button onClick={() => {
        //                     localStorage.removeItem("token");
        //                     fetchUser(null);
        //                     navigate("/")
        //                     window.location.reload();
        //                 }} className={`signup ${location.pathname === "/" ? "" : "move-up"}`}><img src={LogoutLogo} alt="" /></button>
        //             </div>
        //             <User isOpen={isUserPopupOpen} onClose={() => {
        //                 setUserPopupOpen(false)
        //             }} />
        //         </div>
        //     ) : (
        //         <>
        //             <div className="login-signup">
        //                 <button className="login" onClick={() => {
        //                     setSignupPopupOpen(false)
        //                     setLoginPopupOpen(true)
        //                 }}>Login</button>
        //                 <div></div>
        //                 <button onClick={() => {
        //                     setLoginPopupOpen(false)
        //                     setSignupPopupOpen(true)
        //                 }} className="signup" to={"/signup"}>Signup</button>
        //             </div>
        //             <Login isOpen={isLoginPopupOpen} onClose={() => {
        //                 setLoginPopupOpen(false)
        //             }} />
        //             <Signup isOpen={isSignupPopupOpen} onClose={() => {
        //                 setSignupPopupOpen(false)
        //             }} />

        //         </>
        //     )
        //     }

        // </div>
    )
}

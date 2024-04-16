import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useUserStore } from '../store/user-store';
import { CloseIcon } from '../Image';


function User({ isOpen, onClose }) {
    const { fetchUser } = useUserStore();
    const { user } = useUserStore();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone_number);
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();


    const processUpdate = async () => {
        toast.loading("Updating user...")
        if (newPassword === confirmNewPassword) {
            if (password === null || password === undefined || password === "") {
                toast.dismiss()
                toast.error("Please enter your password!")
                return;
            }
            const token = localStorage.getItem("token");
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            try {
                const { data } = await axios.put(process.env.REACT_APP_BACKEND_URL + "/auth/users/update"
                    ,
                    {
                        name,
                        email,
                        password,
                        phone_number: phone,
                        new_password: newPassword

                    }, { headers })
                if (data.statusCode === 200) {
                    localStorage.setItem("token", data.token)
                    toast.dismiss()
                    toast.success(data.error)
                    setNewPassword("")
                    setConfirmNewPassword("")
                    setPassword("")
                }
                else {
                    toast.dismiss()
                    toast.error(data.error)
                }
            }
            catch (e) {
                toast.dismiss()
                toast.error("Network error!")
            }
            finally {
                fetchUser(token);
            }
        }
        else {
            toast.dismiss()
            toast.error("Password and Confirm Password must be same!")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await processUpdate();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="login-popup user-profile" onClick={(e) => {
            e.stopPropagation()
        }}>
            <div className="login-content">
                <h2>User Profile</h2>
                <button className="close-btn" onClick={onClose}><img src={CloseIcon} alt="" /></button>
                <form>

                    <div className="user-grid">
                        <div>
                            <div>
                                <h3 class="profile-header">Update your profile:</h3>
                            </div>
                        </div>
                        <div>
                            <input
                                id='name'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label htmlFor='name'>Name:</label>
                        </div>
                        <div>
                            <input
                                id='email'
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor='email'>Email:</label>
                        </div>
                        <div>
                            <input
                                id='phone'
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <label htmlFor='phone'>Phone:</label>
                        </div>
                    </div>
                    <hr />
                    <div className="user-grid">
                        <div>
                            <input
                                id='new_password'
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <label htmlFor='new_password'>New Password:</label>
                        </div>
                        <div>
                            <input
                                id='confirm_new_password'
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                            <label htmlFor='confirm_new_password'>Confirm New Password:</label>
                        </div>
                    </div>
                    <hr />
                    <div className="user-grid">
                        <h3 className='profile-header'>Please verify your password:</h3>
                        <div>
                            <input
                                id='password'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor='password'>Password:</label>
                        </div>
                    </div>
                    <button type='submit' className='home-start save-changes' onClick={handleSubmit}>Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default User;
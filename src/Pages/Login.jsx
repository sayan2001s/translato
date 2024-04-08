import React, { useState } from 'react';
import processLogin from '../store/utility';
function Login({ isOpen, onClose }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const status = await processLogin(email, password);
        if (status) {
            onClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="login-popup">
            <div className="login-content">
                <h2>Login</h2>
                <button className="close-btn" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>

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
                    <div className='user-last-element'>
                        <input
                            id='password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor='password'>Password:</label>
                    </div>
                    <button type='submit' className='home-start login-btn'>Login</button>
                </form>
                <p>Don't have any account? <a href="/">Sign-up</a></p>
            </div>
        </div>
    );
}

export default Login;
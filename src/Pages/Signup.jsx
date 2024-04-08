import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import processLogin from '../store/utility';
import { validateEmail, validateName, validatePassword } from '../utilities/Validate';

function Signup({ isOpen, onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const processSignup = async () => {
        toast.loading('Signing up...');
        const url = "http://localhost:6969";
        console.log(url);
        if (name === '' || email === '' || password === '') {
            toast.error('Name, email and password are required');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const { data } = await axios.post(url + '/auth/users/register',
                {
                    name,
                    email,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (data.message) {
                localStorage.setItem("token", data.token);
                onClose();
                const status = processLogin(email, password)
                if (!status) {
                    toast.dismiss();
                    toast.error("Login failed! Please try again!");
                    window.location.reload()
                }
            }
            if (data.error) {
                toast.dismiss();
                toast.error(data.error);
            }
        }
        catch (error) {
            console.log(error);
            toast.dismiss();
            toast.error("Error signing up");
        }

    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (validateEmail(email) === false) {
            toast.error('Invalid email');
            return;
        }
        if (validatePassword(password) === false) {
            toast.error('Password must contain at least 8 characters, one letter and one number');
            return;
        }
        if (validateName(name) === false) {
            toast.error('Name must contain at least 3 characters');
            return;
        }
        await processSignup(name, email, password);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="login-popup">
            <div className="login-content signup-popup">
                <h2>Sign Up</h2>
                <button className="close-btn" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
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
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor='email'>Email:</label>
                    </div>
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
                    <div>
                        <input
                            id='confirmPassword'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                    </div>
                    <button type='submit' className='home-start login-btn'>Sign Up</button>
                </form>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
}

export default Signup;

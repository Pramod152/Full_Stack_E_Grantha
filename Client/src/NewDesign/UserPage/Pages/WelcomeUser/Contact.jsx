import NavBar from '../../../../components/NavBar/NavBar_Welcome/NavBar';
import React, { useState } from 'react';
import './WelcomeUserCSS/Course.css';
import Button from '../../../../components/Button/Button';


const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the message using the provided email and message data
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);
        // You can use an API or any other method to send the message
    };

    return (
        <>
            <NavBar />  
            <h1>Contact Us</h1>
            <div className="fomr-wrapper">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <Button BtnName="Send Message" type="submit" />
            </form>
            </div>
        </>
    );
};

export default ContactPage;
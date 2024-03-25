import NavBar from './Components/NavBar';
import React, { useState } from 'react';
import './WelcomeUserCSS/Contact.css'
import Button from './Components/Button';


const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/E-Grantha/user/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                }),
            });

            if (response.ok) {
                setSuccessMessage("Message sent successfully!");
                // Clear the form fields after successful submission
            setName('');
            setEmail('');
            setMessage('');
            } else {
                setErrorMessage("Failed to send message. Please try again later.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setErrorMessage("Error sending message. Please try again later.");
        }
    };

    return (
        <>
            <NavBar />  
            <div id="form_wrapper">
                {errorMessage && <p id="error_message">{errorMessage}</p>}
                {successMessage && <p id="success-message">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div id='form_element_wrapper'>
                        <label id='name' htmlFor="name">Name:</label> <br />
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='email' htmlFor="email">Email:</label> <br />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='message' htmlFor="message">Message:</label> <br />
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <Button BtnName="Send Message" id="contactButton" type="submit" />
                </form>
            </div>
        </>
    );
};

export default ContactPage;

import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        business: '',
        email: '',
        phone: '',
        contact_pref: ['Email', 'Phone - Morning', 'Phone - Afternoon'],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // submission logic
    };

    return (
        <form className="service-form">
            <div className="form-section">
            <div className="form-header">Contact Us</div>
            <br /><br />
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />

                <label htmlFor="contactPreference">Contact Preference</label>
                <select id="contactPreference">
                    <option value="">Select Your Contact Preference</option>
                    {formData.contact_pref.map((pref, index) => (
                        <option key={index} value={pref}>{pref}</option>
                    ))}
                </select>

                <label htmlFor="message">Message</label>  
                <textarea id="message" name="message" value={formData.message} 
                onChange={handleChange} placeholder="Comments/Questions" className = 'message-area'></textarea>

                <button type="submit" className="button">Submit</button>
            </div>
        </form>
    );
}

export default ContactForm;
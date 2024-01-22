import React, { useState } from 'react';

function SubscriptionsForm() {
    const [formData, setFormData] = useState({
        accountNumber: '',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        salesperson: '',
        email: '',
        subscriptions: []
    });
    const [totalCost, setTotalCost] = useState(0);

    // Function to handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const total = formData.subscriptions.reduce((acc, subId) => {
            const sub = SUBSCRIPTIONS.find(sub => sub.id === subId);
            return acc + (sub ? sub.cost : 0);
        }, 0);
        setTotalCost(total);
        // Further submission logic
    };

    const handleSubscriptionChange = (subscription, isSelected) => {
        if (isSelected) {
            setFormData({
                ...formData,
                subscriptions: [...formData.subscriptions, subscription]
            });
        } else {
            setFormData({
                ...formData,
                subscriptions: formData.subscriptions.filter(sub => sub !== subscription)
            });
        }
    };

    const SUBSCRIPTIONS = [
        { id: 1, name: 'SF2/SF3 | 3 Months', cost: 650},
        { id: 2, name: 'SF2/SF3 | 6 Months', cost: 850},
        { id: 3, name: 'SF2/SF3 | 1 Year', cost: 1050},
        { id: 4, name: 'SF2/SF3 | 2 Years', cost: 180},
        { id: 5, name: 'SF2/SF3 | 3 Years', cost: 2500},
        { id: 6, name: 'Atlantic Tractor RTK | 1 Year', cost: 1200},
        { id: 7, name: 'Atlantic Tractor RTK | 2 Years', cost: 2400},
        { id: 8, name: 'Atlantic Tractor RTK | 3 Years', cost: 3600},
        { id: 9, name: 'John Deere Mobile RTK | 1 Year', cost: 1250},
        { id: 10, name: '4640 Premium 3.0 | 1 Year', cost: 850},
        { id: 11, name: '4640 Universal Automation 4', cost: 1350},
        { id: 12, name: '4240 Section Control', cost: 600}
    ];

    const STATES = [
        { name: 'Alabama', abbreviation: 'AL' },
        { name: 'Alaska', abbreviation: 'AK' },
        { name: 'Arizona', abbreviation: 'AZ' },
        { name: 'Arkansas', abbreviation: 'AR' },
        { name: 'California', abbreviation: 'CA' },
        { name: 'Colorado', abbreviation: 'CO' },
        { name: 'Connecticut', abbreviation: 'CT' },
        { name: 'Delaware', abbreviation: 'DE' },
        { name: 'District of Columbia', abbreviation: 'DC' },
        { name: 'Florida', abbreviation: 'FL' },
        { name: 'Georgia', abbreviation: 'GA' },
        { name: 'Hawaii', abbreviation: 'HI' },
        { name: 'Idaho', abbreviation: 'ID' },
        { name: 'Illinois', abbreviation: 'IL' },
        { name: 'Indiana', abbreviation: 'IN' },
        { name: 'Iowa', abbreviation: 'IA' },
        { name: 'Kansas', abbreviation: 'KS' },
        { name: 'Kentucky', abbreviation: 'KY' },
        { name: 'Louisiana', abbreviation: 'LA' },
        { name: 'Maine', abbreviation: 'ME' },
        { name: 'Maryland', abbreviation: 'MD' },
        { name: 'Massachusetts', abbreviation: 'MA' },
        { name: 'Michigan', abbreviation: 'MI' },
        { name: 'Minnesota', abbreviation: 'MN' },
        { name: 'Mississippi', abbreviation: 'MS' },
        { name: 'Missouri', abbreviation: 'MO' },
        { name: 'Montana', abbreviation: 'MT' },
        { name: 'Nebraska', abbreviation: 'NE' },
        { name: 'Nevada', abbreviation: 'NV' },
        { name: 'New Hampshire', abbreviation: 'NH' },
        { name: 'New Jersey', abbreviation: 'NJ' },
        { name: 'New Mexico', abbreviation: 'NM' },
        { name: 'New York', abbreviation: 'NY' },
        { name: 'North Carolina', abbreviation: 'NC' },
        { name: 'North Dakota', abbreviation: 'ND' },
        { name: 'Ohio', abbreviation: 'OH' },
        { name: 'Oklahoma', abbreviation: 'OK' },
        { name: 'Oregon', abbreviation: 'OR' },
        { name: 'Pennsylvania', abbreviation: 'PA' },
        { name: 'Rhode Island', abbreviation: 'RI' },
        { name: 'South Carolina', abbreviation: 'SC' },
        { name: 'South Dakota', abbreviation: 'SD' },
        { name: 'Tennessee', abbreviation: 'TN' },
        { name: 'Texas', abbreviation: 'TX' },
        { name: 'Utah', abbreviation: 'UT' },
        { name: 'Vermont', abbreviation: 'VT' },
        { name: 'Virginia', abbreviation: 'VA' },
        { name: 'Washington', abbreviation: 'WA' },
        { name: 'West Virginia', abbreviation: 'WV' },
        { name: 'Wisconsin', abbreviation: 'WI' },
        { name: 'Wyoming', abbreviation: 'WY' },
    ];

    return (
        <form onSubmit={handleSubmit}>
            <br></br>
            <header className="form-header">Customer Information</header>
            <div className="form-content">
                <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Account Number" />
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />

                <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Address Line 1" />

                <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Address Line 2" />

                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />


                {/* State Dropdown */}
                <select name="state" value={formData.state} onChange={handleChange}>
                    <option value="">Select State</option>
                    {STATES.map((state, index) => (
                        <option key={index} value={state.abbreviation}>{state.abbreviation}</option>
                    ))}
                </select>


                <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Zip/Postal Code" />

                <input type="text" name="salesperson" value={formData.salesperson} onChange={handleChange} placeholder="Salesperson" />

                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />

                <div>
                <div>
            </div>
    {SUBSCRIPTIONS.map(sub => (
        <div key={sub.id}>
            <input 
                type="checkbox" 
                name="subscriptions" 
                value={sub.id} 
                onChange={(e) => handleSubscriptionChange(sub.id, e.target.checked)} 
            />
            {sub.name}
        </div>
    ))}
        </div>  
            </div>
            <br></br>
            <button type="submit">Submit</button>
            <p>Total Cost: ${totalCost}</p>
        </form>
    );
}

export default SubscriptionsForm;

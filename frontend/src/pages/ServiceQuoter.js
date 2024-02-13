import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from 'react-router-dom';

import './ServiceQuoter.css';

function ServiceForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        business: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        contact_pref: ['Email', 'Phone - Morning', 'Phone - Afternoon'],
        branch: ['Clayton', 'Chestertown', 'Cecilton', 'East New Market', 
        'Newark', 'Oxford', 'Pocomoke', 'Queen Anne', 'Salisbury', 'Whiteford', 
        'Mechanicsville', 'Westminster', 'Hunt Valley', 'Hanover', 'Upper Marlboro', 
        'Carlisle', 'Chambersburg', 'Hagerstown', 'Mercersburg'],
        dropOffDate: new Date(),
    });

    const BRANCHES = [
        {id: 1, cdkg_id:1, branch_name: 'Clayton'},
        {id: 2, cdkg_id:2, branch_name: 'Chestertown'},
        {id: 3, cdkg_id:3, branch_name: 'Cecilton'},
        {id: 4, cdkg_id:4, branch_name: 'East New Market'},
        {id: 5, cdkg_id:5, branch_name: 'Newark'},
        {id: 6, cdkg_id:6, branch_name: 'Oxford'},
        {id: 7, cdkg_id:7, branch_name: 'Pocomoke'},
        {id: 8, cdkg_id:8, branch_name: 'Queen Anne'},
        {id: 9, cdkg_id:9, branch_name: 'Salisbury'},
        {id: 10, cdkg_id:11, branch_name: 'Whiteford'},
        {id: 13, cdkg_id:16, branch_name: 'Mechanicsville'},
        {id: 14, cdkg_id:17, branch_name: 'Westminster'},
        {id: 15, cdkg_id:18, branch_name: 'Hunt Valley'},
        {id: 16, cdkg_id:19, branch_name: 'Hanover'},
        {id: 17, cdkg_id:20, branch_name: 'Upper Marlboro'},
        {id: 18, cdkg_id:23, branch_name: 'Carlisle'},
        {id: 19, cdkg_id:24, branch_name: 'Chambersburg'},
        {id: 20, cdkg_id:25, branch_name: 'Hagerstown'},
        {id: 21, cdkg_id:26, branch_name: 'Mercersburg'},
    ];

    const [totalCost, setTotalCost] = useState(0);

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

    const [categories, setCategories] = useState([
        { id: 1, name: 'Riding Lawn Equipment (John Deere S-Series, X3, X5, or similar)'},
        { id: 1, name: 'Residential Zero-Turn Mower (John Deere Z3, Z5, or similar)'},
        { id: 2, name: 'Commercial Zero-Turn Mower - Gas (John Deere Z7, Z9, or similar)'},
        { id: 2, name: 'Commercial Zero-Turn Mower - Diesel (John Deere Z994, Z997, or similar)'},
        { id: 4, name: 'Compact Utility Tractor (John Deere 1025R, Kabota BX2380, or similar)'},
        { id: 5, name: 'Gator Utility Vehicle (John Deere XUV835M, Kabota RTV, or similar)'},
    ]); 

    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);

    const [selectedMakeId, setSelectedMakeId] = useState("");
    const [selectedMakeName, setSelectedMakeName] = useState("");
    const [machineWorking, setMachineWorking] = useState('');

    const [selectedOption, setSelectedOption] = useState(null);

    const [showElements, setShowElements] = useState(true);
    const [showModels, setShowModels] = useState(false);

    const handleCategoryChange = async (event) => {
        const selectedCategory = categories.find(category => category.name === event.target.value);
        setFormData({ ...formData, category: selectedCategory.name, categoryId: selectedCategory.id });
        setShowElements(false);
        setSelectedOption(null);
        setShowModels(false);
        setCategories(categories.filter(category => category.id !== selectedCategory.id));
        try {
            const response = await axios.get(`http://localhost:8000/makes/${selectedCategory.id}`);
            setMakes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleMakeChange = async (event) => {
        const selectedMake = makes.find(make => make.make_id === parseInt(event.target.value));
        if (!selectedMake) {
            console.error(`No make found with name: ${event.target.value}`);
            return;
        }
        setShowModels(true);
        setSelectedMakeId(selectedMake.make_id);
        setSelectedMakeName(selectedMake.make_name);
        // setFormData({ ...formData, make: selectedMake.make_name });
        try {
            const response = await axios.get(`http://localhost:8000/models/${selectedMake.make_id}`);
            setModels(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleModelChange = (event) => {
        setShowElements(true);
        setSelectedOption(null);
        setFormData({ ...formData, model: event.target.value });
    };

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, dropOffDate: date });
    };

    const handleMachineWorkingChange = (event) => {
        setMachineWorking(event.target.value);
    };

    const resetAddOns = () => {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    };


    // this is for redirection from "Find Closest Branch" page
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const zip = params.get('zip');
        const state = params.get('state');
        const branch = params.get('branch');
        const distance = params.get('distance');

        if (zip && state && branch) {
        setFormData({
            ...formData,
            zip,
            state,
            branch,
        });
        }
    }, [location, formData]);

    // Calculate the hauling fee based on the distance and category
    // need to actually figure out the logic
    const calculateHaulingFee = () => {
        const feesPerMile = {
            1: 2, //RLE
            2: 3, //CME
            4: 5, //CUT
            5: 6, //GATOR
        };
    
        if (distance <= 20) {
            return 0;
        }
    
        const feePerMile = feesPerMile[category] || 0;
    
        return feePerMile * distance;
    };

    return (
    <form className="service-form">
    <div className="form-header">Maintenance Request Form</div>

    <div className="form-section">
        <br />
        <h2>Your Equipment Information</h2>
        <label htmlFor="category">Category</label>
        <select name="category" id="category" value={formData.category} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((category, index) => (
                <option key={index} value={category.name}>{category.name}</option>
            ))}
        </select>

        {makes.length > 0 && (
            <>
                <label htmlFor="make">Make</label>
                <select name="make" id="make" value={selectedMakeId} onChange={handleMakeChange}>
                    <option value="">Select a make</option>
                    {makes.map((make, index) => (
                        <option key={index} value={make.make_id}>{make.make_name}</option>
                    ))}
                </select>
            </>
        )}

        {models.length > 0 && showModels && (
            <>
                <label htmlFor="model">Model</label>
                <select name="model" id="model" value={formData.model} onChange={handleModelChange}>
                    <option value="">Select a model</option>
                    {models.map((model, index) => (
                        <option key={index} value={model.EQ_Model_name}>{model.EQ_Model_name}</option>
                    ))}
                </select>
            </>
        )}
        {formData.model && showElements && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Is the machine in working order?</p>
                <br />
                <input type="radio" id="yes" name="machineWorking" value="yes" checked={machineWorking === 'yes'} onChange={handleMachineWorkingChange} />
                <label htmlFor="yes">Yes</label>
                <input type="radio" id="no" name="machineWorking" value="no" checked={machineWorking === 'no'} onChange={handleMachineWorkingChange} />
                <label htmlFor="no">No</label>
            </div>
        )}

        {/* 
        
        
                Residential Mowing Equipment - not working
        
        
        */}
        <div style = {{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap'}}>
            {formData.categoryId === 1 && machineWorking === 'no' && showElements && (
                <div className = "card" style = {{ opacity: selectedOption === 'AT SHOP - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Express Lube</h2>
                    </div>
                    <h3>$89.00</h3>
                    <p className = "card-text" >Multi-Point Service Inspection</p>
                    <p className = "card-text" >Change Engine Oil & Filter</p>
                    <p className = "card-text" >Grease Machine</p>
                    <p className = "card-text" >Check Other Fluids</p>
                    <p className = "card-text" >Adjust Air Pressure</p>
                    <p className = "card-text" >Check Safety Systems</p>
                    <p className = "card-text" >Check Charging & Test Battery</p>
                    <p className = "card-text" >Blow Off Engine Compartment</p>
                    <p className = "card-text" >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Express Lube'); setTotalCost(89); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 1 && machineWorking === 'no' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Premium Service</h2>
                    </div>
                    <h3>$299.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Premium Service'); setTotalCost(299); resetAddOns();}}> Select</button>
                </div>
            )}
        </div>
        
        {/* 
        
        
                Residential Mowing Equipment - Is working
        
        
        
        */}

        <div style = {{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap'}}>
            {formData.categoryId === 1 && machineWorking === 'yes' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT HOME - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }} >AT HOME - Express Lube</h2>
                    </div>
                    <h3>$159.00</h3>
                        <p className = "card-text"  >Inspection</p>
                        <p className = "card-text"  >Change Engine Oil & Filter</p>
                        <p className = "card-text"  >Grease Machine</p>
                        <p className = "card-text"  >Check Other Fluids</p>
                        <p className = "card-text"  >Adjust Air Pressure</p>
                        <p className = "card-text"  >Check Safety Systems</p>
                        <p className = "card-text"  >Check Charging & Test Battery</p>
                        <p className = "card-text"  >Blow Off Engine Compartment</p>
                        <p className = "card-text"  >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT HOME - Express Lube'); setTotalCost(159); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 1 && machineWorking === 'yes' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT HOME - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT HOME - Premium Service</h2>
                    </div>
                    <h3>$345.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT HOME - Premium Service'); setTotalCost(345); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 1 && machineWorking === 'yes' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Express Lube</h2>
                    </div>
                    <h3>$89.00</h3>
                    <p className = "card-text" >Multi-Point Service Inspection</p>
                    <p className = "card-text" >Change Engine Oil & Filter</p>
                    <p className = "card-text" >Grease Machine</p>
                    <p className = "card-text" >Check Other Fluids</p>
                    <p className = "card-text" >Adjust Air Pressure</p>
                    <p className = "card-text" >Check Safety Systems</p>
                    <p className = "card-text" >Check Charging & Test Battery</p>
                    <p className = "card-text" >Blow Off Engine Compartment</p>
                    <p className = "card-text" >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Express Lube'); setTotalCost(89);}}> Select</button>
                </div>
            )}

            {formData.categoryId === 1 && machineWorking === 'yes' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Premium Service</h2>
                    </div>
                    <h3>$299.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Premium Service'); setTotalCost(299); resetAddOns();}}> Select</button>
                </div>
            )}
        </div>



        {/* 
        
                Gas Commercial mowing equipment - Not Working 
        
        
        */}
        <div style = {{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap'}}>
            {formData.categoryId === 2 && machineWorking === 'no' && formData.model !== 'Z994R' && formData.model !== '997' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Express Lube</h2>
                    </div>
                    <h3>$109.00</h3>
                    <p className = "card-text" >Multi-Point Service Inspection</p>
                    <p className = "card-text" >Change Engine Oil & Filter</p>
                    <p className = "card-text" >Grease Machine</p>
                    <p className = "card-text" >Check Other Fluids</p>
                    <p className = "card-text" >Adjust Air Pressure</p>
                    <p className = "card-text" >Check Safety Systems</p>
                    <p className = "card-text" >Check Charging & Test Battery</p>
                    <p className = "card-text" >Blow Off Engine Compartment</p>
                    <p className = "card-text" >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Express Lube'); setTotalCost(109); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 2 && machineWorking === 'no' && formData.model !== 'Z994R' && formData.model !== '997' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Premium Service</h2>
                    </div>
                    <h3>$329.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button"onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Premium Service'); setTotalCost(329); resetAddOns();}}> Select</button>
                </div>
            )}
        </div>
        
        {/* 
        
        
                Gas Commerical Mowing Equipment - Is working
        
        
        
        */}

        <div style = {{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap'}}>
            {formData.categoryId === 2 && machineWorking === 'yes' && formData.model !== 'Z994R' && formData.model !== '997' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT HOME - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }} >AT HOME - Express Lube</h2>
                    </div>
                    <h3>$179.00</h3>
                        <p className = "card-text"  >Inspection</p>
                        <p className = "card-text"  >Change Engine Oil & Filter</p>
                        <p className = "card-text"  >Grease Machine</p>
                        <p className = "card-text"  >Check Other Fluids</p>
                        <p className = "card-text"  >Adjust Air Pressure</p>
                        <p className = "card-text"  >Check Safety Systems</p>
                        <p className = "card-text"  >Check Charging & Test Battery</p>
                        <p className = "card-text"  >Blow Off Engine Compartment</p>
                        <p className = "card-text"  >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT HOME - Express Lube'); setTotalCost(179); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 2 && machineWorking === 'yes' && formData.model !== 'Z994R' && formData.model !== '997' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT HOME - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT HOME - Premium Service</h2>
                    </div>
                    <h3>$369.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT HOME - Premium Service'); setTotalCost(369); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 2 && machineWorking === 'yes' && formData.model !== 'Z994R' && formData.model !== '997' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Express Lube</h2>
                    </div>
                    <h3>$109.00</h3>
                    <p className = "card-text" >Multi-Point Service Inspection</p>
                    <p className = "card-text" >Change Engine Oil & Filter</p>
                    <p className = "card-text" >Grease Machine</p>
                    <p className = "card-text" >Check Other Fluids</p>
                    <p className = "card-text" >Adjust Air Pressure</p>
                    <p className = "card-text" >Check Safety Systems</p>
                    <p className = "card-text" >Check Charging & Test Battery</p>
                    <p className = "card-text" >Blow Off Engine Compartment</p>
                    <p className = "card-text" >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Express Lube'); setTotalCost(109);}}> Select</button>
                </div>
            )}

            {formData.categoryId === 2 && machineWorking === 'yes' && formData.model !== 'Z994R' && formData.model !== '997' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Premium Service</h2>
                    </div>
                    <h3>$329.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Premium Service'); setTotalCost(329); resetAddOns();}}> Select</button>
                </div>
            )}
        </div>


        {/* 
        
                Diesel Commercial mowing equipment - Not Working 
        
        
        */}
        <div style = {{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap'}}>
            {formData.categoryId === 2 && machineWorking === 'no' && (formData.model === 'Z994R' || formData.model === '997') && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Express Lube</h2>
                    </div>
                    <h3>$119.00</h3>
                    <p className = "card-text" >Multi-Point Service Inspection</p>
                    <p className = "card-text" >Change Engine Oil & Filter</p>
                    <p className = "card-text" >Grease Machine</p>
                    <p className = "card-text" >Check Other Fluids</p>
                    <p className = "card-text" >Adjust Air Pressure</p>
                    <p className = "card-text" >Check Safety Systems</p>
                    <p className = "card-text" >Check Charging & Test Battery</p>
                    <p className = "card-text" >Blow Off Engine Compartment</p>
                    <p className = "card-text" >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Express Lube'); setTotalCost(119); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 2 && machineWorking === 'no' && (formData.model === 'Z994R' || formData.model === '997') && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Premium Service</h2>
                    </div>
                    <h3>$355.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Premium Service'); setTotalCost(355); resetAddOns();}}> Select</button>
                </div>
            )}
        </div>
        
        {/* 
        
        
                Diesel Commerical Mowing Equipment - Is working
        
        
        
        */}

        <div style = {{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap'}}>
            {formData.categoryId === 2 && machineWorking === 'yes' && (formData.model === 'Z994R' || formData.model === '997') && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT HOME - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }} >AT HOME - Express Lube</h2>
                    </div>
                    <h3>$189.00</h3>
                        <p className = "card-text"  >Inspection</p>
                        <p className = "card-text"  >Change Engine Oil & Filter</p>
                        <p className = "card-text"  >Grease Machine</p>
                        <p className = "card-text"  >Check Other Fluids</p>
                        <p className = "card-text"  >Adjust Air Pressure</p>
                        <p className = "card-text"  >Check Safety Systems</p>
                        <p className = "card-text"  >Check Charging & Test Battery</p>
                        <p className = "card-text"  >Blow Off Engine Compartment</p>
                        <p className = "card-text"  >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT HOME - Express Lube'); setTotalCost(189); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 2 && machineWorking === 'yes' && (formData.model === 'Z994R' || formData.model === '997') && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT HOME - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT HOME - Premium Service</h2>
                    </div>
                    <h3>$395.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT HOME - Premium Service'); setTotalCost(395); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 2 && machineWorking === 'yes' && (formData.model === 'Z994R' || formData.model === '997') && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Express Lube</h2>
                    </div>
                    <h3>$119.00</h3>
                    <p className = "card-text" >Multi-Point Service Inspection</p>
                    <p className = "card-text" >Change Engine Oil & Filter</p>
                    <p className = "card-text" >Grease Machine</p>
                    <p className = "card-text" >Check Other Fluids</p>
                    <p className = "card-text" >Adjust Air Pressure</p>
                    <p className = "card-text" >Check Safety Systems</p>
                    <p className = "card-text" >Check Charging & Test Battery</p>
                    <p className = "card-text" >Blow Off Engine Compartment</p>
                    <p className = "card-text" >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Express Lube'); setTotalCost(119);}}> Select</button>
                </div>
            )}

            {formData.categoryId === 2 && machineWorking === 'yes' && (formData.model === 'Z994R' || formData.model === '997') && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Premium Service</h2>
                    </div>
                    <h3>$355.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Premium Service'); setTotalCost(355); resetAddOns();}}> Select</button>
                </div>
            )}
        </div>
        

        {/* 
        
                Compact Utility Tractor - Not Working 
        
        
        */}
        <div style = {{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap'}}>
            {formData.categoryId === 4 && machineWorking === 'no' &&  showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Express Lube</h2>
                    </div>
                    <h3>$129.00</h3>
                    <p className = "card-text" >Multi-Point Service Inspection</p>
                    <p className = "card-text" >Change Engine Oil & Filter</p>
                    <p className = "card-text" >Grease Machine</p>
                    <p className = "card-text" >Check Other Fluids</p>
                    <p className = "card-text" >Adjust Air Pressure</p>
                    <p className = "card-text" >Check Safety Systems</p>
                    <p className = "card-text" >Check Charging & Test Battery</p>
                    <p className = "card-text" >Blow Off Engine Compartment</p>
                    <p className = "card-text" >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Express Lube'); setTotalCost(129); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 4 && machineWorking === 'no' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Premium Service</h2>
                    </div>
                    <h3>$355.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Premium Service'); setTotalCost(355); resetAddOns();}}> Select</button>
                </div>
            )}
        </div>
        
        {/* 
        
        
                Compact Utility Tractor - Is working
        
        
        
        */}

        <div style = {{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap'}}>
            {formData.categoryId === 4 && machineWorking === 'yes' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT HOME - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }} >AT HOME - Express Lube</h2>
                    </div>
                    <h3>$189.00</h3>
                        <p className = "card-text"  >Inspection</p>
                        <p className = "card-text"  >Change Engine Oil & Filter</p>
                        <p className = "card-text"  >Grease Machine</p>
                        <p className = "card-text"  >Check Other Fluids</p>
                        <p className = "card-text"  >Adjust Air Pressure</p>
                        <p className = "card-text"  >Check Safety Systems</p>
                        <p className = "card-text"  >Check Charging & Test Battery</p>
                        <p className = "card-text"  >Blow Off Engine Compartment</p>
                        <p className = "card-text"  >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT HOME - Express Lube'); setTotalCost(189); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 4 && machineWorking === 'yes' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT HOME - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT HOME - Premium Service</h2>
                    </div>
                    <h3>$395.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT HOME - Premium Service'); setTotalCost(395); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 4 && machineWorking === 'yes' &&  showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Express Lube</h2>
                    </div>
                    <h3>$119.00</h3>
                    <p className = "card-text" >Multi-Point Service Inspection</p>
                    <p className = "card-text" >Change Engine Oil & Filter</p>
                    <p className = "card-text" >Grease Machine</p>
                    <p className = "card-text" >Check Other Fluids</p>
                    <p className = "card-text" >Adjust Air Pressure</p>
                    <p className = "card-text" >Check Safety Systems</p>
                    <p className = "card-text" >Check Charging & Test Battery</p>
                    <p className = "card-text" >Blow Off Engine Compartment</p>
                    <p className = "card-text" >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Express Lube'); setTotalCost(119); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 4 && machineWorking === 'yes' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Premium Service</h2>
                    </div>
                    <h3>$355.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Premium Service'); setTotalCost(355); resetAddOns();}}> Select</button>
                </div>
            )}
        </div>

        {/* 
        
                Gator Utility - Not Working 
        
        
        */}
        <div style = {{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap'}}>
            {formData.categoryId === 5 && machineWorking === 'no' &&  showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Express Lube</h2>
                    </div>
                    <h3>$119.00</h3>
                    <p className = "card-text" >Multi-Point Service Inspection</p>
                    <p className = "card-text" >Change Engine Oil & Filter</p>
                    <p className = "card-text" >Grease Machine</p>
                    <p className = "card-text" >Check Other Fluids</p>
                    <p className = "card-text" >Adjust Air Pressure</p>
                    <p className = "card-text" >Check Safety Systems</p>
                    <p className = "card-text" >Check Charging & Test Battery</p>
                    <p className = "card-text" >Blow Off Engine Compartment</p>
                    <p className = "card-text" >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Express Lube'); setTotalCost(119); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 5 && machineWorking === 'no' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Premium Service</h2>
                    </div>
                    <h3>$275.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Premium Service'); setTotalCost(275); resetAddOns();}}> Select</button>
                </div>
            )}
        </div> 
        
        {/* 
        
        
                Gator Utility Vehicle  - Is working
        
        
        
        */}

        <div style = {{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap'}}>
            {formData.categoryId === 5 && machineWorking === 'yes' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT HOME - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }} >AT HOME - Express Lube</h2>
                    </div>
                    <h3>$189.00</h3>
                        <p className = "card-text"  >Inspection</p>
                        <p className = "card-text"  >Change Engine Oil & Filter</p>
                        <p className = "card-text"  >Grease Machine</p>
                        <p className = "card-text"  >Check Other Fluids</p>
                        <p className = "card-text"  >Adjust Air Pressure</p>
                        <p className = "card-text"  >Check Safety Systems</p>
                        <p className = "card-text"  >Check Charging & Test Battery</p>
                        <p className = "card-text"  >Blow Off Engine Compartment</p>
                        <p className = "card-text"  >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT HOME - Express Lube'); setTotalCost(189); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 5 && machineWorking === 'yes' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT HOME - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT HOME - Premium Service</h2>
                    </div>
                    <h3>$315.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT HOME - Premium Service'); setTotalCost(315); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 5 && machineWorking === 'yes' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Express Lube' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Express Lube</h2>
                    </div>
                    <h3>$119.00</h3>
                    <p className = "card-text" >Multi-Point Service Inspection</p>
                    <p className = "card-text" >Change Engine Oil & Filter</p>
                    <p className = "card-text" >Grease Machine</p>
                    <p className = "card-text" >Check Other Fluids</p>
                    <p className = "card-text" >Adjust Air Pressure</p>
                    <p className = "card-text" >Check Safety Systems</p>
                    <p className = "card-text" >Check Charging & Test Battery</p>
                    <p className = "card-text" >Blow Off Engine Compartment</p>
                    <p className = "card-text" >Blow Off Air Filter</p>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Express Lube'); setTotalCost(119); resetAddOns();}}> Select</button>
                </div>
            )}

            {formData.categoryId === 5 && machineWorking === 'yes' && showElements && (
                <div className = "card" style={{ opacity: selectedOption === 'AT SHOP - Premium Service' || !selectedOption ? 1 : 0.5 }}>
                    <div className = "card-header">
                        <h2 style={{ margin: '0', color: 'white' }}>AT SHOP - Premium Service</h2>
                    </div>
                    <h3>$275.00</h3>
                    <div className = "scrollable-content">
                        <p className = "card-text" >Multi-Point Service Inspection</p>
                        <p className = "card-text" >Change Engine Oil & Filter</p>
                        <p className = "card-text" >Grease Machine</p>
                        <p className = "card-text" >Check Other Fluids</p>
                        <p className = "card-text" >Adjust Air Pressure</p>
                        <p className = "card-text" >Check Safety Systems</p>
                        <p className = "card-text">Check Charging & Load Test Battery</p>
                        <p className = "card-text">Blow Off Engine Compartment</p>
                        <p className = "card-text">Change Primary Air Filters</p>
                        <p className = "card-text">Level Deck</p>
                        <p className = "card-text">Sharpen Mower Blades</p>
                        <p className = "card-text">Clean Under Mower Deck</p>
                        <p className = "card-text">Replace Spark Plugs</p>
                        <p className = "card-text">Replace Fuel Filter</p>
                        <p className = "card-text">Install Fuel Conditioner/Stabilizer</p>
                    </div>
                    <button className = "card-button" onClick={(event) => {event.preventDefault(); setSelectedOption('AT SHOP - Premium Service'); setTotalCost(275);}}> Select</button>
                </div>
            )}
        </div>
        

        {/* 
        
                Add-Ons
        
        */}

        {formData.categoryId === 2 && selectedOption && (
            <div>
                <label>
                    <input type="checkbox" onChange={(event) => {if (event.target.checked) setTotalCost(prevTotalCost => prevTotalCost + 109); else setTotalCost(prevTotalCost => prevTotalCost - 109);}} />
                    Add Mid Mount Mower Service ($109)
                </label>
            </div>
        )}

        {formData.categoryId === 4 && selectedOption && (
            <div>
                <label>
                    <input type="checkbox" onChange={(event) => {if (event.target.checked) setTotalCost(prevTotalCost => prevTotalCost + 109); else setTotalCost(prevTotalCost => prevTotalCost - 109);}} />
                    Add Mid Mount Mower Service ($109)
                </label>
                <label>
                    <input type="checkbox" onChange={(event) => {if (event.target.checked) setTotalCost(prevTotalCost => prevTotalCost + 109); else setTotalCost(prevTotalCost => prevTotalCost - 109);}} />
                    Add Rear Mount Mower Service ($109)
                </label>
                <label>
                    <input type="checkbox" onChange={(event) => {if (event.target.checked) setTotalCost(prevTotalCost => prevTotalCost + 29); else setTotalCost(prevTotalCost => prevTotalCost - 29);}} />
                    Add Front Loader Service ($29)
                </label>
            </div>
        )}

        {selectedOption && (
            <div>
                <br />
                Total Cost (Hauling Not Included): ${totalCost}
            </div>
        )}



    </div>

    <div className="form-section">
        <h2>Your Contact Information</h2>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" />
        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" />
        <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
        <input type="text" name="address1" value={formData.address1} onChange={handleInputChange} placeholder="Address Line 1" />
        <input type="text" name="address2" value={formData.address2} onChange={handleInputChange} placeholder="Address Line 2" />
        <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
        
        {/* State Dropdown */}
        <label htmlFor="state">State</label>
        <select name="state" id="state" value={formData.state} onChange={handleInputChange}>
            <option value="">Select State</option>
            {STATES.map((state, index) => (
                <option key={index} value={state.abbreviation}>{state.abbreviation}</option>
            ))}
        </select>

        <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="Zip/Postal Code" />

        <label htmlFor="contactPreference">Contact Preference</label>
        <select id="contactPreference">
            <option value="">Select Your Contact Preference</option>
            {formData.contact_pref.map((pref, index) => (
                <option key={index} value={pref}>{pref}</option>
            ))}
        </select>
    </div>

    <div className="form-section">
        <h2>Appointment Setup</h2>
        <label htmlFor="branch">Branch</label>
        <select id="branch" value={formData.branch} onChange={handleInputChange}>
            <option value="">Select Branch</option>
            {BRANCHES.map((branch, index) => (
                <option key={index} value={branch.branch_name}>{branch.branch_name}</option>
            ))}
        </select>

        <label htmlFor="dropOffDate">Preferred Drop Off Date</label>
        <DatePicker 
                selected={formData.dropOffDate} 
                onChange={handleDateChange} 
                className="date-picker" // Add a class for custom styling
                dateFormat="MMMM d, yyyy" // Example date format, adjust as needed
        />
    </div>
    
    <button type="submit" className="button">Submit</button>
    </form>
    );
}

export default ServiceForm;
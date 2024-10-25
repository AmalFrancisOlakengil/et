import React, { useState } from 'react';
import "./home.css";
import { Link } from "react-router-dom";
const Home = () => {
    const [income, setIncome] = useState('');
    const [dailyLimit, setDailyLimit] = useState('');
    const [savingTarget, setSavingTarget] = useState('');
    const [reminder, setReminder] = useState(false);
    const [expense, setexpense] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            income,
            dailyLimit,
            savingTarget,
            reminder,
        });
    };

    const handleAdd = (e)=>{
        e.preventDefault();
        console.log({expense});
    };

    return (
        <div className='home'>
            <nav>
                <ul className='navbar'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/pages/dashboard'>Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/pages/notification'>Notifications</Link>
                    </li>
                </ul>
            </nav>
            <h1 className='title'>Welcome to the Expense Tracker</h1>
            <div className='details'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Monthly Income:</label>
                        <input 
                            type='number' 
                            value={income} 
                            onChange={(e) => setIncome(e.target.value)} 
                            placeholder="Enter your monthly income" 
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Daily Expense Limit:</label>
                        <input 
                            type='number' 
                            value={dailyLimit} 
                            onChange={(e) => setDailyLimit(e.target.value)} 
                            placeholder="Enter your daily expense limit" 
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Monthly Saving Target:</label>
                        <input 
                            type='number' 
                            value={savingTarget} 
                            onChange={(e) => setSavingTarget(e.target.value)} 
                            placeholder="Enter your saving target" 
                            required
                        />
                    </div>         
                    <div className="form-group">
                        <label className='reminder'>Reminders:</label>
                        <div className='toggle'>
                            <input 
                                type='checkbox' 
                                checked={reminder} 
                                onChange={() => setReminder(!reminder)} 
                            />
                            <span>{reminder ? 'On' : 'Off'}</span>
                        </div>
                    </div>
                    
                    <button type='submit' className='submit-button'>Submit</button>
                </form>
            </div>
            <form onSubmit = {handleAdd} className='addexpense'>
            <div className="form-group">
                <h1 className='title'>Enter Today's expense</h1>
                <input type='number' placeholder="price"  value={expense} required onChange={(e)=> setexpense(e.target.value)}></input>
                <button type='submit' className='submit-button'>Add Expense</button>
            </div>
            </form>
        </div>
    );
};

export default Home;

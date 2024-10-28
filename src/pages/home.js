import React, { useState } from 'react';
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
    const [income, setIncome] = useState('');
    const [dailyLimit, setDailyLimit] = useState('');
    const [savingTarget, setSavingTarget] = useState('');
    const [reminder, setReminder] = useState(false);
    const [expense, setexpense] = useState('');
    const navigate = useNavigate();

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
        navigate('/pages/dashboard', { state: { data: expense } });
    };

    return (
        <div className='home'>
            <nav>
                <ul className='navbar'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to={{ pathname: '/pages/dashboard', state:{data: expense}}}>Dashboard</Link>
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
            <div className='olddata'>
                <h1>Select a month to view</h1>
            <select id="months" name="months">
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
                </select>
            </div>
        </div>
    );
};

export default Home;

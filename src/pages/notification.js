import { Link } from "react-router-dom";
import "./notification.css";
export default function Notification(){
    return(<div className='notification'>
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
    </div>);
}
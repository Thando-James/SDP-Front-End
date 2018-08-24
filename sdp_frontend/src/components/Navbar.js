import React,{Component} from 'react'
import './styles.css';
import {Link} from 'react-router-dom'

class NavBar extends Component{
    render(){
        return(
            <div className="navbar-container">
                <ul>
                    <li><Link to="/">Scheduler</Link></li>
                    <li><Link to="/courses">Students</Link></li>
                </ul>
            </div>
        )
    }
}

export default NavBar
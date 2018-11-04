import React,{Component} from 'react'
import './styles.css';
import {Link} from 'react-router-dom'
import {Navbar} from 'react-bootstrap'
import {Nav} from 'react-bootstrap'
import {NavItem} from 'react-bootstrap'


class NavBar extends Component{
    constructor(props){
        super(props)
        this.onLogOut = this.onLogOut.bind(this)
    }

    onLogOut(){
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    render(){

        var id = getCookie("id");
        const navbar = {backgroundColor: '#07392a6'};
        return(
            <Navbar style={navbar} inverse collapseOnSelect>
                <Navbar.Header>
                     <Navbar.Brand>
                         <a href="/"><img src="./w1.png" weign="50" height="50"/>Timetable Scheduler</a>
                     </Navbar.Brand> 
            <Navbar.Toggle/>
                </Navbar.Header>
            <Navbar.Collapse>
                 <Nav>
                    <NavItem 
                        eventKey={1} href="/">Scheduler
                    </NavItem>
                    <NavItem 
                        eventKey={2} href="/allstudents">Students
                    </NavItem>
                    {
                        id !== "" ? <NavItem 
                        eventKey={3} href="/login" onClick={this.onLogOut}>Log Out
                    </NavItem> : <NavItem 
                        eventKey={3} href="/login">Login
                    </NavItem>
                    }
                </Nav>   
            </Navbar.Collapse>
            </Navbar>
        )
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default NavBar
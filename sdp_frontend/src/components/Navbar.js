import React,{Component} from 'react'
import './styles.css';
import {Link} from 'react-router-dom'
import {Navbar} from 'react-bootstrap'
import {Nav} from 'react-bootstrap'
import {NavItem} from 'react-bootstrap'


class NavBar extends Component{
    render(){
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                     <Navbar.Brand>
                         <a href="/">Timetable Scheduler</a>
                     </Navbar.Brand> 
            <Navbar.Toggle/>
                </Navbar.Header>
            <Navbar.Collapse>
                 <Nav>
                    <NavItem 
                        eventKey={1} href="/">Scheduler
                    </NavItem>
                    <NavItem 
                  eventKey={2} href="/courses">Students
                    </NavItem>
                 </Nav>   
            </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar
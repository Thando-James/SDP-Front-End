import React, {Component} from 'react'
import {Button} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';

class Timetable extends Component{
    constructor(props){
        super(props)
       }
render(){
    var counter = 1;
    return(
    <div> 
        <table id = "timetable" border="1">
                    <tr>
                    <th>Sessions</th> 
                    <th>Courses</th>
                    </tr>
     {this.props.location.state ? this.props.location.state.map((x)=>{
            return(

                    <tr><td>{counter++}</td>
                    <td>{x + " "}</td></tr>
                    
                  )}) : <div></div>
         }
           </table>
    </div> 
 )}}
  export default Timetable
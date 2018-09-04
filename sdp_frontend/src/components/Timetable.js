import React, {Component} from 'react'
import {Button} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';

class Timetable extends Component{
    constructor(props){
        super(props)
        this.state = {
            data :[["IS","COMS"],["MATH","ENG"],["PHYS"],["ACCN"]]
        }
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
     {this.state.data ? this.state.data.map((x)=>{
            return(

                    <tr><td>{counter++}</td>
                    <td>{x + " "}</td></tr>
                    
                  )}) : <div></div>
         }
           </table>
    </div> 
 )}}
  export default Timetable
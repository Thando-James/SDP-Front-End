import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'

let url = 'http://youthleague.co'
class StudentsTimetable extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
    var counter =1;
    return(
        <div>
        <pre> 
         <PageHeader>
            <h1>Student Timetable</h1>
             </PageHeader>
             </pre>
             <Table id ="sessions" bordered striped condensed hover >
             <thead>                   
             <tr>
             <th>Sessions</th> 
             <th>Courses <input type="text" id="myInput" 
             placeholder="Search for courses.." title="Type a course"></input></th>
             </tr>
             </thead>
    
     {this.props.location.state ? this.props.location.state.map((x)=>{
            return(
             
             <tbody>
             <tr><td>{counter++}</td>
             <td>{x + " "}</td></tr>
             </tbody>
           )}) : <div></div>
     }
    </Table>
    </div>
    )}}export default StudentsTimetable

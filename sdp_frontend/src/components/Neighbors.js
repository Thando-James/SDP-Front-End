import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'

let url = 'http://youthleague.co'
class Neighbors extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
    var counter =1;
    return(
        <div>
        <pre> 
         <PageHeader>
            <h1 align='center'>Courses interactions Timetable</h1>
             </PageHeader>
             </pre>
             <div align ="center" class='col-lg-4' style={{marginTop:'3%', marginLeft:'15%'}}>
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
                            <tr><td>{x.data[0]}</td>
                            <td>{x.subject + " "}</td></tr>
                            </tbody>
                          )
                        
                        } ) : <div></div>
                  }
    </Table>
    </div>
    </div>
    )}}export default Neighbors

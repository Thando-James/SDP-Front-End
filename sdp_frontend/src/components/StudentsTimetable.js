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
        function search() {
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("sessions");
            tr = table.getElementsByTagName("tr")
            for (i = 0; i < tr.length; i++) {
              td = tr[i].getElementsByTagName("td")[1];
              
             // console.log(test)
              if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }       
            }
        }
    var counter =1;
    return(
        <div>
        <pre> 
         <PageHeader>
            <h1 align='center'>Student Timetable</h1>
             </PageHeader>
             </pre>
             <div align ="center" class='col-lg-4' style={{marginTop:'3%', marginLeft:'15%'}}>
             {this.props.location.state ? <div align = 'center'>
            <label color='red' align= 'center'>Timetable for student number:  {this.props.location.state.std}</label>
            </div>:<div></div>
             }
             <div align='center'>
             <ReactHTMLTableToExcel id="test" className="btn btn-primary" 
            table="sessions" filename="Sessions table" sheet="sessions" buttonText="Download as XLS"/>
           </div> 
             <Table id ="sessions" bordered striped condensed hover style={{marginRight:'-35%'}} >
             <thead>                   
             <tr>
             <th>Sessions</th> 
             <th>Courses <input type="text" id="myInput" 
             placeholder="Search for courses.." title="Type a course" onKeyUp={search}></input></th>
             </tr>
             </thead>
    
             {this.props.location.state ? this.props.location.state.singleTable.map((x)=>{
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
    )}}export default StudentsTimetable

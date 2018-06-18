import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'
class Timetable extends Component{
    constructor(props){
        super(props)
       }

    
       
render(){
    function search() {
        var input, filter, table, tr, td, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("sessions");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
          if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }

    var counter = 1;
    return(
    <div>
    <pre> 
     <PageHeader>
        <h1>Generated timetable with sessions</h1>
         </PageHeader>
         </pre>
        
         <div style={{marginTop:'3%', marginLeft:'1%'}}>
             <ReactHTMLTableToExcel id="test" className="btn btn-primary" 
            table="sessions" filename="Sessions table" sheet="sessions" buttonText="Download as XLS"/>
            </div> 
            <div align ="center" class='col-lg-4' style={{marginTop:'3%', marginLeft:'35%'}}>
            
                <Table id ="sessions" bordered striped condensed hover >
                    <thead>                   
                    <tr>
                    <th>Sessions</th> 
                    <th>Courses <input type="text" id="myInput"  onKeyUp= {search}
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
           </div>
  
 )}}
  export default Timetable
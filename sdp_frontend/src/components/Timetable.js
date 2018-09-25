import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'
// let url = 'http://youthleague.co'
let url = 'http://localhost'
class Timetable extends Component{
    constructor(props){
        super(props)
        this.state={
          studentnumber:"",
        }
       }

      sendStdnum = function(){
        let _self = this;
        var stdnum = document.getElementById("stdNum")
        console.log(stdnum.value)
       fetch(`${url}:3456/student`,{
          method:"POST",
          body:JSON.stringify({studentnumber:stdnum.value
        }),
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },
      })
      .then(function(response){
          return response.json()
      })
    .then(function(response){
          console.log(response)
          _self.props.history.push({
              pathname:'/stdtimetable',
              state:response
          })
      })
      .catch(function(err){
          console.log(err)
      })}.bind(this)

  render(){
    //
      function search() {
      var input, filter, table, tr, td, i;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("sessions");
      tr = table.getElementsByTagName("tr")
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        var test = td.toString()
        console.log(test)
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
         <div align ="center" class='col-lg-4' style={{marginTop:'3%', marginLeft:'15%'}}>
         <div>
             <ReactHTMLTableToExcel id="test" className="btn btn-primary" 
            table="sessions" filename="Sessions table" sheet="sessions" buttonText="Download as XLS"/>
           </div> 
          
            <label>Please enter student number:</label>
            <div><input type="text" name="studentNum"  id = "stdNum" placeholder="Student number"/></div>
            <p></p>
            <Button onClick={this.sendStdnum}>Generate timetable</Button>
            <p></p>
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
           {this.props.location.state ? this.props.location.state.map((x)=>{
             return(
              <div className="checklist" >
              <input type="checkbox" name="courses" value={x}  onChange={this.onChecked}/> {x.Course_Code}
              </div>
             )}):<div></div>
           }
           </div>
  
 )}}
  export default Timetable
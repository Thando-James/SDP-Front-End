import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'
import SelectSearch from 'react-select-search'
 let url = 'http://youthleague.co'
//let url = 'http://localhost'
class Timetable extends Component{
    constructor(props){
        super(props)
        this.state={
          studentnumber:"",
          coursecode:"",
          data:[]
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

      getNeighbor= function(){
        let _self = this;
        var courseN = document.getElementById("courseN")
    
       fetch(`${url}:3456/neighbors`,{
          method:"POST",
          body:JSON.stringify({coursecode:courseN.value
        }),
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },
      })
      .then(function(response){
          return response.json()
      })
    .then(function(response){
          console.log('Response from Nelly')
          console.log(response)
          _self.props.history.push({
              pathname:'/interactions',
              state:response
          })
        })
        .catch(function(err){
          console.log(err)
        })
    }.bind(this)

  render(){
      
      function search() {
          var input, filter, table, tr, td, i;
          input = document.getElementById("myInput");
          filter = input.value.toUpperCase();
          table = document.getElementById("sessions");
          tr = table.getElementsByTagName("tr")
          for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            
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
    return(
    <div>
    <pre> 
     <PageHeader>
        <h1 align='center'>Generated timetable with sessions</h1>
         </PageHeader>
         </pre>
         <div className='row'>

        
    <div class='col-lg-6' >
            <div align='center'>
             <ReactHTMLTableToExcel id="test" className="btn btn-primary" 
            table="sessions" filename="Sessions table" sheet="sessions" buttonText="Download as XLS"/>
           </div> 
           <p></p>
    <Table id ="sessions" align='center' bordered striped condensed hover style={{width:'500px'}} >
                    <thead>                   
                    <tr>
                      <th>Sessions</th> 
                      <th>Courses <input type="text" id="myInput"  onKeyUp= {search}
                          placeholder="Search for courses.." title="Type a course"></input>
                      </th>
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
           <div className="col-lg-6" >
            <label>Please enter student number:</label>
            <div><input type="text" name="studentNum"  id = "stdNum" placeholder="Student number"/></div>
            <p></p>
            <Button bsStyle="success" onClick={this.sendStdnum}>Generate timetable</Button>
            <p></p>
            <span></span>
            <p></p>
            <label>Please enter course code:</label>
            <div>
            
            <select id="courseN" >
           
            {this.state.data != "" ? this.state.data.map((x)=>{
              console.log(x.Course_Code)
            return(
             <option value={x.Course_Code}>{x.Course_Code}
            </option>
            )}) : <div></div>
            }
            </select>
            </div>
            <p></p>
           <Button bsStyle="success" onClick={this.getNeighbor}>Check neighbors</Button>
            </div>
            </div>
            </div>
            
            )
          }
          
    componentDidMount(){
      let _self = this;
      fetch(`${url}:3456/display/courses`)
      .then(function(res){
          return res.json()
      })
      .then(function(response){
          console.log(response)
          _self.setState({
              data:response
          })
      })
      .catch(function(err){
          console.log(err)
      })
    }}export default Timetable
          
          
          
            /*{this.props.location.state ? this.props.location.state.map((x)=>{
             return(
               
              <div className="checklist" >
              <input type="checkbox" name="courses" value={x}  onChange={this.onChecked}/> {x}
              </div>
             )}):<div></div>
           } }*/
         
  

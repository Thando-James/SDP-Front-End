import React, {Component} from 'react'
import {PageHeader} from 'react-bootstrap'
import './Scheduler.css'
import {Button} from 'react-bootstrap'
import {browserHistory} from 'react-router'

let url = 'http://youthleague.co'
// let url = 'http://localhost'
class allStudents extends Component{
    constructor(props){
        super(props)
        this.state={
            studentnumber: "",
            code: "",
            reg: "",
            data:[],
            bye:[],
            stdnumbers: this.props.location.state
        }
    }

    deregister = function(){
       let  _self = this
        var students = document.querySelectorAll('input[type=checkbox]:checked')
        var array = []
        for(var i=0, n=students.length;i<n;i++) {
               array.push(students[i].value)
               
           }       
                fetch(`${url}:3456/deregister`,{
                    method:"POST",
                    body:JSON.stringify({bye:array
                }),
                  headers: {
                      "Content-Type": "application/json; charset=utf-8",
                  },
                })
                .then(function(response){
                    return response.json()
                   
                })
                .then(function(response){
                    // console.log('Response from Nelly')
                    console.log(response)
                    // _self.props.history.push({
                    //     pathname:'/interactions',
                    //     state:response
                    // })
                    _self.setState({
                        stdnumbers:response
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
            }.bind(this)


            AddNewStudent = function(e){
                e.preventDefault();
                let _self = this;
                var newKid = document.getElementById("std")
                var Course = document.getElementById("code")
                var stat = document.getElementById("reg");
                console.log('std is ',newKid.value)
                console.log('code is ',Course.value)
                console.log('status is ', stat.value);

        
                fetch(`${url}:3456/addStudent`,{
                    method:"POST",
                    body:JSON.stringify({studentnumber:newKid.value,
                        code:Course.value,
                        reg: stat.value

                  }),
                    headers: {
                      "Content-Type": "application/json; charset=utf-8",
                    },
                })
                .then(function(response){
                    return response.json()
                })
                .then(function(response){
                    console.log('pppppp: ',response)
                    _self.setState({
                        studentnumber:response,
                        code:response,
                        reg:response

                    })
                })
                .catch(function(err){
                    console.log(err)
                })
            }.bind(this)
        
        
    render(){
   
    return(
      
        <div class="container">
       
           <PageHeader style={{textAlign:'center'}}>
           <h1>All Registered Students</h1>
           </PageHeader>
          
       <div class='row' >
       <div class ='col-lg-10'>
       <Button style={{marginLeft:'400px'}}bsStyle="warning" onClick={this.deregister}>De-register</Button>
            <p></p>
             <div class='courses-list'>
           {this.state.data != "" ? this.state.data.map((x)=>{
           return(
            
            <div className="checklist">
            <input type="checkbox" id="allStudents" value={x} class = "students"/> {x}
            </div>
           )}) :<div><p class="Oops" style={{align:'center'}}>Oops!!! looks like the database is down please ask Nelly/James to refresh</p></div>
            }
                 
            </div>
            <div class="form-header">
  <h2>Add new student</h2>
        </div>
        <form method="post" action="/add" novalidate>
        <div class="form-field">
            <label for="Std">Student Number</label>
            <input type="text" name="studentNum"  id = "std" placeholder="Enter student number" style={{marginRight:10}}/>
        </div>
        <div class="form-field">
            <label for="code">Course Code</label>
            <input type="text" name="coursecode"  id = "code" placeholder="Enter course" style={{marginRight:10}}/>
        </div>
        <div class="form-field">
            <label for="Reg">Status</label>
            <input type="text" name="reg"  id = "reg" placeholder="Status"  style={{marginRight:10}}/>
        </div>
        <div class="form-actions">
            <button class="btn" type="submit" onClick={this.AddNewStudent}>Add</button>
        </div>
        </form>

            </div>
            </div>
        </div>
         )
        }
     

  componentDidMount(){
        let _self = this
        fetch(`${url}:3456/allStudents`)
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
        
    }
}

export default allStudents
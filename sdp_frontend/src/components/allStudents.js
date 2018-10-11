import React, {Component} from 'react'
import {PageHeader} from 'react-bootstrap'
import './Scheduler.css'
import {Button} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import $ from 'jquery'

let url = 'http://youthleague.co'
// let url = 'http://localhost'
class allStudents extends Component{
    constructor(props){
        super(props)
        this.state={
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


            AddNewStudent = function(){
                let _self = this;
                var newKid = document.getElementById("std")
                console.log(newKid.value)
        
                fetch(`${url}:3456/addStudent`,{
                    method:"POST",
                    body:JSON.stringify({studentnumber:newKid.value
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
                    // _self.setState({
                    //     timetable:response
                    // })
                })
                .catch(function(err){
                    console.log(err)
                })
            }.bind(this)

            search = function (){
                $("#searchColumn").on("input",function(){
            
                    var searchTxt = $(this).val();
                    searchTxt = searchTxt.replace(/^[\*.]+$/i,"\\$&");
            
                    var patt = new RegExp("^" + searchTxt,"i");
            
                    $(":checkbox").each(function(){
            
                        if(patt.test($(this).val())) 
                            $(this).closest("div").show(500);
            
                        else 
                            $(this).closest("div").hide(500);
            
                    })
                })
            }
        
        
    render(){
      return(
          <div class="container">
          <PageHeader style={{textAlign:'center'}}>
           <h1>All Registered Students</h1>
           </PageHeader>
          
       <div class='row' >
       <div class ='col-lg-5'>
       <Button style={{marginLeft:'180px'}}bsStyle="warning" onClick={this.deregister}>De-register</Button>
            <p></p>
            <div class ="form-group has-feedback has-search" align='center'>
                                <span class="glyphicon glyphicon-search form-control-feedback" style={{marginRight:'28%'}}></span>
                                <input class="glyphicon glyphicon-search form-control-feedback" style={{width:'200px',marginRight:'1%'}} type="text" id="searchColumn"  onKeyUp= {this.search} placeholder="Search for students.." title="Type a course" class="form-control"/>
                            </div>
             <div class='courses-list'>
           {this.state.data != "" ? this.state.data.map((x)=>{
           return(
            
            <div className="checklist">
            <input type="checkbox" id="allStudents" value={x} class = "students"/> {x}
            </div>
           )}) :<div><p class="Oops" style={{align:'center'}}>Oops!!! looks like the database is down please ask Nelly/James to refresh</p></div>
            }
            </div>
            </div>
                 
           
            
            <div className="col-lg-7" >
            <div class="form-header" style={{marginTop :'10%'}}>
  <h2>Add new student</h2>
        </div>
        <form method="post" action="/add" novalidate>
        <div class="form-field">
            <label for="Std">Student Number: </label>
            <p></p>
            <input type="text" class="form-control" style={{width:'200px'}}  placeholder="Type here" id="std" name="studentnum"  value="" />
        </div>
        <p></p>
        <div class="form-field">
            <label for="code">Course Code:</label>
            <p></p>
            <input type="text" class="form-control" style={{width:'200px'}} placeholder="Type here" id="code" name="coursecode" type="text" value="" />
        </div>
        <p></p>
        <div class="form-actions">
            <Button bsStyle='primary' class="btn" type="submit" onClick={this.AddNewStudent}>Add</Button>
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
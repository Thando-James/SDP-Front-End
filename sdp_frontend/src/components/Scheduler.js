import React, {Component} from 'react'
import {Button} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';

import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';


let url = 'http://youthleague.co'
//let url = 'http://localhost'
class Students extends Component{
    constructor(props){
        super(props)
        this.onSubmitCourses = this.onSubmitCourses.bind(this)
        this.onSubmitStudents = this.onSubmitStudents.bind(this)
        this.onChecked = this.onChecked.bind(this)
        this.getCourseStrings = this.getCourseStrings.bind(this)
        this.onParamChange = this.onParamChange.bind(this)
        this.onCoursesChange = this.onCoursesChange.bind(this)
        this.onStudentsChange = this.onStudentsChange.bind(this)
        this.onMerge = this.onMerge.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.onSplit=this.onSplit.bind(this)
        this.state={
            data:[],
            checkedArr:[],
            mergedCourses:[],
            byebye:[],
            isLoggedin:[],
            maxSessions:1000,
            clashParameter:1,
            isCourses:false,
            isStudents:false,
            isCoursesChanged: false,
            isStudentsChanged: false,
            startDate:moment(),
        }
    
    }
   // ValidateLogin()
  selectAll = function (){
        //
        var checkboxes = document.getElementsByName('courses');
         for(var i=0, n=checkboxes.length;i<n;i++) {
          checkboxes[i].checked = true;
          let e= {
              target:{
                  checked: true,
                  value:checkboxes[i].value
              }
          }
          this.onChecked(e)
        }
    }.bind(this)
       
    deselectAll = function (){
        var checkboxes = document.getElementsByName('courses');
          for(var i=0, n=checkboxes.length;i<n;i++) {
            checkboxes[i].checked = false;
            let e= {
                target:{
                    checked: false,
                    value:checkboxes[i].value
                }
            }
            this.onChecked(e)
            }
    }.bind(this)

    // delete = function(){
    //      let  _self = this
    //      var courses = document.querySelectorAll('input[type=checkbox]:checked')
    //      var array = []
    //      for(var i=0, n=courses.length;i<n;i++) {
    //             array.push(courses[i].value)
                
    //         }       
    //              fetch(`${url}:3456/delete`,{
    //                  method:"POST",
    //                  body:JSON.stringify({byebye:array
    //              }),
    //                headers: {
    //                    "Content-Type": "application/json; charset=utf-8",
    //                },
    //              })
    //              .then(function(response){
    //                  return response.json()
                    
    //              })
    //              .then(function(response){
    //                  // console.log('Response from Nelly')
    //                  console.log(response)
    //                  // _self.props.history.push({
    //                  //     pathname:'/interactions',
    //                  //     state:response
    //                  // })
    //                  _self.setState({
    //                     // stdnumbers:response
    //                  })
    //              })
    //              .catch(function(err){
    //                  console.log(err)
    //              })
    //          }.bind(this)
             
    search = function (){
        $("#searchColumn").on("input",function(){
    
            var searchTxt = $(this).val();
            searchTxt = searchTxt.replace(/^[\w.]+$/i,"\\$&");
    
            var patt = new RegExp("^" + searchTxt,"i");
    
            $(":checkbox").each(function(){
    
                if(patt.test($(this).val())) 
                    $(this).closest("div").show(500);
    
                else 
                    $(this).closest("div").hide(500);
    
            })
        })
    }
      
    getCourseStrings(){
        let _self = this;
        let checked = this.state.checkedArr;      
        //Sort By functionality
        var dropdown = document.getElementById('sortby');
        var strValue = dropdown.options[dropdown.selectedIndex].value;  

        fetch(`${url}:3456/generate`,{
            method:"POST",
            body:JSON.stringify({data:checked,
                                maxSessions:this.state.maxSessions,
                                clashParameter:this.state.clashParameter,
                                SortBy:strValue,
                                date:this.state.startDate.format("L")
                                }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
        .then(function(response){
            return response.json()
        })
      .then(function(response){
            let data = []
            let merged = _self.state.mergedCourses

          if(response.errorType){
            console.log(response)
            alert("There was an error generating your timetable! Please try again")
          }else{
            console.log(response)
            console.log(_self.state.startDate._d);
            _self.props.history.push({
                pathname:'/timetable',
                state:response,
            })
          }
        })
        .catch(function(err){
            console.log(err)
        })        
     }

     onSubmitCourses(e){
        let _self = this;
        e.preventDefault();
        let form = e.target;
        console.log(form);
        let data = new FormData(form);

        fetch(`${url}:3456/upload/courses`,{
            method:"POST",
            body:data
        })
        // .then(function(response){
        //     console.log(response)
        //     response.json()
        // })
        .then(function(response){
            console.log(response)
            _self.setState({
                isCourses:true
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }

    onSubmitStudents(e){
        e.preventDefault();
        let _self = this;
        let form = e.target;
        let data = new FormData(form);

        fetch(`${url}:3456/upload/students`,{
            method:"POST",
            body:data
        })
        // .then(function(response){
        //     console.log(response)
        //     response.json()
        // })
        .then(function(response){
            console.log(response)
            _self.setState({
                isStudents:true
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }

    onCoursesChange(e){
        this.setState({
            isCoursesChanged: true
        })
    }

    onStudentsChange(e){
        this.setState({
            isStudentsChanged:true
        })
    }

    onChecked(e){
        let checked = this.state.checkedArr
        if(e.target.checked){
            checked.push(e.target.value)
        }else{
            let index = checked.indexOf(e.target.value)
            checked.splice(index,1)
        }
        this.setState({
            checkedArr: checked
        })
    }

    onParamChange(e){
        console.log(e.target.name)
        if(e.target.name === 'maxSession'){
            this.setState({
                maxSessions:e.target.value
            })
        }else if(e.target.name === 'clashParameter'){
            this.setState({
                clashParameter:e.target.value
            })
        }
    }

    onMerge(){
        let courses = this.state.data;
        let checkedCourses = this.state.checkedArr;
        let merged = this.state.mergedCourses;
        merged.push(checkedCourses);
  
        let index = -1;
        // merging for loop
        for (let x=0; x<checkedCourses.length; x++){
            for(let y=0; y<courses.length; y++){
                if(x==0 && checkedCourses[x] === courses[y].course_code){
                    console.log(checkedCourses[x]);
                    
                    index = y;
                    break;
                } else
                if(checkedCourses[x] === courses[y].course_code ){
                    console.log(x);
                    
                    console.log(checkedCourses[x])
                    console.log(courses[y].course_code)
                    courses[index].course_code = courses[index].course_code + `;${checkedCourses[x]}` 
                    courses.splice(y,1)

                    if(y<index){
                        index = index-1;
                    }

                    break;
                }
            }
        }

        var checkboxes = document.getElementsByName('courses');
        for(var i=0, n=checkboxes.length;i<n;i++) {
            checkboxes[i].checked = false;
        }
        console.log(merged)
        this.setState({
            data: courses,
            checkedArr:[],
            mergedCourses:merged
        })
    }

    onSplit(){
        let checkedCourses = this.state.checkedArr
        let merged = this.state.mergedCourses
        let courses = this.state.data;

        for(let i=0; i<checkedCourses.length; i++){
            let course = checkedCourses[i].split(";")
            for(let j=0;j<courses.length; j++){
                console.log(courses[j]);
                
                if(course[0] === courses[j].course_code.split(";")[0]){
                    courses.splice(j,1)
                }
            }
            for(let k=0; k<course.length; k++){
                courses.unshift({course_code:course[k]})
                for(let m=merged.length-1; m>=0; m--){
                    if(course[k] == merged[m][0]){
                        merged.splice(m,1)
                    }
                }
            }
        }

        var checkboxes = document.getElementsByName('courses');
        for(var i=0, n=checkboxes.length;i<n;i++) {
            checkboxes[i].checked = false;
        }

        console.log(merged)

        this.setState({
            data :courses,
            checkedArr:[],
            mergedCourses : merged
        })
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
    }

    render(){

        var id = getCookie("id");
        if (id === "") {
            this.props.history.push({
                pathname:'/login'
            })
        }
     
      return(
           
            <div>
        <pre>
          <PageHeader >
          <h1  align='center'>Timetable Scheduler</h1>
         </PageHeader>
         </pre>          
               
               
                <div class='row'>
                    <div class='col-lg-7'>
                        <h2 style={{textAlign:'left',marginLeft:'50%'}}>Courses</h2>
                        
                        <div  style={{marginLeft:'35%'}}>
                        {
                            this.state.data.length > 0 ? <ButtonToolbar>
                                <Button  type="button" className="btn btn-primary"  onClick={this.selectAll}>Select All</Button>
                                <Button bsStyle="warning" onClick={this.deselectAll}>Deselect All</Button>
                                <Button  type="button" className="btn btn-primary"  onClick={this.onMerge}>Merge</Button>
                                <Button  type="button" className="btn btn-primary"  onClick={this.onSplit}>Split</Button>
                            </ButtonToolbar> :
                            <ButtonToolbar>
                                <Button  bsSize="small" type="button" className="btn-oldstyle" disabled>Select All</Button>
                                <Button bsSize="small" bsStyle="warning" disabled>Deselect All</Button>
                                <Button  bsSize="small" type="button" className="btn btn-primary"  disabled>Merge</Button>
                            </ButtonToolbar>
                         }
                         <p></p>
                         <div class ="form-group has-feedback has-search" align='center'>
                                <span class="glyphicon glyphicon-search form-control-feedback" style={{marginRight:'35%'}}></span>
                                <input class="glyphicon glyphicon-search form-control-feedback" style={{width:'200px',marginRight:'25%'}} type="text" id="searchColumn"  onKeyUp= {this.search} placeholder="Search for courses.." title="Type a course" class="form-control"/>
                            </div>
                        </div>
                        <p></p>
                        
                        <p></p>
                        <div className = "virtualcourse-list" style={{marginLeft:'30%'}} >
                            {this.state.data != "" ? this.state.data.map((x)=>{
                                let count = 0
                                return(
                                    <div className="checklist">
                                        <input type="checkbox" name="courses" value={x.course_code} key={count} class = "selectedcourses" onChange={this.onChecked}/> {x.course_code}
                                    </div>
                                )}) : 
                                (
                                    <div class="upload-csv">
                                        <h1>No courses available? </h1>
                                        <div>
                                            <form onSubmit={this.onSubmitCourses} id="students-form">
                                                <label>Upload a CSV with courses available</label><br/><br/>
                                                <input type="file" name="file" accept=".csv" onChange={this.onCoursesChange}/>
                                                <br/>
                                                {
                                                    this.state.isCoursesChanged ? <Button bsStyle="primary" className='btn' type="submit" >Upload Students</Button> :
                                                    <Button bsStyle="primary" className='btn' type="submit" disabled >Upload Students</Button>
                                                }
                                                
                                            </form>
                                        
                                        </div>
                                        <br/>
                                        <hr style={{width:'30%'}}/>
                                        <br/>
                                        <div>
                                            <form onSubmit={this.onSubmitStudents} id="students-form">
                                                <label>Upload csv with students registration data</label><br/><br/>
                                                <input type="file" name="file" accept=".csv" onChange={this.onStudentsChange}/>
                                                <br/>
                                                {
                                                    this.state.isStudentsChanged && this.state.isCourses? <Button bsStyle="primary" className='btn' type="submit">Upload Courses Data</Button> :
                                                    <Button bsStyle="primary" className='btn' type="submit" disabled>Upload Courses Data</Button>
                                                }
                                                
                                            </form>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="generate">
                            <div>
                                <input type="text" name="maxSession" placeholder="Please input max session"  onChange={this.onParamChange} style={{textAlign:'left'}}/>
                            </div>
                            <div>
                                <input type="text" name="clashParameter" placeholder="Please input your clash parameter" onChange={this.onParamChange} />
                            </div>
                            <div>
                                <select id="sortby">
                                    <option value='0' name="Degree" onSelect={this.sortBy}>Degree</option>
                                    <option value='1' name="Noofstudents "onSelect={this.sortBy}>Number of students in the course</option>
                                    <option value='2'name="Affected" onSelect={this.sortBy}>Number of students affected</option>
                                    <option value='3'name="Affected" onSelect={this.sortBy}>Row sum without diagonal</option>
                                </select>
                            </div>
                            <div>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    className="datepicker"
                                />
                            </div>
                            <div style={{marginTop:'1%'}}>
                                {
                                    this.state.checkedArr.length != 0 ? <Button bsStyle="success"onClick={this.getCourseStrings} >Generate Timetable</Button> :
                                    <Button bsStyle="success" disabled >Generate Timetable</Button>
                                }
                                
                            </div>
                        </div>
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
            //console.log("Nton nton" + response)
            _self.setState({
                data:response,
                //states:response
            })
        })
        .catch(function(err){
            console.log(err)
        })
     }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default Students
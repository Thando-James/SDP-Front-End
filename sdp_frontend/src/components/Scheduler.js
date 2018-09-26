import React, {Component} from 'react'
import {Button} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import $ from 'jquery';

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
        this.state={
            data:[],
            checkedArr:[],
            maxSessions:1000,
            clashParameter:1,
            isCourses:false,
            isStudents:false,
            isCoursesChanged: false,
            isStudentsChanged: false
        }
    }
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
                                SortBy:strValue
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
                pathname:'/timetable',
                state:response
            })
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
        const checked = this.state.checkedArr
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

    componentDidUpdate(){
        let _self = this;
        
        // fetch(`${url}:3456/display/courses`)
        // .then(function(res){
        //     return res.json()
        // })
        // .then(function(response){
        //     console.log(response)
        //     _self.setState({
        //         data:response
        //     })
        // })
        // .catch(function(err){
        //     console.log(err)
        // })
    }

    render(){
        window.onload=function(){
            var checkboxdivs = document.querySelectorAll(".checkbox");
              document.querySelector("#myInput").addEventListener("input", function(e){
                     var inputValue = e.srcElement.value;
                    // console.log(inputValue)
                     for(var i=0;i<checkboxdivs.length;i++){
                         var checkbox = checkboxdivs[i].children[0];
                         if(checkbox.value.includes(inputValue) && inputValue.length !=0){
                             checkboxdivs[i].style.display = 'block';
                         }else{
                             checkboxdivs[i].style.display='none';
                         }
                     }
                 })};
      return(
           
            <div>
                <pre>
                <PageHeader style={{textAlign:'center'}}>
                    <h1>Timetable Scheduler</h1>
                </PageHeader>
                </pre>
               
                <div class='row'>
                    <div class='col-lg-5'>
                        <h2 style={{textAlign:'left',marginLeft:'40%'}}>Courses</h2>
                        
                        <div  style={{marginLeft:'35%'}}>
                        {
                            this.state.data.length > 0 ? <ButtonToolbar>
                                <Button  type="button" className="btn btn-primary"  onClick={this.selectAll}>Select All</Button>
                                <Button bsStyle="warning" onClick={this.deselectAll}>Deselect All</Button>
                            </ButtonToolbar> :
                            <ButtonToolbar>
                                <Button  type="button" className="btn btn-primary"  disabled>Select All</Button>
                                <Button bsStyle="warning" disabled>Deselect All</Button>
                            </ButtonToolbar>
                         }
                         <p></p>
                          <div><input id = "myInput" type="text" placeholder="Search for a course" /></div>
                        </div>
                        <p></p>
                        
                        <p></p>
                        <div className = "courses-list">
                            {this.state.data != "" ? this.state.data.map((x)=>{
                                return(
                                    <div id="chkitems"  className="checklist">
                                        <input type="checkbox" name="courses" value={x.Course_Code} class = "selectedcourses" onChange={this.onChecked}/> {x.Course_Code}
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
                                                    this.state.isCoursesChanged ? <Button bsStyle="primary" className='btn' type="submit" >Upload Courses</Button> :
                                                    <Button bsStyle="primary" className='btn' type="submit" disabled >Upload Courses</Button>
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
                                                    this.state.isStudentsChanged && this.state.isCourses? <Button bsStyle="primary" className='btn' type="submit">Upload Student Data</Button> :
                                                    <Button bsStyle="primary" className='btn' type="submit" disabled>Upload Student Data</Button>
                                                }
                                                
                                            </form>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="col-lg-7">
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
                                </select>
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

export default Students
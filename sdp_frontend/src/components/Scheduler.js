import React, {Component} from 'react'
import {Button} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';

class Students extends Component{
    constructor(props){
        super(props)
        this.unitTests = this.unitTests.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChecked = this.onChecked.bind(this)
        this.getCourseStrings = this.getCourseStrings.bind(this)
        this.state={
            data:[],
            checkedArr:[]
        }
    }

    selectAll = function (){
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
        let checked = this.state.checkedArr
        let url = 'http://localhost:3456/generate'
        
        fetch(url,{
            method:"POST",
            body:JSON.stringify({data:checked}),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
      .then(function(response){
            console.log(response)
        })
        .catch(function(err){
            console.log(err)
        })
    }


    onSubmit(e){
        let ress;
        e.preventDefault();
        let form = e.target;
        console.log(form);
        let data = new FormData(form);
        let url = 'http://localhost:3456/upload/courses'
        fetch(url,{
            method:"POST",
            body:data
        })

        // .then(function(response){
        //     console.log(response)
        //     response.json()
        // })
        .then(function(response){
            console.log("response is ............")

            console.log(response)
            ress = response.status;
        })
        .catch(function(err){
            console.log(err)
        })
        return ress;
    }
    
    unitTests= function() {
        console.log("we are in");
        var resp= 200;
         var funct_res = this.onSubmit();
        //method(reque,resss);
        if(funct_res !== resp){
            console.log("Upload courses not working");
        }
        else{
            console.log("Upload working");
        }
    };


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

    render(){
        return(
            <div>
                <PageHeader>
                    <h1>Timetable Scheduler</h1>
                </PageHeader>
                
                <div class='row'>
                    <div class='col-lg-5'>
                        <h2 style={{textAlign:'left',marginLeft:'7%'}}>Courses</h2>
                        <div className = "courses-list">
                            {this.state.data ? this.state.data.map((x)=>{
                                return(
                                    <div>
                                        <input type="checkbox" name="courses" value={x.course_code} class = "selectedcourses" onChange={this.onChecked}/> {x.course_code}
                                    </div>
                                )}) : <div></div>
                            }
                        </div>
                    </div>
                    <div class='col-lg-1' style={{height:2}}></div>
                    <div align = "center" class='col-lg-4' style={{marginTop:'10%'}}>
                        <div><Button  type="button" className="btn btn-primary"  onClick={this.selectAll}>Select All</Button></div>
                        <p></p>
                        <div><Button bsStyle="warning" onClick={this.deselectAll}>Deselect All</Button></div>
                        <p></p>
                        <div><Button bsStyle="success"onClick={this.getCourseStrings} >Generate</Button></div>
                        <br/>
                        <span>or</span>
                        <br/><br/>
                        <ButtonToolbar >
                            <form onSubmit={this.onSubmit} id="students-form">
                                <label>Upload a CSV with students registration data</label><br/><br/>
                                <input type="file" name="file" accept= ".csv" />
                                <br/>
                                <Button bsStyle="primary" className='btn' style={{marginLeft:'42%'}} type="submit">Submit</Button>
                            </form>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        let _self = this;
        let url = 'http://localhost:3456/display/courses'
        fetch(url)
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
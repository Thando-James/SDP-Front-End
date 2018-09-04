import React, {Component} from 'react'
import {Button} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';

let url = 'http://youthleague.co'
// let url = 'http://localhost'
class Students extends Component{
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChecked = this.onChecked.bind(this)
        this.getCourseStrings = this.getCourseStrings.bind(this)
        this.onParamChange = this.onParamChange.bind(this)
        this.state={
            data:[],
            checkedArr:[],
            maxSessions:1000,
            clashParameter: 1
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
        let _self = this;
        let checked = this.state.checkedArr            
        fetch(`${url}:3456/generate`,{
            method:"POST",
            body:JSON.stringify({data:checked,
                                maxSessions:this.state.maxSessions,
                                clashParameter:this.state.clashParameter
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


    onSubmit(e){
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
        })
        .catch(function(err){
            console.log(err)
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
                                        <input type="checkbox" name="courses" value={x.Course_Code} class = "selectedcourses" onChange={this.onChecked}/> {x.Course_Code}
                                    </div>
                                )}) : <div></div>
                            }
                        </div>
                        <div>
                                <input type="text" name="maxSession" placeholder="Please input max session" onChange={this.onParamChange}/>
                                <input type="text" name="clashParameter" placeholder="Please input your clash parameter" onChange={this.onParamChange} />
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
                                <input type="file" name="file" />
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
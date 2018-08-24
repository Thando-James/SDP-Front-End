import React, {Component} from 'react'
import {Button} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';

class Students extends Component{
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state={
            data:[],
          }
    }

    selectAll = function (){
        var checkboxes = document.getElementsByName('courses');
         for(var i=0, n=checkboxes.length;i<n;i++) {
          checkboxes[i].checked = true;
        }
    }
       
    deselectAll = function (){
        var checkboxes = document.getElementsByName('courses');
          for(var i=0, n=checkboxes.length;i<n;i++) {
            checkboxes[i].checked = false;
            }
    }
      
    getCourseStrings = function(){
        var c1;
        var checked = Array.prototype.slice.call(document.querySelectorAll('.selectedcourses:checked')).map(function(c1){
          return c1.value;
        }).join(",");
        
        console.log(checked);
    }

    onSubmit(e){
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
            console.log(response)
        })
        .catch(function(err){
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                <PageHeader>
                    <h1>Timetable Scheduler</h1>
                </PageHeader>

                <ButtonToolbar >
                <form onSubmit={this.onSubmit} id="students-form">
                    <label>Upload a CSV with students registration data</label><br/><br/>
                    <input type="file" name="file" />
                    <p></p>
                    <Button bsStyle="primary" className='btn' type="submit">Submit</Button>
                </form>
                </ButtonToolbar>
                
                <div align = "center">
                
                <div><Button  type="button" className="btn btn-primary"  onClick={this.selectAll}>Select All</Button></div>
                <p></p>
                <div><Button bsStyle="warning" onClick={this.deselectAll}>Deselect All</Button></div>
                <p></p>
                <div><Button bsStyle="success"onClick={this.getCourseStrings} >Generate</Button></div>
                
                </div>

                <div>
                    {this.state.data ? this.state.data.map((x)=>{
                        console.log(x);
                        return(
                            <div>
                                <input type="checkbox" name="courses" value={x} class = "selectedcourses"/> {x}
                            </div>
                        )}) : <div></div>
                    }
                </div>
            </div>
        )
    }
}

export default Students
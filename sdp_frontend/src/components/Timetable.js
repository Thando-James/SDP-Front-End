import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'
import $ from 'jquery'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment)
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let url = 'http://youthleague.co'
//let url = 'http://localhost'

class Timetable extends Component{

    constructor(props){
        super(props)
        this.state={
          studentnumber:"",
          coursecode:"",
          data:[],
          timetable: ""
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
            _self.setState({
                timetable:response
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }.bind(this)

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
            // console.log('Response from Nelly')
            // console.log(response)
            // _self.props.history.push({
            //     pathname:'/interactions',
            //     state:response
            // })
            _self.setState({
                timetable:response
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }.bind(this)
    
    search = function (){
      $("#myInput").on("input",function(){
  
          var str = $('#myInput').val();
          var strary = str.split(':');
  
          $("table").find("tr").slice(1).each(function (index) {
              var text = $.trim($(this).text());
              for (var i = 0; i < strary.length; i++) {
               console.log("%s:%s", text, strary[i]);
                  var tempStr;
                  tempStr = strary[i].replace("(", "\\(");
                  tempStr = tempStr.replace(")", "\\)");               
                  var regex = new RegExp(".*" + tempStr + ".*", "gi");
                  $(this).toggle(regex.test(text));
                console.log(regex.test(text));
                if (regex.test(text)) break;
              }
          });
      });
  
    }

    render(){
        if(this.props.location.state && !this.state.timetable){
            let timetable = this.props.location.state;
            for(let i = 0; i<timetable.length; i++){
                    let a = new Date(timetable[i].start)
                    let b = new Date(timetable[i].end)
                    timetable[i].start = new Date(a)
                    timetable[i].end = new Date(b)

            }
            console.log(timetable);
            this.setState({
                timetable:timetable
            })
        }
        return(
            <div>
                <pre> 
                    <PageHeader>
                        <h1 align='center'>Generated timetable with sessions</h1>
                    </PageHeader>
                </pre>
                <div className='row'>
                    <div class='col-lg-5'>
                            <div align='center'>
                                <ReactHTMLTableToExcel id="test" className="btn btn-primary" table="sessions" filename="Sessions table" sheet="sessions" buttonText="Download as XLS"/>
                            </div> 
                            <p></p>
                            <div align='center'>
                                <label>Search for multiple courses by adding a ":" after course name</label> 
                            </div>
                            <div class ="form-group has-feedback has-search" align='center'>
                                <span class="glyphicon glyphicon-search form-control-feedback" style={{marginRight:'22%'}}></span>
                                <input class="glyphicon glyphicon-search form-control-feedback" style={{width:'400px'}} type="text" id="myInput"  onKeyUp= {this.search} placeholder="Search for courses.." title="Type a course" class="form-control"/>
                            </div>
                            <p></p>
                            <Table id ="sessions" align='center' bordered striped condensed hover  >
                                <thead>                   
                                    <tr>
                                        <th>Sessions</th>
                                        <th>Dates</th> 
                                        <th>Courses</th>
                                    </tr>
                                </thead>
                        
                                {this.props.location.state? this.props.location.state.map((x)=>{
                                    return(
                                        <tbody>
                                            <tr>
                                                {console.log(typeof(x.start))}
                                                <td>{x.resource[0].session}</td>
                                                <td>{x.data[0]}</td>
                                                <td>{x.subject + " "}</td>
                                            </tr>
                                        </tbody>
                                    )} ) : <div></div>
                                }
                            
                            </Table>
                    </div>

                    <div className="col-lg-7">
                        <div className="timetable row" style={{marginBottom:25}}>
                            <div className="col-lg-6">
                                <input type="text" name="studentNum"  id = "stdNum" placeholder="Enter student number" style={{marginRight:10}}/>
                                <br/>
                                <br/>
                                <Button bsStyle="success" onClick={this.sendStdnum} style={{float:'right', marginRight:60}}>Generate timetable</Button>
                            </div>
                           
                           <div className="col-lg-6">
                                <select style={{marginLeft:10}} id="courseN">
                                        <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()"/>
                                    
                                        {this.state.data != "" ? this.state.data.map((x)=>{
                                            return(
                                                <option value={x.course_code}>{x.course_code}</option>
                                            )}) : <div></div>
                                        }
                                </select>
                                <br/>
                                <br/>
                                <Button bsStyle="success" onClick={this.getNeighbor} style={{float:'right', marginRight:50}}>Check neighbors</Button>
                           </div>
                            
                        </div>
                        
                        <div style={{width:'50vw', height:'70vh'}}>
                            
                            <BigCalendar
                                localizer={localizer}
                                events={(this.state.timetable || this.state.data)}
                                views={allViews}
                                step={60}
                                showMultiDayTimes
                                startAccessor="start"
                                endAccessor="end"
                            />
                        </div>
                        
                    </div>
                </div>
            </div>                
        )
    }
          
    componentDidMount(){
        let schedule = this.props.location.state;
        console.log(schedule);

        //   for(let i = 0; i<schedule.length; i++){
        //         let a = moment(schedule[i].start)
        //         let b = moment(schedule[i].end)
        //         schedule[i].start = a
        //         schedule[i].end = b
        //     }
        //     console.log(schedule);
            
        //     this.setState({
        //         timetable: schedule
        //     })
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
    
export default Timetable
  

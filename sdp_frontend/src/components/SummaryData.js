import React, {Component} from 'react'
import "./styles.css"
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment)
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let url = 'http://youthleague.co'
//let url = 'http://localhost'

class SummaryData extends Component{
    constructor(props){
        super(props)
      //  this.onSubmit = this.onSubmit.bind(this)
        this.state={
            data:[],
        }
        this.studentTimetable = this.studentTimetable.bind(this);
    }

    studentTimetable(stdnum){
        let _self = this;
        console.log(stdnum)

        fetch(`${url}:3456/student`,{
            method:"POST",
            body:JSON.stringify({studentnumber:stdnum
          }),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
        })
        .then(function(response){
            return response.json()
        })
        .then(function(response){
            if(response.errorType){
                console.log(response)
                alert("Could not generate student timetable. please try again")
            }else if(response.length === 0){
                console.log(response)
                alert("Student does not exist. Enter new student number")
            }else{
                let timetable = response;
                let date = new Date();
                let h=0;
                for(let i = 0; i<timetable.length; i++){
                        let a = new Date(timetable[i].start)
                        let b = new Date(timetable[i].end)
                        if(date.toDateString() === a.toDateString()){
                            h = h+2;
                        }else{
                            h=0;
                            date = a;
                        }
                        timetable[i].start = new Date(a.setTime(a.getTime() + (h*60*60*1000)))
                        timetable[i].end = new Date(b.setTime(b.getTime() + (h*60*60*1000)))
    
                }
                console.log(response)
                _self.setState({
                    data:timetable,
                })
            }
        })
        .catch(function(err){
            console.log(err)
        })
    }

render(){
    return(
        <div>
            <pre><h1 align='center'>Summary Data</h1></pre>
            <div className ='virtualcourse-list2'>
                <div class= "col-lg-4" id="data">
                    <ul>
                        <li>Number of same day students: {this.props.location.state[0]} </li>
                        <li>Number of Students who have back to back exams: {this.props.location.state[1]}</li>
                        <li>Number of clashes: {this.props.location.state[2]}</li>
                        <br/>
                        <li>Students with worst timetables (In Order : Worst to least Worst):<ul>
                    {this.props.location.state? this.props.location.state[3].map((x)=>{
                        return(
                        <li onClick={()=>this.studentTimetable(x)}>{x}</li>
                        )
                        }):null}
                        </ul>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-7" style={{height:'75vh'}}>
                            
                            <BigCalendar
                                localizer={localizer}
                                events={(this.state.data)}
                                views={allViews}
                                step={60}
                                showMultiDayTimes
                                startAccessor="start"
                                endAccessor="end"
                            />
                </div>
                <div class="col-lg-1"></div>
            </div>
        </div>

    )}}export default SummaryData
import React, {Component} from 'react'
import "./styles.css"
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment)
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let url = 'http://youthleague.co'
//let url = 'http://localhost'

class ModifiedTable extends Component{
    constructor(props){
        super(props)
      //  this.onSubmit = this.onSubmit.bind(this)
        this.state={
            // data:[],
        }
        // this.studentTimetable = this.studentTimetable.bind(this);
    }

    
render(){
    return(
        <div>
            <pre><h1 align='center'>Previously Generated Timetable</h1></pre>
            {/* <div className ='virtualcourse-list2'>
              
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
            </div> */}
        </div>

    )}}export default ModifiedTable
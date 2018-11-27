import React, {Component} from 'react'
import "./styles.css"

class SummaryData extends Component{
    constructor(props){
        super(props)
      //  this.onSubmit = this.onSubmit.bind(this)
        this.state={
            data:[],
        }
    }

render(){
    console.log(this.props.location.state)
    return(
        <div>
            <pre><h1 align='center'>Summary Data</h1></pre>
        <div className ='virtualcourse-list2'>
        <div class= "col-lg-7">
        <ol>
        <li>Number of same day students: {this.props.location.state[0]} </li>
        <li>Number of Students who have back to back exams: {this.props.location.state[1]}</li>
        <li>Number of clashes: {this.props.location.state[2]}</li>
        <li>(10)Students with worst timetables (In Order : Least worst to worst):<ul>
       {this.props.location.state? this.props.location.state[3].map((x)=>{
           return(
           <li>{x}</li>
           )
        }):null}
        </ul>
        </li>
        </ol>
        </div>
        </div>
        </div>

    )}}export default SummaryData
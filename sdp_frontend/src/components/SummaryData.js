import React, {Component} from 'react'
import {Table} from 'react-bootstrap'

class SummaryData extends Component{
    constructor(props){
        super(props)
      //  this.onSubmit = this.onSubmit.bind(this)
        this.state={
            data:[],
        }
    }

render(){
    return(
        <div>
            <pre><h1 align='center'>Summary Data</h1></pre>
        <div class ='row'>
        <div class= "col-lg-6">
        <Table>
            <tr><td></td></tr>
        </Table>
        </div>
        <label>Clash paramter: </label>
        <label>Number of sessions: </label>
        <label>Sorting Policy: </label>
        <label>#Students writing more than 1 exam in a day: </label>
        <label>#Students who have back to back exams: </label>
        <p>Students with worst timetables (In Order : Worst first):</p>
        <ol>
        <li>...</li>
        <li>...</li>
        <li>...</li>
        </ol>
        </div>    
        </div>

    )
}

}export default SummaryData
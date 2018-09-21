import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'

let url = 'http://youthleague.co'
class StudentsTimetable extends Component{
    constructor(props){
        super(props)
        this.state={
          studentnumber:"",
        }
    }
    render(){
    return(
        <div>
        <pre> 
         <PageHeader>
            <h1>Student Timetable</h1>
             </PageHeader>
             </pre>
             </div>
    )
}}export default StudentsTimetable

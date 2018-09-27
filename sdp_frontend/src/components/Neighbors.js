import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'

let url = 'http://youthleague.co'
class Neighbors extends Component{
    constructor(props){
        super(props)
    }
<<<<<<< HEAD
  render(){
         return( 
        <div className = "courses-list">
        {this.props.location.state ? this.props.location.state.map((x)=>{
            return(
                <div id="chkitems"  className="checklist">
                    <input type="checkbox" name="courses" value={x.Course_Code} class = "selectedcourses" onChange={this.onChecked}/> {x.Course_Code}
                </div>
                
            )}):<div></div>
            }
         </div> 
         )}
       componentDidMount(){
        let _self = this;
        
        fetch(`${url}:3456/neighbors`)
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
    }}export default Neighbors
=======
    
    render(){
    var counter =1;
    return(
        <div>
        <pre> 
         <PageHeader>
            <h1 align='center'>Courses interactions Timetable</h1>
             </PageHeader>
             </pre>
             <div align ="center" class='col-lg-4' style={{marginTop:'3%', marginLeft:'15%'}}>
             <Table id ="sessions" bordered striped condensed hover >
             <thead>                   
             <tr>
             <th>Sessions</th> 
             <th>Courses <input type="text" id="myInput" 
             placeholder="Search for courses.." title="Type a course"></input></th>
             </tr>
             </thead>
    
             {this.props.location.state ? this.props.location.state.map((x)=>{
                    return(
                            <tbody>
                            <tr><td>{x.data[0]}</td>
                            <td>{x.subject + " "}</td></tr>
                            </tbody>
                          )
                        
                        } ) : <div></div>
                  }
    </Table>
    </div>
    </div>
    )}}export default Neighbors
>>>>>>> 1ed2b6c5d6ce7f0bfdea3651fe7730515065eca2

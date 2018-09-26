import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'
 let url = 'http://youthleague.co'
//let url = 'http://localhost'
class Neighbors extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
        }
      }
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
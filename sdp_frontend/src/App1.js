import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Comp from './Comp'
import ReactFileReader from 'react-file-reader';
import $ from 'jquery';
import {Button} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';




//var uniqueNames = [];
    
class App extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
    this.state={
      data:[],
    }
  }
  
//  handleFiles = files =>{
//     let _self = this;
//     var reader = new FileReader();
//     reader.onload=function(e){
//        //Need functionality here
//       var csv = reader.result;
//       var lines = csv.split("\n");
//       var stngs =[]; 
//       var stngs2=[];
      
//       for(var i=0;i<lines.length;i++){

//         stngs[i] = lines[i];
//         stngs2[i] = stngs[i].substring(0,8);
//         }
//       $.each(stngs2, function(i, el){
//         if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
//     });
//              _self.setState({
//             data:uniqueNames
//         })
//         }
//         reader.readAsText(files[0]);
//        }
  
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
      
      //   var courses = [];
      //   var checkboxes = document.getElementsByName('courses');
      //   var checkedcourses = checkboxes.substring(0,8);
      //   for(var i=0, n=checkboxes.length;i<n;i++){
      //     if(checkboxes[i].checked = true){
      //       courses[i] = checkedcourses[i];
      //     }
      //   }
      //   console.log(courses);
       
  onSubmit(){
    //Add fetch for localhost
  }
  
  render() {
    return (
     
      <div className="App">
      <PageHeader>
       <h1>Timetable Scheduler</h1>
      </PageHeader>
      <div><p></p></div>
      
      <ButtonToolbar align = "centre">
      <Button bsStyle="primary" className='btn'>Upload CSV</Button>
      <Button  type="button" className="btn btn-primary"  onClick={this.selectAll}>Select All</Button>
      <Button bsStyle="primary" onClick={this.deselectAll}>Deselect All</Button>
      <Button bsStyle="primary"onClick={this.getCourseStrings} >Generate</Button>
      </ButtonToolbar>
      <div>
      <pre id="DisplayArea"> </pre>
      </div>
      <div>
      {this.state.data ? this.state.data.map((x)=>{
        console.log(x);
        return(
          <div>
            <input type="checkbox" name="courses" value={x} class = "selectedcourses"/> {x}
          </div>
        )
       }) : <div></div>
      }
       </div>
       </div>
    );
  }
}
export default App;

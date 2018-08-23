import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Comp from './Comp'
import ReactFileReader from 'react-file-reader';
import $ from 'jquery';


var uniqueNames = [];
    
class App extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
    this.state={
      data:[],
    }
  }
  
 
 handleFiles = files =>{
    let _self = this;
    var reader = new FileReader();
    reader.onload=function(e){
       //Need functionality here
     // var fileInput = document.getElementById('fileInput');
     // var DisplayArea = document.getElementById('DisplayArea');
      var csv = reader.result;
      var lines = csv.split("\n");
      var stngs =[]; 
      var stngs2=[];
      
      for(var i=0;i<lines.length;i++){

        stngs[i] = lines[i];
        stngs2[i] = stngs[i].substring(0,8);
        }
      $.each(stngs2, function(i, el){
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });
             _self.setState({
            data:uniqueNames
        })
        }
        reader.readAsText(files[0]);
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
  onSubmit(){
    //Add fetch for localhost
  }
  
  render() {
    return (
     
      <div className="App">
       <p>This is the exam app</p>
      <ReactFileReader handleFiles={this.handleFiles}fileTypes={'.csv'}>
      <button className='btn'>CSV</button>
      </ReactFileReader> 
      <div><p></p></div> 
      <div>
      <button className='btn' onClick={this.selectAll}>Select All</button>
      <p></p> 
      <button className='btn' onClick={this.deselectAll}>Deselect All</button>
      <p></p> 
      <button className='btn'>Generate</button>
      <p></p>
     </div>
      <div>
      <pre id="DisplayArea"> </pre>
      </div>
      <div>
      {this.state.data ? this.state.data.map((x)=>{
        console.log(x);
        return(
          <div>
            <input type="checkbox" name="courses" value={x} /> {x}
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

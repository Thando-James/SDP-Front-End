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
      var fileInput = document.getElementById('fileInput');
      var DisplayArea = document.getElementById('DisplayArea');
      var csv = reader.result;
      var lines = csv.split("\n");
      var stngs =[]; //lines[0].substring(0,8);
      var stngs2=[];
      
      for(var i=0;i<lines.length;i++){

        stngs[i] = lines[i];
        stngs2[i] = stngs[i].substring(0,8);
        }
      $.each(stngs2, function(i, el){
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });
    
  //  // DisplayArea.innerText = uniqueNames;
  //    for(var i=0;i<uniqueNames.length;i++){
  //     var currline= "<input type='checkbox' value='" + i + "'/>";
  //     var lbl = "<label>" + uniqueNames[i] + "</label>";
  //    }
     // var headers = lines[0].split("/");
     // var result = [];
     // var obj = {};
      /*for(var i=0;i<lines.length;i++){
        var currline= "<input type='checkbox' value='" + i + "'/>";
        var lbl = "<label>" + lines[i] + "</label>";
        DisplayArea.innerText=lines[i];
      }*/
        //for(var j=0;j<headers.length;j++){
          //obj[headers[j]] = currline[j];
          _self.setState({
            data:uniqueNames
        })
        }
        reader.readAsText(files[0]);
        //result.push(obj);
      }
    //   
    

    
 
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
      <div>
      <pre id="DisplayArea"> </pre>
      </div>
      <div>
      {this.state.data ? this.state.data.map((x)=>{
        console.log(x);
        return(
          <div>
            <input type="checkbox" name="vehicle1" value="x" /> {x}
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

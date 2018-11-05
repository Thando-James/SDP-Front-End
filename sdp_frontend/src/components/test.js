import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import './styles.css';

class test extends Component{
    constructor(props){
        super(props)
    } 
    


render(){

    window.onload = function (){
        var table = document.getElementById('sessions');
        var rows = table.getElementsByTagName("tr");
        for(var i=0;i<rows.length;i++){
            if(i%2==0){
                rows[i].className = "even";
            }
            else if (i%2 !=0) {
                rows[i].className = "odd";
            }
            else{
                console.log("This aint working")
            }
        }
    }   
    return(
        <div >
         <Table  class="table" id ="sessions"  bordered striped condensed hover  >
        <th>Sessions</th>
        <th>1</th>
        <th>1</th>
        <tr>
            <td>Test</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>Test2</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>Test3</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>Test4</td>
            <td>2</td>
            <td>3</td>
        </tr>
        
        </Table>
        </div>
    )
}
}export default test
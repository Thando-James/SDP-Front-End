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
        <label>Clash Parameter:</label>
        </div>    
        </div>

    )
}

}export default SummaryData
import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'
import $ from 'jquery'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment)

let url = 'http://youthleague.co'
//let url = 'http://localhost'

const events = [
    {
        start: '2015-07-20',
        end: '2015-07-02',
        eventClasses: 'optionalEvent',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];
class Timetable extends Component{

    constructor(props){
        super(props)
        this.state={
          studentnumber:"",
          coursecode:"",
          data:[],
          timetable: this.props.location.state
        }
    }

    sendStdnum = function(){
        let _self = this;
        var stdnum = document.getElementById("stdNum")
        console.log(stdnum.value)

        fetch(`${url}:3456/student`,{
            method:"POST",
            body:JSON.stringify({studentnumber:stdnum.value
          }),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
        })
        .then(function(response){
            return response.json()
        })
        .then(function(response){
            console.log(response)
            _self.setState({
                timetable:response
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }.bind(this)

    getNeighbor= function(){
        let _self = this;
        var courseN = document.getElementById("courseN")
    
        fetch(`${url}:3456/neighbors`,{
            method:"POST",
            body:JSON.stringify({coursecode:courseN.value
        }),
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then(function(response){
            return response.json()
        })
        .then(function(response){
            // console.log('Response from Nelly')
            // console.log(response)
            // _self.props.history.push({
            //     pathname:'/interactions',
            //     state:response
            // })
            _self.setState({
                timetable:response
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }.bind(this)

   
    search = function (){
      $("#myInput").on("input",function(){
  
          var str = $('#myInput').val();
          var strary = str.split(':');
  
          $("table").find("tr").slice(1).each(function (index) {
              var text = $.trim($(this).text());
              for (var i = 0; i < strary.length; i++) {
               console.log("%s:%s", text, strary[i]);
                  var tempStr;
                  tempStr = strary[i].replace("(", "\\(");
                  tempStr = tempStr.replace(")", "\\)");               
                  var regex = new RegExp(".*" + tempStr + ".*", "gi");
                  $(this).toggle(regex.test(text));
                console.log(regex.test(text));
                if (regex.test(text)) break;
              }
          });
      });
  
    }

    render(){

        // function search() {
        //     var input, filter, table, tr, td, i,word;
        //     input = document.getElementById("myInput");
        //     filter = input.value.toUpperCase();
        //     table = document.getElementById("sessions");
        //     tr = table.getElementsByTagName("tr")
        //     if(!(filter.includes(","))){
        //         for (i = 0; i < tr.length; i++) {
        //         td = tr[i].getElementsByTagName("td")[1];
        //         console.log("This is td" + td)
        //         console.log(test)
        //         if (td) {
        //         if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        //             tr[i].style.display = "";
        //         } else {
        //             tr[i].style.display = "none";
        //         }
        //         }       
        //     }
        //     }
        //     else{
        //     word = filter.split(",");

        //     for(var j=0; j < word.length;j++){
        //     for (i = 0; i < tr.length; i++) {
        //         td = tr[i].getElementsByTagName("td")[1];
                
        //         console.log("This is td" + tr[i])
        //         console.log(test)
        //         if (td) {
        //         if (td.innerHTML.toUpperCase().indexOf(word[j]) > -1) {
        //             tr[i].style.display = "";
        //         } else {
        //             tr[i].style.display = "none"
        //         }
        //         }       
        //     }
        //     }
        // }
        // }
        return(
            <div>
                <pre> 
                    <PageHeader>
                        <h1 align='center'>Generated timetable with sessions</h1>
                    </PageHeader>
                </pre>
                <div className='row'>
                    <div class='col-lg-5'>
                            <div align='center'>
                                <ReactHTMLTableToExcel id="test" className="btn btn-primary" table="sessions" filename="Sessions table" sheet="sessions" buttonText="Download as XLS"/>
                            </div> 
                            <p></p>
                            <div align='center'>
                                <label>Search for multiple courses by adding a ":" after course name</label> 
                            </div>
                            <div class ="form-group has-feedback has-search" align='center'>
                                <span class="glyphicon glyphicon-search form-control-feedback" style={{marginRight:'22%'}}></span>
                                <input class="glyphicon glyphicon-search form-control-feedback" style={{width:'400px'}} type="text" id="myInput"  onKeyUp= {this.search} placeholder="Search for courses.." title="Type a course" class="form-control"/>
                            </div>
                            <p></p>
                            <Table id ="sessions" align='center' bordered striped condensed hover  >
                                <thead>                   
                                    <tr>
                                        <th>Sessions</th> 
                                        <th>Courses</th>
                                    </tr>
                                </thead>
                        
                                {this.props.location.state? this.props.location.state.map((x)=>{
                                    return(
                                        <tbody>
                                            <tr>
                                                <td>{x.data[0]}</td>
                                                <td>{x.subject + " "}</td>
                                            </tr>
                                        </tbody>
                                    )} ) : <div></div>
                                }
                            
                            </Table>
                    </div>

                    <div className="col-lg-7">
                        <div className="timetable row" style={{marginBottom:25}}>
                            <div className="col-lg-6">
                                <input type="text" name="studentNum"  id = "stdNum" placeholder="Enter student number" style={{marginRight:10}}/>
                                <br/>
                                <br/>
                                <Button bsStyle="success" onClick={this.sendStdnum} style={{float:'right', marginRight:60}}>Generate timetable</Button>
                            </div>
                           
                           <div className="col-lg-6">
                                <select style={{marginLeft:10}} id="courseN">
                                        <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()"/>
                                    
                                        {this.state.data != "" ? this.state.data.map((x)=>{
                                            return(
                                                <option value={x.course_code}>{x.course_code}</option>
                                            )}) : <div></div>
                                        }
                                </select>
                                <br/>
                                <br/>
                                <Button bsStyle="success" onClick={this.getNeighbor} style={{float:'right', marginRight:50}}>Check neighbors</Button>
                           </div>
                            
                        </div>
                        
                        <div style={{width:'50vw', height:'70vh'}}>
                            <BigCalendar
                                localizer={localizer}
                                events={(this.state.timetable || this.state.data)}
                                startAccessor="start"
                                endAccessor="end"
                            />
                        </div>
                        
                    </div>
                </div>
            </div>                
        )
    }
          
    componentDidMount(){
        let _self = this;
        fetch(`${url}:3456/display/courses`)
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
    }

}
    
export default Timetable
  

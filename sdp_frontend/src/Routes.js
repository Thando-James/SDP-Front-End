import React from 'react';
import {Switch,Route} from 'react-router-dom'
import Students from './components/Students';
import Scheduler from './components/Scheduler';
import Timetable from './components/Timetable';
export default class Routes extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" component={Scheduler}/>
                <Route path="/courses" component={Students}/>
                <Route path="/timetable" component={Timetable}/>
            </Switch>
        )
    }
}
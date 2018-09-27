import React from 'react';
import {Switch,Route} from 'react-router-dom'
import Students from './components/Students';
import Scheduler from './components/Scheduler';
import Timetable from './components/Timetable';
import StudentsTimetable from './components/StudentsTimetable';
import Neighbors from './components/Neighbors';
<<<<<<< HEAD
=======

>>>>>>> 1ed2b6c5d6ce7f0bfdea3651fe7730515065eca2
export default class Routes extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" component={Scheduler}/>
                <Route path="/courses" component={Students}/>
                <Route path="/timetable" component={Timetable}/>
                <Route path="/stdtimetable" component={StudentsTimetable}/>
<<<<<<< HEAD
                <Route path="/neighbors" component={Neighbors}/>
=======
                <Route path="/interactions" component={Neighbors}/>
>>>>>>> 1ed2b6c5d6ce7f0bfdea3651fe7730515065eca2
            </Switch>
        )
    }
}
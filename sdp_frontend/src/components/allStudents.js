import React, {Component} from 'react'

let url = 'http://youthleague.co'
// let url = 'http://localhost'
class allStudents extends Component{
    constructor(props){
        super(props)
    
    }


    ViewStudents(){
        
        fetch(`${url}:3456/allStudents`)
        .then(function(res){
            return res.json()
        })
    //     .then(function(response){
    //         console.log(response)
    //         _self.setState({
    //             data:response
    //         })
    //     })
    //     .catch(function(err){
    //         console.log(err)
    //     })
        
    }

    
    render(){
    
    return(
      
        <div class="container">
       
           <PageHeader style={{textAlign:'center'}}>
           <h1>All Registered Students</h1>
           </PageHeader>

        </div>
        )
        }

}

export default allStudents
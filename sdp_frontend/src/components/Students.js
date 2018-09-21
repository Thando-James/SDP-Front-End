import React, {Component} from 'react'

let url = 'http://youthleague.co'
// let url = 'http://localhost'
class Students extends Component{
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmitStudents(e){
        e.preventDefault();
        let form = e.target;
        let data = new FormData(form);

        fetch(`${url}:3456/upload/students`,{
            method:"POST",
            body:data
        })
        // .then(function(response){
        //     console.log(response)
        //     response.json()
        // })
        .then(function(response){
            console.log(response)
        })
        .catch(function(err){
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}

export default Students
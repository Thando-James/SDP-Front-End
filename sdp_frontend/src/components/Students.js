import React, {Component} from 'react'

class Students extends Component{
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e){
        e.preventDefault();
        let form = e.target;
        let data = new FormData(form);
        let url = 'http://localhost:3456/upload/students'
        fetch(url,{
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
                <form onSubmit={this.onSubmit} id="students-form">
                    <label>Upload csv with students registration data</label><br/><br/>
                    <input type="file" name="file" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Students
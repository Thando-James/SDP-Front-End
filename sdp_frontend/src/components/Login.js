import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'
import './Login.css'
import Routes from '../Routes';
// const JSON = require('circular-json');


let url = 'http://youthleague.co'
class Login extends Component{
    constructor(props){
        super(props)
    this.state={
        email:'',
        password:'',
        shown : false,
     //   authenticated:false
    }
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
}

    onEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }

    onPassChange(e){
        this.setState({
            password: e.target.value
        })
    }
ValidateLogin =function(e){
    e.preventDefault()
    let _self = this;
   var user = {
       email : this.state.email,
       password : this.state.password
   }
  
   console.log(user);

   fetch(`${url}:3456/login`,{
    method:"POST",
    body:JSON.stringify(user), headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
})
.then(function(response){
    return response.json()
})
.then(function(response){
    // console.log(response)
    console.log('response from log in is ', response)
    console.log('length is ', response.length)
    if(response.length!==0){
       // this.authenticated=true
     //   console.log(this.authenticated)
        _self.props.history.push({
            pathname:'/',
            state:response,
        })
    }
    else{
       // if(response.length==0){
            _self.setState({
                shown : true
            })
       // }
       
    }
})
.catch(function(err){
    console.log(err)
})

    
}.bind(this);
render(){

return(
  
    <div class="container">
   
       <PageHeader style={{textAlign:'center'}}>
       <h1>Login Here</h1>
       </PageHeader>
        
        <div class="card card-container">
            <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" class="profile-name-card"></p>
            <form class="form-signin">
                <span id="reauth-email" class="reauth-email"></span>
                <input type="email" class="form-control" placeholder="Email address" onChange={this.onEmailChange} value={this.state.email} required autofocus/>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password"  onChange={this.onPassChange} value={this.state.password} required/>
                <div id="remember" class="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me />
                    </label>
                </div>
                <div  class="error">
                    {this.state.shown ? <div >Incorrect credentials!!</div> : null}
                </div>
                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={this.ValidateLogin}>Sign in</button>
            </form>
            <a href="#" class="forgot-password"> Forgot the password?</a>
        </div>
    </div>
    )
    }
} export default Login
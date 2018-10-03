import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {Button} from 'react-bootstrap'
import './Login.css'
import Routes from '../Routes';


let url = 'http://youthleague.co'
class Login extends Component{
    constructor(props){
        super(props)
    this.state={
        email:[],
        password:[],
    }
    }
ValidateLogin =function(){
   
    
}
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
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
                <div id="remember" class="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me />
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={this.ValidateLogin}>Sign in</button>
            </form>
            <a href="#" class="forgot-password"> Forgot the password?</a>
        </div>
    </div>
    )
    }
} export default Login
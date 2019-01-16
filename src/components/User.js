import React, { Component } from 'react'
import { userLogin, isLoggedIn } from '../ducks/reducer';


export default class User extends Component {
    constructor(){
        super();
        this.state = {
            name: ''
        }
    }

    login = () => {
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
        window.location = url;
    }

render() {
    return (
        <div>
            <h1>User</h1>
            <button onClick={this.login}>sign in</button>
            {console.log(this.props)}
        </div>
    )
}
}

import React, { Component } from 'react'
import { userLogin, isLoggedIn } from '../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';


class User extends Component {
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

    logout = () => {
        axios.post('/api/logout').then(() => {
            console.log('Logged out')
            this.props.isLoggedIn(false)
        });
    }

    render() {
        const { user, loggedIn } = this.props;
        return (
            <div>
                <button onClick={this.login}>sign in</button>
                { loggedIn ?
                <div>
                {console.log(user.user)}
                <h2>{user.user.profile_name}</h2>
                <img src={user.user.picture} />
                <Link to={`/dashboard/${user.user.username}`} ><button>Dashboard</button></Link>
                <button onClick={this.logout}>sign out</button>
                </div>
                :
                <h1>Please sign in.</h1>
            }
            </div>
        )
    }
}

function mapStateToProps(state){
    const { user, loggedIn } = state
    return {
        user,
        loggedIn
    }
}

export default connect(mapStateToProps, {userLogin, isLoggedIn})(User);
import React, { Component } from 'react'
import { userLogin, isLoggedIn, hasUsername } from '../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';


class User extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            username: 'default'
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

    createNewUsername = () => {
        let username = this.state.username;
        let id = this.props.user.user.id;
        console.log(id, username)

        axios.post('/api/user-data', {id, username}).then(response => {
            console.log(response.data)

        }).catch(error => {
            console.error(error)
        })
    }

    render() {
        const { user, loggedIn, username } = this.props;
        
        return (
            <div>
                <button onClick={this.login}>sign in</button>
                { loggedIn ?
                <div>
                    
                    {console.log(username)}
                {/* {
                    (user.user.username === null) ? 
                    <h1>Get a username</h1>
                    :
                    hasUsername(user.user.username)
                } */}
                
                {console.log(user.user)}
                <h2>{user.user.profile_name}</h2>
                <img src={user.user.picture} />
                <Link to={`/dashboard/${user.user.username}`} ><button>Dashboard</button></Link>
                <button onClick={this.logout}>sign out</button>
                <button onClick={this.createNewUsername}>new username</button>
                </div>
                :
                <h1>Please sign in.</h1>
            }
            </div>
        )
    }
}

function mapStateToProps(state){
    const { user, loggedIn, username } = state
    return {
        user,
        loggedIn,
        username
    }
}

export default connect(mapStateToProps, {userLogin, isLoggedIn, hasUsername})(User);
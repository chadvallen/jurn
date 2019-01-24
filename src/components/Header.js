import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userLogin, isLoggedIn } from '../ducks/reducer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../media/logo.svg';

class Header extends Component {

    componentDidMount() {
        axios.get('/api/user-data').then(response => {
            this.props.userLogin(response.data)
            if (response.data.user) {
            this.props.isLoggedIn(true)
        }}).catch(error => {
            console.log('error on user-data', error)
        })
    }

    login = () => {
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
        window.location = url;
    }


    render() {
        const {loggedIn} = this.props;
        return (
            <div className="header">
                <Link to='/'><img src={logo} alt="logo" className="logo" /></Link>
                <nav>
                    {loggedIn ?
                    <div>
                    <Link to='/user'>Profile</Link>
                    {console.log(this.props.loggedIn)}
                    </div>
                    : 
                    <button onClick={this.login}>sign in</button>
                    }
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { user, loggedIn } = state;
    return {
        user,
        loggedIn
    }
}

export default connect(mapStateToProps, { userLogin, isLoggedIn })(Header);

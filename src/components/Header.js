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

    render() {
        return (
            <div className="header">
                <Link to='/'><img src={logo} alt="logo" className="logo" /></Link>
                <nav>
                    <Link to='/user'>Profile</Link>
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

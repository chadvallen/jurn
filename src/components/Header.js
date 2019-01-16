import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userLogin, isLoggedIn } from '../ducks/reducer';
import axios from 'axios';

class Header extends Component {

    componentDidMount() {
        axios.get('/api/user-data').then(response => {
            console.log(response.data)
            this.props.userLogin(response.data)
            if (response.data.user) {
            this.props.isLoggedIn(true)
        }}).catch(error => {
            console.log('error on user-data', error)
        })
    }

    render() {
        return (
            <div>
                {console.log(this.props.user)}
                <h1>JURN</h1>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { user, isLoggedIn } = state;
    return {
        user,
        isLoggedIn
    }
}

export default connect(mapStateToProps, { userLogin, isLoggedIn })(Header);

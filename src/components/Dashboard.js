import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { isLoggedIn } from '../ducks/reducer';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        this.props.user !== null && this.props.loggedIn  ?
        axios.get(`/api/posts/${this.props.user.user.username}`).then(response => {
            console.log('response.data', response.data)
            this.setState({posts: response.data})
            console.log('User here')
        })
        :
        console.log('User null')
        
    }

    render() {
        const { loggedIn, user } = this.props;
        let privatePosts = this.state.posts.map(item => {
            return (
                
                <div>
                    {console.log(item.title)}
                    <h1>{item.title}</h1>
                    <p>{item.entry}</p>
                </div>
            )
        })
        return (
        <div>
            { this.state.posts.length > 0
            ?
            <div>
            {
                loggedIn ?
                <div>
                    <h1>is logged in</h1>
                    <h2>{user.user.username}</h2>
                    {privatePosts}
                    {console.log('privatePosts', privatePosts)}
                </div>
                :
                <div>
                    Please log in
                </div>
            }
            </div>
            :
            <p>Loading...</p>
            }
        </div>
        )
    }
}

function mapStateToProps(state) {
    const { user, loggedIn } = state;
    return {
        user,
        loggedIn
    }
}

export default connect(mapStateToProps, { isLoggedIn })(Dashboard);
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userLogin, isLoggedIn } from '../ducks/reducer';
import axios from 'axios';

class NewPost extends Component {
    constructor() {
        super();
        this.state={
            title: '',
            entry: '',
            private: true
        }
    }

    handleInputs = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    createPost = () => {
        let newPost = {
            user_id: this.props.user.user.id,
            title: this.state.title,
            entry: this.state.entry, 
            private: this.state.private
        }
        axios.post('/api/posts', newPost).then(() => {
            this.setState({title: ''})
            console.log('Posted!')
        }).catch(error => {
            console.error('Error on createPost FE', error)
        })
    }


    render() {
        const { user, isLoggedIn } = this.props;
        return (
            <div>
                
                {
                    isLoggedIn ?
                    <div>
                        <p>Title</p>
                        <input name="title" onChange={event => this.handleInputs(event)}/>
                        <p>Post</p>
                        <input name="entry"onChange={event => this.handleInputs(event)}/>
                        <button onClick={() => this.createPost()}>Submit</button>
                    </div>
                    :
                    <div>
                        <h2>Please log in</h2>
                    </div>

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

export default connect(mapStateToProps, { userLogin, isLoggedIn })(NewPost);

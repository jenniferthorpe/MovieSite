import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import PropTypes from 'prop-types'


const form = {
    height: '20vh',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
}

const label = {
    textAlign: 'center',
    fontSize: '24px'
}

const input = {
    display: 'block',
    margin: '10px 20px 20px',
    padding: '9px',
    border: 'none',
    borderRadius: '2px'
}

const errorcode = {
    position: 'relative',
    textAlign: 'center',
    marginTop: '-40px',
    display: 'none'
}

const errorcode2 = {
    position: 'relative',
    textAlign: 'center',
    marginTop: '-40px',
    display: 'none'
}




class Login extends Component {
    errorCodeRef = React.createRef();

    errorCodeRef2 = React.createRef();

    static propTypes = {
        setData: PropTypes.func.isRequired
    }

    state = {
        username: '',
        password: '',
        sessionID: '',
        token: ''
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit = async (e) => {
        const { username, password } = this.state;
        const { setData } = this.props;
        e.preventDefault();

        if (username && password) {

            const { request_token: token } = await fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=d2530355598301431a821ae172ea0b6f').then(response => response.json())


            const response = await fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=d2530355598301431a821ae172ea0b6f', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        'username': username,
                        'password': password,
                        'request_token': token
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                const responseSession = await fetch('https://api.themoviedb.org/3/authentication/session/new?api_key=d2530355598301431a821ae172ea0b6f', {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            'request_token': token
                        }
                    ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (responseSession.status === 200) {
                    const { session_id: sessionID } = await responseSession.json();
                    setData({ sessionID })

                }
                else {
                    console.log(responseSession);
                }
            }
            else {
                this.errorCodeRef.current.style.display = 'block';
                this.errorCodeRef2.current.style.display = 'none';
            }
        }
        else {
            this.errorCodeRef2.current.style.display = 'block';
            this.errorCodeRef.current.style.display = 'none';
        }


    }




    render() {

        const { username, password } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit} style={form}>

                    <label htmlFor='username' style={label}>Username
                        <input name='username' type='text' value={username} onChange={this.handleUsername} style={input} />
                    </label>

                    <label htmlFor='password' style={label}>Password
                        <input name='password' type='password' value={password} onChange={this.handlePassword} style={input} />
                    </label>

                    <Button type='submit' value='login' style={{ margin: '39px 20px 20px', padding: '7px', border: '1px solid #D99A4E', fontSize: '20px' }}>Login </Button>
                </form>

                <div className='errorMessage' style={errorcode} ref={this.errorCodeRef2}>You need to provide both username and password</div>
                <div className='errorMessage' style={errorcode2} ref={this.errorCodeRef}>Wrong username or password</div>
            </div>
        )
    }
}

export default Login
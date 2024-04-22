import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../constants';
import { UserContext } from '../App';

export function Login() {
    const user = useContext(UserContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    useWebSocket(WS_URL, {
        share: true,
        filter: () => false
    });

    function logInUser() {
        if (!username.trim()) {
            return;
        }
        console.log(user)
        user.setUser(username)
        navigate('/document')
    }

    return (
        <div className="account">
            <div className="account__wrapper">
                <div className="account__card">
                    <div className="account__profile">
                        <p className="account__name">Hello, user!</p>
                        <p className="account__sub">Join to edit the document</p>
                    </div>
                    <input name="username" onChange={(e) => setUsername(e.target.value)} className="form-control" />
                    <button
                        type="button"
                        onClick={() => logInUser()}
                        className="btn btn-primary account__btn">Join</button>
                </div>
            </div>
        </div>
    );
}

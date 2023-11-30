import React, {useState} from 'react';
import style from './authentification.module.scss';
import FormInput from "../../elements/form-input/FormInput";
import FormButton from "../../elements/form-button/FormButton";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.hook";
import Loader from '../loader/Loader';

function Login(props) {
    let navigate = useNavigate();
    const {login, authStatus, loading} = useAuth();

    const initialValue = {
        username: '',
        password: ''
    };

    const [userdata, setUserdata] = useState(initialValue);

    const userdataHandler = (e) => {
        setUserdata({
            ...userdata, [e.target.name]: e.target.value
        })
    }

    const submit = (userdata) => {
        login(userdata);
        setUserdata(initialValue);
    }

    return (
        <div className={style.background}>
            <div className={style.formContainer}>
                <h2>Log in</h2>
                {loading && <Loader/>}
                <form className={style.form} onSubmit={(e)=> e.preventDefault()}>
                    <FormInput type="text" placeholder="Username" name="username" onChange={userdataHandler} value={userdata.username}/>
                    <FormInput type="password" placeholder="Password" name="password" onChange={userdataHandler} value={userdata.password}/>
                    <FormButton button="Log In" onClick={()=> submit(userdata)}/>
                </form>
                <p>{authStatus == 200 ? 'Successfully logged in' : authStatus}</p>
            <p>Do not have an account yet? Proceed to <Link to='/registration'>Registration</Link></p>
            </div>
        </div>
    );
}

export default Login;
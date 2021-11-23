import React, {useState} from 'react';
import style from './authentification.module.scss';
import FormInput from "../../elements/form-input/FormInput";
import FormButton from "../../elements/form-button/FormButton";
import AuthService from '../../services/authService';
import {Outlet, useNavigate} from "react-router-dom";

function Login(props) {
    let navigate = useNavigate();

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
        AuthService.login(userdata);
        setUserdata(initialValue);
    }

    return (
        <div className={style.background}>
            <div className={style.formContainer}>
                <form className={style.form} onSubmit={(e)=> e.preventDefault()}>
                    <FormInput type="text" placeholder="Username" name="username" onChange={userdataHandler} value={userdata.username}/>
                    <FormInput type="password" placeholder="Password" name="password" onChange={userdataHandler} value={userdata.password}/>
                    <FormButton button="Log In" onClick={()=>submit(userdata)}/>
                </form>
            </div>
            <p>Do not have an account yes? Proceed to <a onClick={() => navigate('/registration')}>Registration</a></p>
        </div>
    );
}

export default Login;
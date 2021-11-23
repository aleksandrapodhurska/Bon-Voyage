import React, {useState} from 'react';
import style from "./authentification.module.scss";
import FormInput from "../../elements/form-input/FormInput";
import FormButton from "../../elements/form-button/FormButton";
import AuthService from "../../services/authService";
import {useNavigate} from "react-router-dom";

function Registration(props) {
    let navigate = useNavigate();
    const initialState = {
        firstName: '',
        familyName: '',
        username: '',
        password: '',
        // email: '',
    }

    const [userdata, setUserdata] = useState(initialState);

    const userdataHandler = (e) => {
        setUserdata({
            ...userdata, [e.target.name]: e.target.value
        })
    }

    const submit = (userdata) => {
        AuthService.registration(userdata);
        setUserdata(initialState);
    }

    return (
        <div className={style.background}>
            <div className={style.formContainer}>
                <form className={style.form} onSubmit={(e)=> e.preventDefault()}>
                    <FormInput type="text" placeholder="First Name" name="firstName" onChange={userdataHandler} value={userdata.firstName}/>
                    <FormInput type="text" placeholder="Family Name" name="familyName" onChange={userdataHandler}  value={userdata.familyName}/>
                    <FormInput type="text" placeholder="Username" name="username" onChange={userdataHandler}  value={userdata.username}/>
                    <FormInput type="text" placeholder="Password" name="password" onChange={userdataHandler}  value={userdata.password}/>
                    {/*<FormInput type="text" placeholder="Email" name="email" onChange={userdataHandler}  value={userdata.email/>*/}
                    <FormButton button="Register" onClick={() => submit(userdata)}/>
                </form>
            </div>
            <p>Already have an account? Proceed to <a onClick={() => navigate('/login')}>Login</a></p>
        </div>
    );
}

export default Registration;
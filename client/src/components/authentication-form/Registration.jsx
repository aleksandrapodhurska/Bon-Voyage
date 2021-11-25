import React, {useState} from 'react';
import style from "./authentification.module.scss";
import FormInput from "../../elements/form-input/FormInput";
import FormButton from "../../elements/form-button/FormButton";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.hook";

function Registration(props) {

    const {registration, authStatus, loading } = useAuth();

    let navigate = useNavigate();
    const initialState = {
        firstName: '',
        familyName: '',
        username: '',
        password: ''
    }

    const [userdata, setUserdata] = useState(initialState);

    const userdataHandler = (e) => {
        setUserdata({
            ...userdata, [e.target.name]: e.target.value
        })
    }

    const submit = (userdata) => {
        registration(userdata);
        setUserdata(initialState);
    }

    return (
        <div className={style.background}>
            <div className={style.formContainer}>
                <h2>Registration</h2>
                <form className={style.form} onSubmit={(e)=> e.preventDefault()}>
                    <FormInput type="text" placeholder="First Name" name="firstName" onChange={userdataHandler} value={userdata.firstName}/>
                    <FormInput type="text" placeholder="Family Name" name="familyName" onChange={userdataHandler}  value={userdata.familyName}/>
                    <FormInput type="text" placeholder="Username" name="username" onChange={userdataHandler}  value={userdata.username}/>
                    <FormInput type="password" placeholder="Password" name="password" onChange={userdataHandler}  value={userdata.password}/>
                    <FormButton button="Register" onClick={() => submit(userdata)}/>
                </form>
                <p>{authStatus == 200 ? 'Successfully registred and logged in' : authStatus}</p>
            <p>Already have an account? Proceed to <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
}

export default Registration;
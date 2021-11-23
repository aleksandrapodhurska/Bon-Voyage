import DataBase from '../ajax/ajax';
import axios from "axios";

export default class AuthService {
    static async login(user) {
        try{
            const response = await DataBase.login(user);
            console.log(response); //if i entered successfully that userDTO+tokens
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user))
            return response;
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    static async registration(user) {
        try {
            const response = await DataBase.registration(user);
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response;
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    static async logout() {
        try {
            const response = await DataBase.logout();
            console.log(response);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    static async checkAuth() {
        try {
            const response = await axios.get(`http://localhost:5000/api/refreshToken`, {withCredentials: true})

            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    // refresh() {
    //     //get userDto + tokens
    //     return instance.get('/refreshToken')
    //         .then((res) => {
    //             localStorage.setItem('accessToken', res.data.authorization);
    //             return res.data;
    //         })
    // }
}


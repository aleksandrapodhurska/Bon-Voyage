import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
})

instance.interceptors.request.use((config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
}))

export default class DataBase {
    static async login({username, password}) {
        return instance.post('/login', {username, password});
    }
    static async registration({firstName, familyName, username, password}) {
        return instance.post('/registration', {firstName, familyName, username, password});
    }
    static logout() {
        return instance.post('/logout');
    }
    static async getVacations() {
        return instance.get('/vacations');
    }

}
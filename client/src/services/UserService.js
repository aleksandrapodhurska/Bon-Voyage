import DataBase from "../ajax/ajax";

export default class UserService {
    static async getVacations() {
        try {
            const response = await DataBase.getVacations();
            // console.log(response);
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        }
    }
    static async getVacation(id) {
        try {
            const response = await DataBase.getVacation(id);
            console.log(response);
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
    static async toggleFollowing(id, userId) {
        try {
            const response = await DataBase.toggleFollowing(id, userId);
            // console.log(response);
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

}
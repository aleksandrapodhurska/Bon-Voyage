import DataBase from "../ajax/ajax";

export default class AdminService {
    static async createVacation(vacation) {
        try {
            const response = await DataBase.createVacation(vacation);
            console.log(response);
            return response;
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    static async updateVacation(vacation = {}, id) {
        try {
            const response = await DataBase.updateVacation(vacation, id);
            console.log(response);
            return response;
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    static async deleteVacation(id) {
        try {
            const response = await DataBase.deleteVacation(id);
            console.log(response);
            return response;
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}
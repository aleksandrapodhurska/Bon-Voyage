import DataBase from "../ajax/ajax";

export default class UserService {
	static async getVacations() {
		try {
			const response = await DataBase.getVacations();
			return response.data;
		} catch (e) {
			console.log(e.response?.data?.message);
			return e.response?.data?.message;
		}
	}
	static async getVacation(id) {
		try {
			const response = await DataBase.getVacation(id);
			return response.data;
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}
	static async toggleFollowing(id) {
		try {
			const response = await DataBase.toggleFollowing(id);
			return response.data;
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}
}

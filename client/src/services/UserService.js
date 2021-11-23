import DataBase from "../ajax/ajax";

export default class UserService {
    static async getVacations() {
        try {
            const response = await DataBase.getVacations();
            console.log(response);
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
    // getVacation(id) {
    //     return instance.get(`/${id}`)
    //         .then((res) => {
    //             return res.data;
    //         })
    // }

    // toggleFollowing(id) {
    //     return instance.put(`/vacations/${id}/follow`)
    //         .then((res) => {
    //             return res.data;
    //         })
    // }

}
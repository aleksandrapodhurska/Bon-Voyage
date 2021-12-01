import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5000/api",
	withCredentials: true,
});

instance.interceptors.request.use((config) => {
	config.headers.authorization = `Bearer ${localStorage.getItem(
		"accessToken"
	)}`;
	return config;
});

instance.interceptors.response.use(
	(config) => {
		return config;
	},
	async (e) => {
		const initialRequest = e.config;
		if (e.response.status == 401 && e.config && !e.config._isRetry) {
			try {
				e.config._isRetry = true;
				const response = await axios.get(
					`http://localhost:5000/api/refreshToken`,
					{ withCredentials: true }
				);
				localStorage.setItem("accessToken", response.data.accessToken);
				localStorage.setItem(
					"user",
					JSON.stringify(response.data.user)
				);
				return DataBase.request(initialRequest);
			} catch (error) {
				console.log("User is not authorized");
			}
		}
		throw e;
	}
);

export default class DataBase {
	static async login({ username, password }) {
		return instance.post("/login", { username, password });
	}
	static async registration({ firstName, familyName, username, password }) {
		return instance.post("/registration", {
			firstName,
			familyName,
			username,
			password,
		});
	}
	static logout() {
		return instance.post("/logout");
	}
	static async getVacations() {
		return instance.get("/vacations");
	}
	static async getVacation(id) {
		return instance.get(`/vacations/${id}`);
	}
	static async toggleFollowing(id) {
		return instance.put(`/vacations/${id}/follow`);
	}
	static async createVacation(vacation) {
		return instance.post("/vacations", { vacation });
	}
	static async updateVacation(vacation, id) {
		return instance.put(`/vacations/${id}`, { vacation });
	}
	static async deleteVacation(id) {
		return instance.delete(`/vacations/${id}`);
	}
}

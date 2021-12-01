const vacationService = require("../services/vacation-service");

class vacationController {
	async getAll(req, res) {
		try {
			const userId = req.user.id;
			const vacations = await vacationService.getAll(userId);
			res.status(200).json(vacations);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Server Error" });
		}
	}
	async getOne(req, res) {
		try {
			const { id } = req.params;
			const vacation = await vacationService.getOne(id);
			res.status(200).json(vacation);
		} catch (e) {
			console.log(e);
			res.status(500).json(e.message);
		}
	}
	async createOne(req, res) {
		try {
			const newVacation = await vacationService.createVacation(req.body);
			res.status(201).json(newVacation);
		} catch (e) {
			console.log(e);
			res.status(500).json(e.message);
		}
	}
	async updateOne(req, res) {
		try {
			const { id } = req.params;
			const updatedVacation = await vacationService.updateOne(
				id,
				req.body
			);
			res.status(201).json(updatedVacation);
		} catch (e) {
			console.log(e);
			res.status(500).json(e.message);
		}
	}
	async toggleFollowing(req, res) {
		try {
			const { id } = req.params;
			const userId = req.user.id;
			const updatedVacation = await vacationService.toggleFollowing(
				id,
				userId
			);
			res.status(201).json(updatedVacation);
		} catch (e) {
			console.log(e);
			res.status(500).json(e.message);
		}
	}
	async deleteOne(req, res) {
		try {
			const { id } = req.params;
			const vacationToDelete = await vacationService.deleteOne(id);
			res.status(201).json(vacationToDelete);
		} catch (e) {
			console.log(e);
			res.status(500).json(e.message);
		}
	}
}

module.exports = new vacationController();

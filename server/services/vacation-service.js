const Vacation = require('../models/vacation-model');
const User = require('../models/user-model');

class vacationService {
    async getAll(userId) {
        const vacations = await Vacation.find();
        const user = await User.findById(userId);
        let vacationsSorted = [];
        vacations.map(vacation => user.following.includes(vacation._id) ? vacationsSorted.unshift(vacation) : vacationsSorted.push(vacation));
        return vacationsSorted;
    }
    async getOne(id) {
        if(!id) {
            throw new Error('Not given id');
        }
        const vacation = await Vacation.findById(id);
        return vacation;
    }
    async createVacation(vacation) {
        if(!vacation) {
            throw new Error('Not provided enough data');
        }
        const {destination, country, description, image, price, dateFrom, dateTo} = vacation.vacation;
        const newVacation = await Vacation.create({destination, country, description, image, price, dateFrom, dateTo, followers: []});
        return newVacation;
    }
    async updateOne(id, {vacation}) {
        if(!id || !vacation) {
            throw new Error('Not provided enough data');
        }
        const prevVacation = await Vacation.findById(id);
        let newVacation = {...prevVacation, vacation};
        const updatedVacation = await Vacation.findByIdAndUpdate(id, newVacation.vacation);
        return updatedVacation;
    }
    async toggleFollowing(id, userId) {
        if(!id || !userId) {
            throw new Error('Not provided enough data');
        }
        const vacation = await Vacation.findById(id);
        const user = await User.findById(userId);
        if (vacation.followers.includes(userId)) {
            vacation.followers.remove(userId);
            user.following.remove(id);
        } else {
            vacation.followers.addToSet(userId);
            user.following.addToSet(id);
        }
        await vacation.save();
        await user.save();
        return vacation;
    }
    async deleteOne(id) {
        if(!id) {
            throw new Error('Not given id');
        }
        const vacationToDelete = await Vacation.findByIdAndDelete(id);
        return vacationToDelete;
    }
}

module.exports = new vacationService();
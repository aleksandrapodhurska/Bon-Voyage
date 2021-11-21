const Router = require('express').Router;
const vacationController = require('../controllers/vacation-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');

const router = Router();

router.get('/vacations', authMiddleware, vacationController.getAll)
router.get('/vacations/:id', authMiddleware, vacationController.getOne)
router.post('/vacations', authMiddleware, adminMiddleware, vacationController.createOne)
router.put('/vacations/:id', authMiddleware, adminMiddleware, vacationController.updateOne)
router.put('/vacations/:id/follow', authMiddleware, vacationController.toggleFollowing)
router.delete('/vacations/:id', authMiddleware, adminMiddleware, vacationController.deleteOne)

module.exports = router;
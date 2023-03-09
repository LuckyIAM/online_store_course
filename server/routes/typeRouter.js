const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleNiddleware')

router.post('/', checkRole("ADMIN"), typeController.create)
router.get('/', typeController.getAll)
router.delete('/delete/:id', typeController.delOne)

module.exports = router
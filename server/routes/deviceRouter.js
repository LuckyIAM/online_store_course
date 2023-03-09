const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceControler')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.delete('/delete/:id',deviceController.deleteOne)
router.put('/update/:id', deviceController.updateOne)
module.exports = router
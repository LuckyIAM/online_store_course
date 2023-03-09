const {Type} = require('../models/models')
const ApiError = require('../error/apiError')

class TypeController {
    async create(req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req, res){
        const type = await Type.findAll()
        return res.json(type)
    }
    async delOne(req, res){
        const {id} = req.params
        const type = await Type.findOne(
            {
                where: {id: id}
            }
        )
        const delType = await Type.destroy(
            {
                where: {
                    id: id
                }
            }
        )
        return res.json({message: `Тип ${type.name} удален` })
    }
}

module.exports = new TypeController()
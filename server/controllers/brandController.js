const {Brand} = require("../models/models")
class BrandController {
    async create(req, res){
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)

    }
    async getAll(req, res){
        const brand = await Brand.findAll()
        return res.json(brand)
    }
    async delOne(req, res){
        const {id} = req.params
        const type = await Brand.findOne(
            {
                where: {id: id}
            }
        )
        const delType = await Brand.destroy(
            {
                where: {
                    id: id
                }
            }
        )
        return res.json({message: `Тип ${type.name} удален` })
    }
}

module.exports = new BrandController()
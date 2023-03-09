const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/apiError')

async function checkUpdate(value, valueKey, idValue){
    if(value){
        const valueUpdate = await Device.update(
            {
                [valueKey]: value 
            }, 
            {
                where: {id: idValue}
            }
        )
        
    }
}


class DeviceController {
    async create(req, res, next){
        try{
            let  {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static", fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if(info){
                info = JSON.parse(info)
                info.forEach(i => 
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                ) 
            }
            return res.json(device)
        
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit -limit
        let devices;
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }
    async getOne(req, res){
        
        const {id} = req.params
        console.log({id});
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            } 
        )
        return res.json(device)
    }
    async deleteOne(req, res){ 
        const {id} = req.params
        const deviceDel = await Device.destroy(
            {
                where: {id}
            }   
        )
        const idwrite = {id}
        return res.json({message: `Продукт с id ${idwrite} удален!`})
        
    }
    async updateOne(req, res){
        const {id} = req.params
        
        await checkUpdate(req.body.name, 'name', id)
        await checkUpdate(req.body.price, 'price', id)
        await checkUpdate(req.body.rate, 'rate', id)
        await checkUpdate(req.body.brandId, 'brandId', id)
        await checkUpdate(req.body.typeId, 'typeId', id)
        
        
        if(req.files){
            let {img} = req.files
            const fileNameUpd = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileNameUpd))
            
            const imgUpdate = Device.update(
                {
                    img: fileNameUpd
                },
                {
                    where: {id: id}
                }
            )
        }
        return res.json({message: `Устройство с id: ${id}, было изменено`})
    }
}

module.exports = new DeviceController()    


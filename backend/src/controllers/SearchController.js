const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringASArray')
module.exports = {
    async index(req, res){
        const {techs, latitude, longitude} = req.query;

        const techArray = parseStringAsArray(techs);

        const dev = await Dev.find({
            techs:{
                $in: techArray
            },
            location: {
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        })

        return res.json(dev)
    }
}
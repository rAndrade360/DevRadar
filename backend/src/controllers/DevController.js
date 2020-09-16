const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringASArray')

module.exports = {
    async index(req, res){
        const dev = await Dev.find();

        return res.json(dev)
    },

    async store(req, res){
        const {github_username, techs, latitude, longitude} = req.body;

        let dev = await Dev.findOne({
            github_username
        })

        if(!dev){

        const response = await axios.get(`https://api.github.com/users/${github_username}`);
        const {name = login, bio, avatar_url} = response.data;

        const techArray = parseStringAsArray(techs)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        
        dev = await Dev.create({
            name,
            avatar_url,
            bio,
            github_username,
            techs: techArray,
            location
        })
    }

        return res.json(dev)
    },

    async show(req, res){
        const {id} = req.params;

        const dev = await Dev.findById(id);

        return res.json(dev);
    },

    async update(req, res){
        const {id} = req.params
        const dev = await Dev.findByIdAndUpdate(id, req.body, {new: true})
        return res.json(dev);
    },
    async update(req, res){
        const {id} = req.params
         await Dev.findByIdAndDelete(id)
        return res.json({ok: true});
    }
}
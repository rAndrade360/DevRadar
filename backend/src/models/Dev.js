const {Schema, model} = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new Schema({
    name: String,
    avatar_url: String,
    github_username: String,
    bio: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = model('Dev', DevSchema);
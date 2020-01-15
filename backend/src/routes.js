const {Router} = require('express');
const routes = Router();
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController')

routes.post('/users', DevController.store);
routes.get('/users', DevController.index);
routes.get('/search', SearchController.index)


module.exports = routes;
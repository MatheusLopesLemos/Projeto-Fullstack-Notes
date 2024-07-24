const express = require('express')
const routes = express.Router();



const AnnotationController = require('./controllers/AnnotationController');
const PriorityController = require('./controllers/PriorityController');
const ContentController = require('./controllers/ContentController');


//Rota annotations
routes.post('/annotations', AnnotationController.create);
routes.get('/annotations', AnnotationController.read);
routes.delete('/annotations/:id', AnnotationController.delete);

//Rota priority
routes.get('/priorities', PriorityController.read);
routes.post('/priorities/:id', PriorityController.update);

//Rota content
routes.post('/contents/:id', ContentController.update);

module.exports = routes;